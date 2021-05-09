import React from 'react'
import clsx from 'clsx'
import styles from './SlideBar.module.css'
import { Collapse } from 'antd'
import art from '../../image/art.png'
import domain from '../../image/domin.png'
import virtual from '../../image/virtual.png'
import trading from '../../image/trading.png'
import collectible from '../../image/collectible.png'
import sport from '../../image/sports.png'
import utility from '../../image/utility.png'
import { PieChartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  const { Panel } = Collapse

  const categories = [
    {
      name: 'Art',
      img: art,
      key: 'art'
    },
    {
      name: 'Domain Names',
      img: domain,
      key: 'domain-names'
    },
    {
      name: 'Virtual Worlds',
      img: virtual,
      key: 'virtual-worlds'
    },
    {
      name: 'Trading Cards',
      img: trading,
      key: 'trading-cards'
    },
    {
      name: 'Collectibles',
      img: collectible,
      key: 'collectibles'
    },
    {
      name: 'Sports',
      img: sport,
      key: 'sports'
    },
    {
      name: 'Utility',
      img: utility,
      key: 'utility'
    }
  ]

  return (
    <div className={clsx(styles.slideBar)}>
      <Collapse
        defaultActiveKey={['1']}
        accordion
        expandIcon={({ isActive }) => <PieChartFilled rotate={isActive ? 90 : 0} />}
      >
        <Panel header="category" key="1">
          <div className={clsx(styles.category)}>
            {/* <div className={clsx(styles.categoryItem)}>
              <img src={utility} alt="" />
              <span>Utility</span>
            </div>*/}
            {categories.map((category) => (
              <Link
                key={category.key}
                to={{
                  pathname: '/bundles',
                  search: `?category=${category.key}`
                }}
              >
                <div key={category.key} className={clsx(styles.categoryItem)}>
                  <img src={category.img} alt="" />
                  <span>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default SideBar
