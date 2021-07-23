import { BN, Program, web3 as solanaWeb3 } from '@project-serum/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { TokenInstructions } from '@project-serum/serum'
import { banksyWeb3 } from '../../index'
import { Wallet } from '@project-serum/anchor/dist/provider'
import { cancelExchange } from '../../../apis/exchange/solana'

const getProvider = () => {
  if (!banksyWeb3) {
    return undefined
  }
  return banksyWeb3.sol.provider!
}

const getUserPublicKey = () => {
  if (!getProvider()) {
    return undefined
  }
  return getProvider()!.wallet.publicKey
}

// --------------------------------------------------------------------------------------------------------------------
// Exchange Create Module -- start

export async function findUserAccount(program: Program, userPublicKey: PublicKey, nftAccount: PublicKey): Promise<PublicKey> {
  // create a user account
  const associatedToken = await program.account.userAccount.associatedAddress(userPublicKey, nftAccount)
  const accountInfo = await program.provider.connection.getAccountInfo(associatedToken)

  if (accountInfo == null) {
    await program.rpc.createUser({
      accounts: {
        nft: nftAccount,
        payer: program.provider.wallet.publicKey,
        user: associatedToken,
        authority: userPublicKey,
        systemProgram: solanaWeb3.SystemProgram.programId,
        rent: solanaWeb3.SYSVAR_RENT_PUBKEY
      }
    })
  }

  return associatedToken
}

async function transferNft(program: Program, nftAccount: PublicKey, user1Wallet: Keypair | Wallet, user2PublicKey: PublicKey, amount: BN) {
  const user1Account = await findUserAccount(program, user1Wallet.publicKey, nftAccount)

  const user2Account = await findUserAccount(program, user2PublicKey, nftAccount)

  await program.rpc.transfer(amount, {
    accounts: {
      from: user1Account,
      to: user2Account,
      authority: user1Wallet.publicKey
    }
    /*signers: [user1Wallet]*/
  })
}

async function createTokenAccountInstructions(newAccountPubkey: PublicKey, mint: any, owner: any, lamports?: number) {
  if (lamports === undefined) {
    lamports = await getProvider()!.connection.getMinimumBalanceForRentExemption(165)
  }

  return [
    solanaWeb3.SystemProgram.createAccount({
      fromPubkey: getProvider()!.wallet.publicKey,
      newAccountPubkey,
      space: 165,
      lamports,
      programId: TokenInstructions.TOKEN_PROGRAM_ID
    }),
    TokenInstructions.initializeAccount({
      account: newAccountPubkey,
      mint,
      owner
    })
  ]
}

async function createTokenAccount(mint: PublicKey, owner: PublicKey): Promise<PublicKey> {
  const vault = solanaWeb3.Keypair.generate()
  const tx = new solanaWeb3.Transaction()
  tx.add(...(await createTokenAccountInstructions(vault.publicKey, mint, owner)))
  await getProvider()!.send(tx, [vault])
  return vault.publicKey
}

export async function createExchange(
  exchangeProgram: Program,
  nftProgram: Program,
  nftPubKey: PublicKey,
  itemAmount: number,
  token: PublicKey,
  amount: string,
  tokenReceiverAccount?: PublicKey
): Promise<PublicKey> {
  const seller = banksyWeb3.sol.provider!.wallet

  const exchange = solanaWeb3.Keypair.generate()

  // prepare pda to save the item before the exchange finished
  const [sellerPda] = await solanaWeb3.PublicKey.findProgramAddress([nftPubKey.toBuffer(), seller.publicKey.toBuffer()], exchangeProgram.programId)
  console.log('sellerPda: ', sellerPda.toBase58())

  const itemHolder = await findUserAccount(nftProgram, sellerPda, nftPubKey)
  console.log('itemHolder: ', itemHolder.toBase58())

  await transferNft(nftProgram, nftPubKey, seller, sellerPda, new BN(itemAmount))
  console.log('transfer NFT success')

  let currencyReceiver = tokenReceiverAccount
  if (!currencyReceiver) {
    currencyReceiver = await createTokenAccount(token, seller.publicKey)
    console.log('currencyReceiver: ', currencyReceiver.toBase58())
  }

  const instruction = await exchangeProgram.account.exchange.createInstruction(exchange)
  console.log('instruction: ', instruction)

  await exchangeProgram.rpc.createExchange(new BN(amount), {
    accounts: {
      exchange: exchange.publicKey,
      seller: seller.publicKey,
      item: nftPubKey,
      currency: token,
      itemHolder: itemHolder,
      currencyReceiver,
      rent: solanaWeb3.SYSVAR_RENT_PUBKEY
    },
    signers: [exchange],
    instructions: [instruction]
  })

  return exchange.publicKey
}

// Exchange Create Module -- end
// --------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------------------------
// Exchange Process Module -- start

/*export async function createTokenAccountWithBalance(mintPubkey: PublicKey, initBalance: number) {
  const tx = new solanaWeb3.Transaction()
  const newAccountPubkey = solanaWeb3.Keypair.generate()

  tx.add(
    ...(await createTokenAccountInstructions(newAccountPubkey.publicKey, mintPubkey, getUserPublicKey())),
    TokenInstructions.mintTo({
      mint: mintPubkey,
      destination: newAccountPubkey.publicKey,
      amount: initBalance,
      mintAuthority: getUserPublicKey(),
    })
  )

  await getProvider()!.send(tx, [newAccountPubkey])
  return newAccountPubkey.publicKey
}*/

export async function processExchange(
  exchange: PublicKey,
  exchangeAccount: any,
  itemReceiver: PublicKey,
  currencyHolder: PublicKey
) {
  const [sellerPda] = await solanaWeb3.PublicKey.findProgramAddress(
    [exchangeAccount.item.toBuffer(), exchangeAccount.seller.toBuffer()],
    banksyWeb3.sol.Exchange!.programId
  )

  await banksyWeb3.sol.Exchange!.rpc.processExchange({
    accounts: {
      exchange,
      seller: exchangeAccount.seller,
      buyer: getUserPublicKey(),
      currencyHolder,
      currencyHolderAuth: getUserPublicKey(),
      itemHolder: exchangeAccount.itemHolder,
      itemHolderAuth: sellerPda,
      itemReceiver: itemReceiver,
      currencyReceiver: exchangeAccount.currencyReceiver,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
      nftProgram: banksyWeb3.sol.Banksy!.programId,
    },
  })
}

// Exchange Process Module -- end
// --------------------------------------------------------------------------------------------------------------------

export async function closeExchange(nftPubKeyStr: string, exchangePubKeyStr: string) {
  const exchange = new PublicKey(exchangePubKeyStr)

  const exchangeProgram = banksyWeb3.sol.Exchange!
  const nftProgram = banksyWeb3.sol.Banksy!

  const exchangeAccount: any = await exchangeProgram.account.exchange.fetch(exchange) // get exchange data

  const [sellerPda] = await solanaWeb3.PublicKey.findProgramAddress([exchangeAccount.item.toBuffer(), exchangeAccount.seller.toBuffer()], exchangeProgram.programId)

  const sellerItemAccount = await findUserAccount(nftProgram, exchangeAccount.seller, exchangeAccount.item)

  await exchangeProgram.rpc.closeExchange({
    accounts: {
      exchange: exchange,
      seller: exchangeAccount.seller,
      itemHolder: exchangeAccount.itemHolder,
      itemHolderAuth: sellerPda,
      itemReceiver: sellerItemAccount,
      nftProgram: nftProgram.programId,
    },
  })

  await cancelExchange(nftPubKeyStr)
}
