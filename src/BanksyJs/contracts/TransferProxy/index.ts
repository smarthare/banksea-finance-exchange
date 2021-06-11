import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0x928Fd76a5C287D7A334fdfb7DbAE91422Dabd98A'

class TransferProxy extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./TransferProxy.json').abi,
      signer || provider
    )
  }

}

export default TransferProxy
