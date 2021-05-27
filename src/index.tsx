import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client/react'
import apolloClientService from './_services/apolloClientService'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App'
import configureStore from './store'
import { Provider } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

const { store, persistor } = configureStore()

ReactDOM.render(
  <ApolloProvider client={apolloClientService}>
    <Provider store={store}>
      <PersistGate loading={<LoadingOutlined />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
