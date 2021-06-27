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
} from './BanksyWeb3/ethereum/networkHelper'
import { Web3Provider } from '@ethersproject/providers'
import { banksyWeb3 } from './BanksyWeb3'
import ContractSettings from './BanksyWeb3/ethereum/ContractSettings'
import { getPhantomProvider } from './web3/providers/Phantom'
import { PublicKey } from '@solana/web3.js'
import { PhantomProvider } from './types/Phantom'

type InitAndDestroy = {
  init: (_?: PhantomProvider) => void,
  destroy: () => void
}

async function initWalletConnect(dispatch: Dispatch<any>, provider: Web3Provider, { init, destroy }: InitAndDestroy) {
  const walletConnectProvider = provider.provider as WalletConnectProvider

  await walletConnectProvider.enable()

  const handleAccountChange = (accounts: string[]) => {
    const [account] = accounts
    dispatch(setAccount(account))
    dispatch(setSelectedWallet('WalletConnect'))
    init()
  }

  const handleDisconnect = (code: number, reason: string) => {
    console.log(code, reason)
    dispatch(setAccount(null))
    dispatch(setSelectedWallet(undefined))

    walletConnectProvider.stop()
    walletConnectProvider.removeListener('accountsChanged', handleAccountChange)
    destroy()
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

async function initMetamaskOrBSCWallet(dispatch: Dispatch<any>, provider: Web3Provider, {
  init,
  destroy
}: InitAndDestroy) {
  // @ts-ignore
  provider.provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
    const [account] = accounts
    dispatch(setAccount(account))
    init()
  })

  // @ts-ignore
  provider.provider.on('accountsChanged', async (newAccount, oldAccount) => {
    console.log('on accounts changed: ', newAccount, oldAccount)
    if (!newAccount.length) {
      dispatch(setAccount(null))
      dispatch(setSelectedWallet(undefined))
      destroy()
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

async function initPhantom(dispatch: Dispatch<any>, { init, destroy }: InitAndDestroy) {
  const provider = await getPhantomProvider()
  if (!provider) {
    throw new Error('phantom provider is undefined!')
  }

  const listenPublicKey = (publicKey: PublicKey) => {
    const account = publicKey?.toBase58()
    console.log('[init phantom] account: ', account)
    if (!account) {
      dispatch(setAccount(null))
      dispatch(setSelectedWallet(undefined))
    }
    dispatch(setAccount(account))
    init(provider)
  }

  await provider.connect()

  if (provider.publicKey) {
    listenPublicKey(provider.publicKey)
  }

  provider.on('connect', (e: any) => {
    listenPublicKey(e)
  })

  provider.on('disconnect', destroy)
}

export function useInitializeProvider(chainId: number, RPCUrl?: string): boolean {
  const dispatch = useDispatch()

  const selectedWallet = useSelector(getSelectedWallet) as WalletNames

  const [initialized, setInitialized] = useState(false)

  const destroy = () => setInitialized(false)

  const initialize = useCallback(async () => {
    let provider: providers.Web3Provider | undefined

    const init = (phantomProvider?: PhantomProvider) => {
      if (selectedWallet !== 'Phantom') {
        banksyWeb3.setEthereumWeb3(new ContractSettings(
          provider,
          provider?.getSigner ? provider.getSigner() : null,
          chainId
        ))
      } else {
        banksyWeb3.setSolanaWeb3(
          phantomProvider!
        )
      }
      setInitialized(true)
    }

    try {
      provider = await getWeb3ProviderByWallet({ chainId, RPCUrl }, selectedWallet)
      if (!selectedWallet) {
        setInitialized(false)
        return
      }

      if (selectedWallet === 'WalletConnect') {
        initWalletConnect(dispatch, provider!, { init, destroy })
      } else if (selectedWallet === 'Metamask' || selectedWallet === 'BSC') {
        initMetamaskOrBSCWallet(dispatch, provider!, { init, destroy })
      } else if (selectedWallet === 'Phantom') {
        initPhantom(dispatch, { init, destroy })
      }
    } catch (e) {
      dispatch(setAccount(null))
      dispatch(setSelectedWallet(undefined))
      return
    }
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
