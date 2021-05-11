import clsx from 'clsx'
import React from 'react'
import styles from './BaseCard.module.css'

import { Link, useLocation } from 'react-router-dom'
import BaseCardBundleThumbnails from './BaseCardBundleThumbnails'
import { OpenSeaAssetBundle } from 'opensea-js/lib/types'

export interface BundleCardProps {
  bundle: OpenSeaAssetBundle
  // bundle: AssetBundle
}

export const OpenseaBundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const oldSearch = useLocation().search

  // const { name, assetQuantities, slug, orderData } = bundle
  const { name, slug, assets, description } = bundle

  // const assets = assetQuantities.edges.map(edge => edge.node.asset)
  // const description = assets[0].description
  // const price = weiToString(orderData.bestAsk?.paymentAssetQuantity.quantity ?? undefined)

  return (
    <div className={clsx(styles.BaseCardBundle)} role="listitem">
      {/* Content */}
      <Link to={{ pathname: `/bundle/${slug}` }}>
        <div className="flex-1 flex-col lg:flex-row">
          {/* Thumbnails */}
          <Link to={{ pathname: `/bundles`, search: `${oldSearch}&slug=${slug}` }}>
            <BaseCardBundleThumbnails assets={assets} />
          </Link>
          {/* Body */}
          <div className="flex-auto">
            <div className="flex flex-wrap">
              <h3 className={clsx(styles.Name, 'mb-4 h-14 flex-auto break-all')}>{name}</h3>
            </div>
            <p className={clsx(styles.Description, 'text-sm text-gray-500 break-all overflow-ellipsis')}>
              {description}
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className={clsx(styles.assetsContent)}>
          <div className={clsx(styles.assets)}>
            <span>Assets:</span>
            {/*<span>{assets.length}</span>*/}
          </div>
          <div className={clsx(styles.owner)}>
            <span>Owner:</span>
            {/*<a href={`https://etherscan.io/address/${address}`}>{addressThumbnail}</a>*/}
          </div>
          <div className={clsx(styles.price)}>
            <span>Price:</span>
            {/*<span>{`Ξ  ${price}`}</span>*/}
          </div>
        </div>
      </Link>
    </div>
  )
}
