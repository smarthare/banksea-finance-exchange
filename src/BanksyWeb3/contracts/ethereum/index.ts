import ContractSettings from './ContractSettings'
import Banksy from './contracts/Banksy'
import Exchange from './contracts/Exchange'
import LibAsset from './contracts/LibAsset'
import LibOrder from './contracts/LibOrder'
import TransferProxy from './contracts/TransferProxy'

export class BanksyEthereumWeb3 {
  Banksy: Banksy
  Exchange: Exchange
  LibAsset: LibAsset
  LibOrder: LibOrder
  TransferProxy: TransferProxy

  /**
   * Creates instances of contracts based on ContractSettings.
   * @constructor
   * @param contractSettings {ContractSettings}
   */
  constructor(contractSettings?: ContractSettings) {
    const network = contractSettings?.network || 'mainnet'
    const signer = contractSettings?.signer
    const provider = contractSettings?.provider

    this.Banksy = new Banksy(network, signer, provider)
    this.Exchange = new Exchange(network, signer, provider)
    this.LibAsset = new LibAsset(network , signer, provider)
    this.LibOrder = new LibOrder(network , signer, provider)
    this.TransferProxy = new TransferProxy(network , signer, provider)
  }
}
