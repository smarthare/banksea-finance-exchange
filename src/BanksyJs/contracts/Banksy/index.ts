import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0x01B27fb23153a10D9617AE89f39B9ff5bD1C0e01'

class Banksy extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./abi/Banksy.json'),
      signer || provider
    )
  }

  async awardItem(address: string, tokenUri: string) {
    return await this.contract!.awardItem(address, tokenUri)
  }
}

export default Banksy
