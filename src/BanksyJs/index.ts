import BanksyJsBase from './BanksyJsBase'
import ContractSettings from './ContractSettings'
import PlanetItem from './contracts/PlanetItem'
import OpenSea from './contracts/OpenSea'

class BanksyJs extends BanksyJsBase {

  PlanetItem: PlanetItem
  OpenSea: OpenSea

  /**
   * Creates instances of contracts based on ContractSettings.
   * @constructor
   * @param contractSettings {ContractSettings}
   */
  constructor(contractSettings?: ContractSettings) {
    super(contractSettings)

    const network = contractSettings?.network
    const signer = contractSettings?.signer
    const provider = contractSettings?.provider

    this.PlanetItem = new PlanetItem(network || '', signer, provider)
    this.OpenSea = new OpenSea(network || '',signer, provider)
  }
}

export {
  BanksyJs
}
