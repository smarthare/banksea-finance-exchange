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

const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingOutlined />} persistor={persistor}>
      <Web3EnvContextProvider>
        <WalletSelectionModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WalletSelectionModalProvider>
      </Web3EnvContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
