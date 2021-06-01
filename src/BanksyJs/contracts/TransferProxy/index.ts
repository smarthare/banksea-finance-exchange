import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0xb0b465e93233B91d5b29D6F06C0049AB233821F7'

class TransferProxy extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./abi/TransferProxy.json'),
      signer || provider
    )
  }

}

export default TransferProxy
