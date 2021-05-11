import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'
import clsx from 'clsx'
import { Input, Space } from 'antd'
import { UserOutlined, WalletOutlined } from '@ant-design/icons'

export const Header = () => {
  const { Search } = Input
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.headerTop)}>
        <Space direction="vertical">
          <Search style={{ width: 500, marginLeft: 230 }} />
        </Space>
        <UserOutlined style={{ fontSize: '25px', color: '#fff', position: 'absolute', right: 100 }} />
        <WalletOutlined style={{ fontSize: '25px', color: '#fff', position: 'absolute', right: 50 }} />
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
