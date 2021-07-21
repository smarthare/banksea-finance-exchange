import { NFTCreateForm } from '../../../pages/Home/NFTCreate'
import { BanksyWeb3Services } from '../index'
import SimpleEventEmitter from '../SimpleEventEmitter'
import { CreateNftEvents } from '../events'
import { Address, BN, web3 as solanaWeb3 } from '@project-serum/anchor'
import { banksyWeb3 } from '../../index'
import { PublicKey } from '@solana/web3.js'
import { generateNftMetadata } from '../../../utils'
import { pinJsonToIPFS } from '../../../utils/ipfs'

/**
 * return the public key of created NFT
 * @param ipfsHash
 * @private
 */
async function createNftAccount(ipfsHash: string): Promise<PublicKey> {
  const uri = `ipfs://ipfs/${ipfsHash}`
  const supply = new BN(1)

  const program = banksyWeb3.sol.Banksy!

  const nftKeypair = solanaWeb3.Keypair.generate()
  const userKeypair = program.provider.wallet.publicKey
  const userAccount = await program.account.userAccount.associatedAddress(
    userKeypair, nftKeypair.publicKey
  )

  await program.rpc.createNft(uri, supply, {
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

  return nftKeypair.publicKey
}

async function getNftAccountInfo(nftAccount: Address) {
  const program = banksyWeb3.sol.Banksy!
  return await program.account.nftAccount.fetch(nftAccount)
}

export class BanksyWeb3SolanaServicesImpl implements BanksyWeb3Services {

  createNft(nftCreateForm: NFTCreateForm, account: string): SimpleEventEmitter<CreateNftEvents> {
    const ee = new SimpleEventEmitter<CreateNftEvents>()

    ee.task = async () => {
      const nftMetadata = generateNftMetadata(nftCreateForm)

      ee.emit('pinning_json')

      const pinResult = await pinJsonToIPFS(nftMetadata).catch(e => {
        const error = e.response?.data?.error ?? e?.toString() ?? 'unknown error'
        ee.emit('json_pinned_failed', error)
      })

      if (!pinResult) {
        return
      }

      ee.emit('json_pinned')

      const { IpfsHash } = pinResult

      const createForm: NftCreateForm = {
        uri: IpfsHash,
        addressCreate: account,
        tokenId: '',
        group: '',
        nameArtist: nftCreateForm.artistName,
        fee: '',
        feeRecipient: '',
        typeChain: 'Solana',
        supply: 1
      }

      createNftAccount(IpfsHash)
        .then(async () => {
          ee.emit('submitted')
          await createNFT(createForm)
          ee.emit('complete')
        })
        .catch(e => {
          ee.emit('wallet_error', e)
        })
    }

    return ee
  }
}
