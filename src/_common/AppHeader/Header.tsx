import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'
import clsx from 'clsx'

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.headerTop)}>
        <Link to={{ pathname: '/' }}>
          <h4 className={clsx(styles.headerTitle)}>Banksy</h4>
        </Link>
      </div>
      <div className={clsx(styles.features)}>
        <div className={clsx(styles.featuresItem)}>
          <span>Sell</span>
          <span>Auction</span>
          <span>splitting</span>
          <span>lend</span>
          <span>Mortgage</span>
          <span>LP mining</span>
        </div>
      </div>
    </header>
  )
}

export default Header
