import React from 'react'
import clsx from 'clsx'
import styles from './SlideBar.module.css'
import { Collapse } from 'antd'
import art from '../../image/art.png'
import domin from '../../image/domin.png'
import virtual from '../../image/virtual.png'
import trading from '../../image/trading.png'
import collectible from '../../image/collectible.png'
import sport from '../../image/sports.png'
import utility from '../../image/utility.png'

export const SlideBar = () => {
  const { Panel } = Collapse
  return (
    <div className={clsx(styles.slideBar)}>
      <Collapse defaultActiveKey={['1']} accordion>
        <Panel header="category" key="1">
          <div className={clsx(styles.category)}>
            <div className={clsx(styles.categoryItem)}>
              <img src={art} />
              <span>Art</span>
            </div>
            <div className={clsx(styles.categoryItem)}>
              <img src={domin} />
              <span>Domin Names</span>
            </div>
            <div className={clsx(styles.categoryItem)}>
              <img src={virtual} />
              <span>Virtual Worlds</span>
            </div>
            <div className={clsx(styles.categoryItem)}>
              <img src={trading} />
              <span>Trading Cards</span>
            </div>
            <div className={clsx(styles.categoryItem)}>
              <img src={collectible} />
              <span>Collectibles</span>
            </div>
            <div className={clsx(styles.categoryItem)}>
              <img src={sport} />
              <span>Sports</span>
            </div>
            <div className={clsx(styles.categoryItem)}>
              <img src={utility} />
              <span>Utility</span>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default SlideBar
