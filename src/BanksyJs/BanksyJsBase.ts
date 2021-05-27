import ContractSettings from './ContractSettings'

class BanksyJsBase {
  contractSettings: any
  network: any

  constructor(contractSettings?: ContractSettings) {
    if (!contractSettings) {
      return
    }

    this.contractSettings = contractSettings
    const { network } = contractSettings
    this.network = network
  }
}

export default BanksyJsBase
