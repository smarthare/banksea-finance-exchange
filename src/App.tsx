import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppFooter from './_common/AppFooter/AppFooter'
import Header from './_common/AppHeader/Header'
import './app.css'
import SideBar from './_common/AppNavbar/SideBar'
import Routes from './routes'

export const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <SideBar />
        <div className="app">
          <Routes />
        </div>
        <AppFooter />
      </div>
    </Router>
  )
}

export default App
