import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const OpenSeaContractAddress = '0xA87a5Fde732b04D4D96753DA281E240eaB71a3e2'

class OpenSea extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      OpenSeaContractAddress,
      require('./abi/OpenSea.json'),
      signer || provider
    )
  }

  async uri(_id: string) {
    return await this.contract!.uri(_id)
  }
}

export default OpenSea
