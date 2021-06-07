import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { setChainId, setRpcUrl } from '../store/wallet'
import { useInitializeProvider, useSetupNetwork } from '../hooks'

const Web3EnvContext = React.createContext({ providerInitialized: false, networkReady: false })

const Web3EnvContextProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const hexChainId = process.env.REACT_APP_CHAIN_ID!
  const decChainId = parseInt(hexChainId, 16)
  const RPCUrl = process.env.REACT_APP_RPC_URL!
  const blockExplorerUrl = process.env.REACT_APP_BLOCK_EXPLORER_URL!
  const chainName = process.env.REACT_APP_NETWORK_NAME!

  dispatch(setChainId(decChainId))
  dispatch(setRpcUrl(RPCUrl))

  const providerInitialized = useInitializeProvider(decChainId, RPCUrl)
  const networkReady = useSetupNetwork(providerInitialized, {
    blockExplorerUrls: [blockExplorerUrl],
    chainName,
    chainId: hexChainId,
    rpcUrls: [RPCUrl]
  })

  return <Web3EnvContext.Provider value={{ providerInitialized, networkReady }}>{children}</Web3EnvContext.Provider>
}

const useWeb3EnvContext = () => {
  return useContext(Web3EnvContext)
}

export { Web3EnvContext, Web3EnvContextProvider, useWeb3EnvContext }
