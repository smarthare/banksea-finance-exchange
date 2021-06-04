import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0xb1e45866BF3298A9974a65577c067C477D38712a'

class Banksy extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./Banksy.json').abi,
      signer || provider
    )
  }

  async awardItem(address: string, tokenUri: string) {
    return await this.contract!.awardItem(address, tokenUri)
  }
}

export default Banksy
