import { BanksyEthereumWeb3 } from './ethereum'
import ContractSettings from './ethereum/ContractSettings'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { BanksySolanaWeb3 } from './solana'
import { PhantomProvider } from '../types/Phantom'

type BanksyWeb3 = {
  onEth: boolean,
  onSol: boolean,
  eth: BanksyEthereumWeb3,
  sol: BanksySolanaWeb3,
  signer?: Signer,
  provider?: Web3Provider | PhantomProvider,
  setEthereumWeb3: (_: ContractSettings) => void
  setSolanaWeb3: (_: PhantomProvider) => void
}

const banksyWeb3: BanksyWeb3 = {
  eth: new BanksyEthereumWeb3(),
  sol: new BanksySolanaWeb3(),
  onEth: false,
  onSol: false,

  setEthereumWeb3(contractSettings: ContractSettings) {
    this.onEth = true
    this.onSol = false
    this.eth = new BanksyEthereumWeb3(contractSettings)
    this.signer = contractSettings.signer
    this.provider = contractSettings.provider
  },

  setSolanaWeb3(phantomProvider: PhantomProvider) {
    this.onEth = false
    this.onSol = true
    this.sol = new BanksySolanaWeb3(phantomProvider)
    this.provider = phantomProvider
  }
}

export { banksyWeb3 }
