import { WalletNames } from '../web3/wallets'

export type SupportedChain = 'Ethereum' | 'Solana'

export type State = {
  app: AppState
  wallet: WalletState
}

export type AppState = {

}

export type WalletState = {
  selectedWallet?: WalletNames
  account?: string
  chainId?: number
  currentChain?: SupportedChain
  rpcUrl?: string
}
