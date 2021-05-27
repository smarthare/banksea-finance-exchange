import { Web3Provider } from '@ethersproject/providers'
import { message } from 'antd'
import WalletConnectProvider from '@walletconnect/web3-provider'

export const SUPPORTED_NETWORKS = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
  97: 'bsctestnet',
  56: 'bsc'
}

export type EthereumChainParams = {
  chainId: string
  chainName: string
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export async function setupMetamaskNetwork(params: EthereumChainParams) {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [params]
      })
      return true
    } catch (error) {
      if (error.message.includes('May not specify default MetaMask chain.')) {
        message.warn(`Please manually switch to the ${params.chainName} in MetaMask`, 5)
      }

      if (error.message.includes('User rejected the request.')) {
        message.warn('Please allow switching network in Metamask')
      }
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

export async function setupWalletConnectNetwork(params: EthereumChainParams, web3Provider: Web3Provider) {
  const provider = web3Provider.provider as WalletConnectProvider
  if (provider.wc.chainId !== parseInt(params.chainId, 16)) {
    message.warn(
      `Please manually switch to the ${params.chainName} in your WalletConnect App, and then try to re-connect.`,
      3
    )
    provider.wc.killSession()
    provider.close()

    setTimeout(() => {
      window.location.reload()
    }, 3000)

    return false
  } else {
    await provider.enable()
    return true
  }
}

export async function setupBinanceWalletNetwork(params: EthereumChainParams) {
  const supportChainIdList = [parseInt(process.env.CHAIN_ID!, 16)]

  if (!supportChainIdList.includes(parseInt(params.chainId, 16))) {
    message.warn(`Binance Chain Wallet does NOT support for ${params.chainName}`)
    return false
  }

  message.warn(`Please manually switch to the ${params.chainName} in Binance Chain Wallet`, 5)
  return false
}
