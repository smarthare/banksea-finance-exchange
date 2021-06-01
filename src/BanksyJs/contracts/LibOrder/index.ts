import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0xC54e9df24738c621c39D8ceE89ef695d1b72a920'

class LibOrder extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./abi/LibOrder.json'),
      signer || provider
    )
  }

}

export default LibOrder
