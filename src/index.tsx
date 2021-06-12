import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'

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
      <QueryClientProvider client={queryClient}>
        <Web3EnvContextProvider>
          <WalletSelectionModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WalletSelectionModalProvider>
        </Web3EnvContextProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
