import { getUriByIpfsHash, pinJsonToIPFS } from '../../../utils/ipfs'
import { banksyWeb3 } from '../../index'
import { NFTCreateForm } from '../../../pages/Home/NFTCreate'
import { generateNftMetadata } from '../../../utils'
import { BanksyWeb3Services } from '../index'
import SimpleEventEmitter from '../SimpleEventEmitter'
import { CreateNftEvents } from '../events'
import { createNFT, NftCreateForm } from '../../../apis/nft'

export class BanksyWeb3EthereumServicesImpl implements BanksyWeb3Services {

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

      const tokenUri = getUriByIpfsHash(IpfsHash)

      const createForm: NftCreateForm = {
        uri: IpfsHash,
        addressCreate: account!,
        tokenId: '',
        group: '',
        nameArtist: nftCreateForm.artistName,
        fee: '',
        feeRecipient: '',
        typeChain: 'Ethereum'
      }

      banksyWeb3.eth.Banksy.awardItem(account!, tokenUri)
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
