import BanksyJsBase from './BanksyJsBase'
import ContractSettings from './ContractSettings'
import PlanetItem from './contracts/PlanetItem'

class BanksyJs extends BanksyJsBase {

  PlanetItem: PlanetItem

  /**
   * Creates instances of Shadows contracts based on ContractSettings.
   * @constructor
   * @param contractSettings {ContractSettings}
   */
  constructor(contractSettings?: ContractSettings) {
    super(contractSettings)

    const network = contractSettings?.network
    const signer = contractSettings?.signer
    const provider = contractSettings?.provider

    this.PlanetItem = new PlanetItem(network || '', signer, provider)
  }
}

export {
  BanksyJs
}
