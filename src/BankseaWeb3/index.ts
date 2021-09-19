import { BankseaEthereumWeb3 } from './contracts/ethereum'
import ContractSettings from './contracts/ethereum/ContractSettings'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { BankseaSolanaWeb3 } from './contracts/solana'
import { PhantomProvider } from '@/types/Phantom'
import { BankseaWeb3Services, BankseaWeb3ServicesEmptyImpl } from './services'
import { BankseaWeb3EthereumServicesImpl } from './services/ethereum'
import { BankseaWeb3SolanaServicesImpl } from './services/solana'

type BankseaWeb3 = {
  onEth: boolean
  onSol: boolean
  eth: BankseaEthereumWeb3
  sol: BankseaSolanaWeb3
  services: BankseaWeb3Services
  signer?: Signer
  provider?: Web3Provider | PhantomProvider
  setEthereumWeb3: (_: ContractSettings) => void
  setSolanaWeb3: (_: PhantomProvider) => void
  destroy: () => void
}

const bankseaWeb3: BankseaWeb3 = {
  eth: new BankseaEthereumWeb3(),
  sol: new BankseaSolanaWeb3(),
  onEth: false,
  onSol: false,
  services: new BankseaWeb3ServicesEmptyImpl(),

  setEthereumWeb3(contractSettings: ContractSettings) {
    this.onEth = true
    this.onSol = false
    this.eth = new BankseaEthereumWeb3(contractSettings)
    this.signer = contractSettings.signer
    this.provider = contractSettings.provider
    this.services = new BankseaWeb3EthereumServicesImpl()
  },

  setSolanaWeb3(phantomProvider: PhantomProvider) {
    this.onEth = false
    this.onSol = true
    this.sol = new BankseaSolanaWeb3(phantomProvider)
    this.provider = phantomProvider
    this.services = new BankseaWeb3SolanaServicesImpl()
  },

  destroy() {
    this.eth = new BankseaEthereumWeb3()
    this.sol = new BankseaSolanaWeb3()
    this.onSol = false
    this.onEth = false
    this.services = new BankseaWeb3ServicesEmptyImpl()
  }
}

export { bankseaWeb3 }
