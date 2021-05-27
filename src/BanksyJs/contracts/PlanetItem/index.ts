import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const PlanetItemContractAddress = '0x9693524a2c34E12b683C347f74242E9d7Fb89E1c'

class PlanetItem extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      PlanetItemContractAddress,
      require('./abi/PlanetItem.json'),
      signer || provider
    )
  }

  async awardItem(address: string, tokenUri: string) {
    return await this.contract!.awardItem(address, tokenUri)
  }
}

export default PlanetItem
