import { BanksyEthereumWeb3 } from './contracts/ethereum'
import ContractSettings from './contracts/ethereum/ContractSettings'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { BanksySolanaWeb3 } from './contracts/solana'
import { PhantomProvider } from '@/types/Phantom'
import { BanksyWeb3Services, BanksyWeb3ServicesEmptyImpl } from './services'
import { BanksyWeb3EthereumServicesImpl } from './services/ethereum'
import { BanksyWeb3SolanaServicesImpl } from './services/solana'

type BanksyWeb3 = {
  onEth: boolean
  onSol: boolean
  eth: BanksyEthereumWeb3
  sol: BanksySolanaWeb3
  services: BanksyWeb3Services
  signer?: Signer
  provider?: Web3Provider | PhantomProvider
  setEthereumWeb3: (_: ContractSettings) => void
  setSolanaWeb3: (_: PhantomProvider) => void
  destroy: () => void
}

const banksyWeb3: BanksyWeb3 = {
  eth: new BanksyEthereumWeb3(),
  sol: new BanksySolanaWeb3(),
  onEth: false,
  onSol: false,
  services: new BanksyWeb3ServicesEmptyImpl(),

  setEthereumWeb3(contractSettings: ContractSettings) {
    this.onEth = true
    this.onSol = false
    this.eth = new BanksyEthereumWeb3(contractSettings)
    this.signer = contractSettings.signer
    this.provider = contractSettings.provider
    this.services = new BanksyWeb3EthereumServicesImpl()
  },

  setSolanaWeb3(phantomProvider: PhantomProvider) {
    this.onEth = false
    this.onSol = true
    this.sol = new BanksySolanaWeb3(phantomProvider)
    this.provider = phantomProvider
    this.services = new BanksyWeb3SolanaServicesImpl()
  },

  destroy() {
    this.eth = new BanksyEthereumWeb3()
    this.sol = new BanksySolanaWeb3()
    this.onSol = false
    this.onEth = false
    this.services = new BanksyWeb3ServicesEmptyImpl()
  }
}

export { banksyWeb3 }
