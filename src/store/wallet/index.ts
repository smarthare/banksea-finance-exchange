import { createSlice } from '@reduxjs/toolkit'
import { State, SupportedChain, WalletState } from '../type'
import { WalletNames } from '@/web3/wallets'

const initialState: WalletState = {
  selectedWallet: undefined,
  account: undefined,
  chainId: undefined,
  rpcUrl: undefined,
  currentChain: undefined
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setChainId: (state, action) => {
      state.chainId = action.payload
    },
    setRpcUrl: (state, action) => {
      state.rpcUrl = action.payload
    },
    setAccount: (state, action) => {
      if (!action.payload) {
        console.error('set account null')
      }

      if (state.account === action.payload) {
        return
      }

      state.account = action.payload
    },
    setSelectedWallet: (state, action: { payload: WalletNames | undefined, type: string }) => {
      state.selectedWallet = action.payload
    },
    setCurrentChain: (state, action: { payload: SupportedChain | undefined, type: string }) => {
      state.currentChain = action.payload
    }
  }
})

export function getChainId(state: State): number | undefined {
  return state.wallet.chainId
}

export function getRpcUrl(state: State): string | undefined {
  return state.wallet.rpcUrl
}

export function getAccount(state: State): string | undefined {
  return state.wallet.account
}

export function getSelectedWallet(state: State): string | undefined {
  return state.wallet.selectedWallet
}

export function getCurrentChain(state: State): SupportedChain | undefined {
  return state.wallet.currentChain
}

export const { setRpcUrl, setChainId, setAccount, setSelectedWallet, setCurrentChain } = walletSlice.actions

export default walletSlice.reducer
