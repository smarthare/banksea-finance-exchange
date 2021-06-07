import MetamaskIcon from '../assets/images/wallets/metamask.svg'
import BSCIcon from '../assets/images/wallets/bsc.png'
import WalletConnectIcon from '../assets/images/wallets/walletconnect.svg'
import { getChainId, getRpcUrl, setAccount, setSelectedWallet } from '../store/wallet'
import { providers } from 'ethers'
import { Dispatch } from 'redux'
import { MetamaskWeb3Provider } from './providers/Metamask'
import { WalletConnectWeb3Provider } from './providers/WalletConnect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BscWeb3Provider } from './providers/BSC'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

export type WalletNames = 'Metamask' | 'BSC' | 'WalletConnect'

export interface Wallet {
  name: string
  icon: string
  handleConnect: (_dispatch: Dispatch<any>, _chainId: number, _RPCUrl?: string) => void
}

export async function getWeb3ProviderByWallet(
  // @ts-ignore
  { chainId, RPCUrl },
  walletName?: WalletNames
): Promise<providers.Web3Provider | undefined> {
  if (!walletName) {
    return undefined
  }

  return await new Map<WalletNames, any>([
    ['Metamask', MetamaskWeb3Provider],
    ['BSC', BscWeb3Provider],
    ['WalletConnect', WalletConnectWeb3Provider]
  ]).get(walletName)({
    chainId,
    RPCUrl
  })
}

const connectToMetamask = async (dispatch: Dispatch<any>, chainId: number, RPCUrl?: string): Promise<void> => {
  const web3Provider = (await getWeb3ProviderByWallet(
    {
      chainId,
      RPCUrl
    },
    'Metamask'
  )) as providers.Web3Provider

  await web3Provider.provider.request?.({ method: 'eth_requestAccounts' })
  dispatch(setSelectedWallet('Metamask'))
}

const connectToBSC = async (dispatch: Dispatch<any>, chainId: number, RPCUrl?: string): Promise<void> => {
  const web3Provider = (await getWeb3ProviderByWallet(
    {
      chainId,
      RPCUrl
    },
    'BSC'
  )) as providers.Web3Provider

  await web3Provider.provider.request?.({ method: 'eth_requestAccounts' })
  dispatch(setSelectedWallet('BSC'))
}

const connectToWalletConnect = async (dispatch: Dispatch<any>, chainId: number, RPCUrl?: string): Promise<void> => {
  const web3Provider = (await getWeb3ProviderByWallet(
    {
      chainId,
      RPCUrl
    },
    'WalletConnect'
  )) as providers.Web3Provider

  const walletConnectProvider = web3Provider.provider as WalletConnectProvider

  console.log(`wc connected: ${walletConnectProvider.wc.connected}`)
  if (!walletConnectProvider.wc.connected) {
    walletConnectProvider.wc.connect({ chainId }).then(r => {
      console.log(r)
      const [account] = r.accounts
      dispatch(setAccount(account))
      dispatch(setSelectedWallet('WalletConnect'))
      const connectedChainId = r.chainId
      if (connectedChainId !== chainId) {
        message.warn('Not in correct network!')
      }
    })
  }

  // walletConnectProvider.enable()
  //   .then(accounts => {
  //     const [account] = accounts
  //     dispatch(setAccount(account))
  //     dispatch(setSelectedWallet('WalletConnect'))
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
}

export const SUPPORT_WALLETS: Wallet[] = [
  {
    name: 'Metamask',
    icon: MetamaskIcon,
    handleConnect: connectToMetamask
  },
  {
    name: 'Wallet Connect',
    icon: WalletConnectIcon,
    handleConnect: connectToWalletConnect
  },
  {
    name: 'Binance Chain Wallet',
    icon: BSCIcon,
    handleConnect: connectToBSC
  }
]

export const useConnectToWallet = () => {
  const dispatch = useDispatch()

  const chainId = useSelector(getChainId)
  const RPCUrl = useSelector(getRpcUrl)

  const connect = (wallet: Wallet) => chainId && RPCUrl && wallet.handleConnect(dispatch, chainId, RPCUrl)

  return {
    connect
  }
}


