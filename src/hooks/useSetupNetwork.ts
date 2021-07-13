import {
  EthereumChainParams,
  setupBinanceWalletNetwork,
  setupMetamaskNetwork,
  setupWalletConnectNetwork
} from '../BanksyWeb3/contracts/ethereum/networkHelper'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedWallet, setAccount, setSelectedWallet } from '../store/wallet'
import { getWeb3ProviderByWallet, WalletNames } from '../web3/wallets'
import { useCallback, useEffect, useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'

async function checkPhantomNetwork() {
  return true
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

    if (selectedWallet === 'Phantom') {
      setReady(await checkPhantomNetwork())
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
