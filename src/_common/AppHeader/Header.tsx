import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to={{ pathname: '/' }}>
          <h1 className="headerTitle">Banksy</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
