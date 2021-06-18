import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'

import App from './App'
import configureStore from './store'
import { Provider } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Web3EnvContextProvider } from './contexts/Web3EnvProvider'
import { WalletSelectionModalProvider } from './contexts/WalletSelectionModal'
import { QueryClient, QueryClientProvider } from 'react-query'

const { store, persistor } = configureStore()

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingOutlined />} persistor={persistor}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Web3EnvContextProvider>
            <WalletSelectionModalProvider>
              <App />
            </WalletSelectionModalProvider>
          </Web3EnvContextProvider>
        </QueryClientProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
