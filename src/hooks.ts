import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, useCallback, useEffect, useState } from 'react'
import { getSelectedWallet, setAccount, setSelectedWallet } from './store/wallet'
import { getWeb3ProviderByWallet, WalletNames } from './web3/wallets'
import { providers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import {
  EthereumChainParams,
  setupBinanceWalletNetwork,
  setupMetamaskNetwork,
  setupWalletConnectNetwork
} from './BanksyJs/networkHelper'
import { Web3Provider } from '@ethersproject/providers'
import { banksyJsConnector } from './BanksyJs/banksyJsConnector'
import ContractSettings from './BanksyJs/ContractSettings'
import { getPhantomProvider } from './web3/providers/Phantom'

async function initWalletConnect(dispatch: Dispatch<any>, provider: Web3Provider) {
  const walletConnectProvider = provider.provider as WalletConnectProvider

  await walletConnectProvider.enable()

  const handleAccountChange = (accounts: string[]) => {
    const [account] = accounts
    dispatch(setAccount(account))
    dispatch(setSelectedWallet('WalletConnect'))
  }

  const handleDisconnect = (code: number, reason: string) => {
    console.log(code, reason)
    dispatch(setAccount(null))
    dispatch(setSelectedWallet(undefined))

    walletConnectProvider.stop()
    walletConnectProvider.removeListener('accountsChanged', handleAccountChange)
  }

  // @ts-ignore
  const handleChainChanged = (_, __) => {
    console.log(_, __)
  }

  walletConnectProvider.removeListener('disconnect', handleDisconnect)
  walletConnectProvider.removeListener('accountsChanged', handleAccountChange)
  walletConnectProvider.removeListener('chainChanged', handleChainChanged)

  walletConnectProvider.on('disconnect', handleDisconnect)
  walletConnectProvider.on('accountsChanged', handleAccountChange)
  walletConnectProvider.on('chainChanged', handleChainChanged)
}

async function initMetamaskOrBSCWallet(dispatch: Dispatch<any>, provider: Web3Provider) {
  // @ts-ignore
  provider.provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
    const [account] = accounts
    dispatch(setAccount(account))
  })

  // @ts-ignore
  provider.provider.on('accountsChanged', async (newAccount, oldAccount) => {
    console.log('on accounts changed: ', newAccount, oldAccount)
    if (!newAccount.length) {
      dispatch(setAccount(null))
      dispatch(setSelectedWallet(undefined))
    } else {
      dispatch(setAccount(newAccount[0]))
    }
  })

  // @ts-ignore
  provider.provider.on('chainChanged', async (newChain, oldChain) => {
    console.log(newChain, oldChain)
    window.location.reload()
  })
}

export function useInitializeProvider(chainId: number, RPCUrl?: string): boolean {
  const dispatch = useDispatch()
  const [initialized, setInitialized] = useState(false)
  const selectedWallet = useSelector(getSelectedWallet) as WalletNames

  const initialize = useCallback(async () => {
    let provider: providers.Web3Provider | undefined
    try {
      provider = await getWeb3ProviderByWallet({ chainId, RPCUrl }, selectedWallet)
      if (!selectedWallet) {
        setInitialized(false)
        return
      }

      if (selectedWallet === 'WalletConnect') {
        initWalletConnect(dispatch, provider!)
      } else if (selectedWallet === 'Metamask' || selectedWallet === 'BSC') {
        initMetamaskOrBSCWallet(dispatch, provider!)
      } else if (selectedWallet === 'Phantom') {
        const provider = await getPhantomProvider()
        if (!provider) {
          return
        }

        await provider.disconnect()
        await provider.connect()
        const account = provider.publicKey?.toBase58()
        if (!account) {
          dispatch(setAccount(null))
          dispatch(setSelectedWallet(undefined))
        }
        dispatch(setAccount(account))
      }
    } catch (e) {
      dispatch(setAccount(null))
      dispatch(setSelectedWallet(undefined))
      return
    }

    if (selectedWallet !== 'Phantom') {
      banksyJsConnector.setContractSettings(new ContractSettings(
        provider,
        provider?.getSigner ? provider.getSigner() : null,
        chainId
      ))
    }
    setInitialized(true)
  }, [selectedWallet, chainId, RPCUrl])

  useEffect(() => {
    initialize()
  }, [initialize])

  return initialized
}

export function useSetupNetwork(providerInitialized: boolean, params: EthereumChainParams): boolean {
  const chainId = parseInt(params.chainId, 16)
  const [RPCUrl] = params.rpcUrls

  const dispatch = useDispatch()
  const selectedWallet = useSelector(getSelectedWallet) as WalletNames
  const [ready, setReady] = useState(false)

  const setup = useCallback(async () => {
    if (!selectedWallet || !providerInitialized) {
      setReady(false)
      return
    }

    const web3Provider = ((await getWeb3ProviderByWallet(
      {
        chainId,
        RPCUrl
      },
      selectedWallet
    )) as unknown) as Web3Provider

    if (selectedWallet === 'WalletConnect') {
      if (await setupWalletConnectNetwork(params, web3Provider)) {
        setReady(true)
      } else {
        setReady(false)
        dispatch(setAccount(''))
        dispatch(setSelectedWallet(undefined))
      }
      return
    }

    // WalletConnect couldn't use this method because not enable() before
    web3Provider?.ready
      ?.then(async network => {
        if (network.chainId === parseInt(params.chainId, 16)) {
          setReady(true)
          return
        }

        if (selectedWallet === 'Metamask') {
          setReady(await setupMetamaskNetwork(params))
        } else if (selectedWallet === 'BSC') {
          setReady(await setupBinanceWalletNetwork(params))
        }
      })
      .catch(async () => {
        if (selectedWallet === 'Metamask') {
          setReady(await setupMetamaskNetwork(params))
        } else if (selectedWallet === 'BSC') {
          setReady(await setupBinanceWalletNetwork(params))
        }
      })
  }, [selectedWallet, providerInitialized, params])

  useEffect(() => {
    setup()
  }, [setup])

  return ready
}

export function useWalletErrorMessageGetter(): { walletErrorMessageGetter: (_e: any) => any } {
  const selectedWallet = useSelector(getSelectedWallet) as WalletNames | undefined

  const walletErrorMessageGetter = useCallback((e: any) => {
    if (!selectedWallet) {
      return 'No Wallet Connected'
    } else if (selectedWallet === 'Metamask') {
      const detailMessage = e.data ? ` (${e.data.message})` : ''
      return `${e.message}${detailMessage}`
    } else if (selectedWallet === 'BSC') {
      return e.error
    } else if (selectedWallet === 'WalletConnect') {
      return e.toString()
    } else {
      throw new Error('Unknown selected wallet')
    }
  }, [selectedWallet])

  return {
    walletErrorMessageGetter
  }
}
