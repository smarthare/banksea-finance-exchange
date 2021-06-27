import { BanksyEthereumWeb3 } from './ethereum'
import ContractSettings from './ethereum/ContractSettings'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { BanksySolanaWeb3 } from './solana'
import { PhantomProvider } from '../types/Phantom'

type BanksyWeb3 = {
  initialized: boolean,
  eth: BanksyEthereumWeb3,
  sol: BanksySolanaWeb3,
  signer?: Signer,
  provider?: Web3Provider | PhantomProvider,
  setEthereumWeb3: (_: ContractSettings) => void
  setSolanaWeb3: (_: PhantomProvider) => void
}

const banksyWeb3: BanksyWeb3 = {
  initialized: false,
  eth: new BanksyEthereumWeb3(),
  sol: new BanksySolanaWeb3(),

  setEthereumWeb3(contractSettings: ContractSettings) {
    this.initialized = true
    this.eth = new BanksyEthereumWeb3(contractSettings)
    this.signer = contractSettings.signer
    this.provider = contractSettings.provider
  },

  setSolanaWeb3(phantomProvider: PhantomProvider) {
    this.initialized = true
    this.sol = new BanksySolanaWeb3(phantomProvider)
    this.provider = phantomProvider
  }
}

export { banksyWeb3 }
