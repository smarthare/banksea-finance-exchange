import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0x0f58cf6ab5A52A2B84FE5a7aA071E75B714293f4'

class Exchange extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./abi/Exchange.json'),
      signer || provider
    )
  }

}

export default Exchange
