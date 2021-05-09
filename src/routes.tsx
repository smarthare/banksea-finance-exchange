import { Route, Switch } from 'react-router-dom'
import BundlesPage from './BundlesPage/BundlesPage'
import AssetPage from './AssetPage/AssetPage'
import React from 'react'
import BundleDetailPage from './BundlesPage/BundleDetail'

const Routes: React.FC = () => {
  return (
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
      <Route path="/bundle/:slug">
        <BundleDetailPage />
      </Route>
    </Switch>
  )
}

export default Routes
