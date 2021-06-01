import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0xa4580D638c1D61c5C14b1e2d219c3D1F35D587C2'

class LibAsset extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./abi/LibAsset.json'),
      signer || provider
    )
  }

}

export default LibAsset
