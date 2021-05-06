import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AppFooter from './_common/AppFooter/AppFooter'
import Header from './_common/AppHeader/Header'

import AssetPage from './AssetPage/AssetPage'
// import BundlePage from './BundlePage/BundlePage'
import BundlesPage from './BundlesPage/BundlesPage'
import './app.css'
import SideBar from './_common/AppNavbar/SideBar'

export const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <SideBar />
        <div className="app">
          <Switch>
            <Route exact path="/">
              <BundlesPage />
            </Route>
            <Route path="/bundles">
              <BundlesPage />
            </Route>
            <Route path="/assets/:assetId">
              <AssetPage />
            </Route>
          </Switch>
        </div>
        <AppFooter />
      </div>
    </Router>
  )
}

export default App
