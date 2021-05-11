import React from 'react'
import clsx from 'clsx'
import styles from './SlideBar.module.css'
import { Collapse, Radio, RadioChangeEvent } from 'antd'
import { StarOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useCurrentPlatform, useLocationQuery } from '../../utils'
import { CATEGORIES, PLATFORMS } from '../../constants'
import logo from '../../image/logo.png'
import './collapse.css'

export const SideBar = () => {
  const { Panel } = Collapse

  const history = useHistory()
  const location = useLocation()
  const currentCategory = useLocationQuery('category')
  const { platform } = useCurrentPlatform()

  const handlePlatformChange = (e: RadioChangeEvent) => {
    const params = new URLSearchParams(location.search)
    params.set('platform', e.target.value)

    // copy object
    const newLocation = { ...location }
    newLocation.search = params.toString()
    history.push(newLocation)
  }

  return (
    <div className={clsx(styles.slideBar)}>
      <Link to={{ pathname: '/' }}>
        <div className={clsx(styles.slideBarLogo)}>
          <img className={clsx(styles.logo)} src={logo} />
          <h4 className={clsx(styles.headerTitle)}>Banksy</h4>
        </div>
      </Link>
      <Collapse
        defaultActiveKey={['categories', 'platforms']}
        expandIcon={({ isActive }) => (
          <DeploymentUnitOutlined style={{ fontSize: '20px', color: '#fff' }} rotate={isActive ? 90 : 0} />
        )}
      >
        {/*<Panel header="Categories" key="categories">
          <div className={clsx(styles.category)}>
            {CATEGORIES.map(category => (
              <Link
                key={category.key}
                to={{
                  pathname: '/bundles',
                  search: `?category=${category.key}`
                }}
              >
                <div
                  key={category.key}
                  className={clsx(styles.categoryItem)}
                  style={{
                    background: currentCategory == category.key ? '#dfe6e9' : ''
                  }}
                >
                  <img src={category.img} alt="" />
                  <span>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </Panel>*/}
        <Panel header="Platforms" key="platforms">
          <div className={styles.platforms}>
            <Radio.Group defaultValue={platform} onChange={handlePlatformChange}>
              {PLATFORMS.map(platform => (
                <Radio.Button value={platform.name} className={styles.platformsItem}>
                  {platform.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <StarOutlined style={{ fontSize: '20px', color: '#fff' }} rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Status" key="Status">
          <div className={styles.status}>
            <div className={styles.statusItem}>For Sale</div>
            <div className={styles.statusItem}>On Auction</div>
            <div className={styles.statusItem}>Borrowing</div>
            <div className={styles.statusItem}>Fragmentation</div>
            <div className={styles.statusItem}>Mining</div>
            <div className={styles.statusItem}>New</div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default SideBar
