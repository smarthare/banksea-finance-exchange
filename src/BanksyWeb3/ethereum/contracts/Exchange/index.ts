import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0x1Da28CC4693477E97BE4FA592918C216aE79D7aa'

class Exchange extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./Exchange.json'),
      signer || provider
    )
  }
  async matchSingle(leftOrder: any, leftSign: any, rightOrder: any, rightSign: any) {
    return await this.contract!.matchSingle(leftOrder, leftSign, rightOrder, rightSign)
  }

}

export default Exchange
