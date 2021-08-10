import { BN, web3 as solanaWeb3 } from '@project-serum/anchor'
import { banksyWeb3 } from '../../index'

export type CreateNftAccountResult = {
  nftPubKey: string
  userAccountPubKey: string
  transactionStatus: Promise<string>
}

/**
 * return the public key of created NFT
 * @param ipfsHash
 * @private
 */
export async function createNftAccount(ipfsHash: string): Promise<CreateNftAccountResult> {
  const uri = `ipfs://ipfs/${ipfsHash}`
  const supply = new BN(1)

  const program = banksyWeb3.sol.Banksy!

  const nftKeypair = solanaWeb3.Keypair.generate()

  const userKeypair = program.provider.wallet.publicKey
  const userAccount = await program.account.userAccount.associatedAddress(
    userKeypair, nftKeypair.publicKey
  )

  const transactionStatus = program.rpc.createNft(uri, supply, {
    accounts: {
      nft: nftKeypair.publicKey,
      authority: userKeypair,
      user: userAccount,
      payer: userKeypair,
      systemProgram: solanaWeb3.SystemProgram.programId,
      rent: solanaWeb3.SYSVAR_RENT_PUBKEY
    },
    signers: [nftKeypair],
    instructions: [await program.account.nftAccount.createInstruction(nftKeypair, 256)]
  })

  return {
    nftPubKey: nftKeypair.publicKey.toBase58(),
    userAccountPubKey: userAccount.toBase58(),
    transactionStatus
  }
}
