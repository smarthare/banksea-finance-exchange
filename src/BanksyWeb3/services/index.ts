import { NFTCreateForm } from '../../pages/Home/NFTCreate'
import { CreateNftEvents } from './events'
import SimpleEventEmitter from '../../utils/SimpleEventEmitter'
import { NftDetail } from '../../types/NFTDetail'

export class NoImplementError extends Error {
  constructor() {
    super('Not implement yet. Please connect to wallet first.')
  }
}

export type PurchaseByFixedPriceParams = {
  nftDetail: any
  account: string
  onAuthorized: () => void
  onSuccess: () => void
  onFailed?: () => void
}

export interface BanksyWeb3Services {

  createNft: (_nftCreateForm: NFTCreateForm, _account: string) => SimpleEventEmitter<CreateNftEvents>

  listByFixedPrice: (_nftDetail: NftDetail, _price: string, _account?: string) => any

  checkBalance: (_nftDetail: any) => Promise<void>

  purchaseByFixedPrice: (_params: PurchaseByFixedPriceParams) => any
}

class BanksyWeb3ServicesEmptyImpl implements BanksyWeb3Services {

  createNft(_nftCreateForm: NFTCreateForm, _account: string): SimpleEventEmitter<CreateNftEvents> {
    throw new NoImplementError()
  }

  listByFixedPrice(_nftDetail: NftDetail, _price: string): SimpleEventEmitter<any> {
    throw new NoImplementError()
  }

  checkBalance(_nftDetail: any): Promise<void> {
    throw new NoImplementError()
  }

  purchaseByFixedPrice(_params: PurchaseByFixedPriceParams): any {
    throw new NoImplementError()
  }
}

export { BanksyWeb3ServicesEmptyImpl }
