import { getDefaultProvider } from 'ethers'
import { SUPPORTED_NETWORKS } from './networkHelper'

class ContractSettings {
  networkId: number
  network: string
  provider: any
  signer: any

  constructor(provider: any, signer: any, networkId: any) {
    this.networkId = networkId
    this.network = SUPPORTED_NETWORKS[Number(this.networkId)]
    this.provider = provider || getDefaultProvider()
    if (!provider && networkId) {
      this.provider = getDefaultProvider(this.network)
    }
    this.signer = signer
  }
}

export default ContractSettings
