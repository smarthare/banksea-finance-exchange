import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'
import { ExchangeOrder } from '../../services/exchange/types'

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

  async matchSingle(sellOrder: ExchangeOrder, sellSign: string, buyOrder: ExchangeOrder, buySign: string, value: string) {
    return await this.contract!.matchSingle(sellOrder, sellSign, buyOrder, buySign, { value })
  }

}

export default Exchange
