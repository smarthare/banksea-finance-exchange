import React from 'react'
import './app.scss'
import { Layout } from 'antd'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
import routes from './routes'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setChainId, setRpcUrl } from './store/wallet'
import { useInitializeProvider, useSetupNetwork } from './hooks'

const App: React.FC = () => {
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

  return (
    <Layout>
      <Layout.Header style={{ padding: 0, height: '82px', position: 'fixed', zIndex: 999, width: '100%' }}>
        <AppHeader />
      </Layout.Header>
      <Layout>
        <Layout.Sider style={{ position: 'fixed', zIndex: 1, top: '82px' }}>
          <AppSideBar />
        </Layout.Sider>
        <Layout.Content
          style={{
            backgroundColor: '#FAF9FA',
            position: 'relative',
            top: '82px',
            left: '272px'
          }}
        >
          {
            networkReady &&
            <div style={{ width: 'calc(100vw - 272px)' }}>
              {routes.map(route => (
                <Route path={route.path} exact component={route.component} key={route.path} />
              ))}
            </div>
          }
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
