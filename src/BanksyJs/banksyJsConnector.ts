import { BanksyJs } from './index'
import ContractSettings from './ContractSettings'
import { Web3Provider } from '@ethersproject/providers'

type BanksyJsConnector = {
  initialized: boolean,
  banksyJs: BanksyJs,
  synths?: unknown,
  signer?: unknown,
  provider?: Web3Provider,
  web3Utils?: unknown,
  ethersUtils?: unknown,
  setContractSettings: (_: ContractSettings) => void
}

const banksyJsConnector: BanksyJsConnector = {
  initialized: false,
  banksyJs: new BanksyJs(),

  setContractSettings(contractSettings: ContractSettings) {
    this.initialized = true
    this.banksyJs = new BanksyJs(contractSettings)
    this.synths = this.banksyJs.contractSettings.synths
    this.signer = this.banksyJs.contractSettings.signer
    this.provider = this.banksyJs.contractSettings.provider
  }
}

export { banksyJsConnector }
