import { NFTCreateForm } from '../../pages/Home/NFTCreate'
import { CreateNftEvents } from './events'
import SimpleEventEmitter from './SimpleEventEmitter'

class NoImplementError extends Error {
  constructor() {
    super('Not implement yet.')
  }
}

export interface BanksyWeb3Services {

  createNft: (_nftCreateForm: NFTCreateForm, _account: string) => SimpleEventEmitter<CreateNftEvents>
}

class BanksyWeb3ServicesEmptyImpl implements BanksyWeb3Services {
  createNft(_nftCreateForm: NFTCreateForm, _account: string): SimpleEventEmitter<CreateNftEvents> {
    throw new NoImplementError()
  }
}

export { BanksyWeb3ServicesEmptyImpl }
