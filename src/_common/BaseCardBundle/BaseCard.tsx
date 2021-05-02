import clsx from 'clsx'
import React from 'react'
import { OpenSeaAssetBundle } from 'opensea-js/lib/types'
import styles from './BaseCard.module.css'

import { Link } from 'react-router-dom'
import BaseCardBundleThumbnails from './BaseCardBundleThumbnails'

export interface BaseCardBundleProps {
  data: OpenSeaAssetBundle
}

export const BaseCard: React.FC<BaseCardBundleProps> = ({ data }) => {
  const { name, description, assets, slug } = data
  const firstAsset = assets[0]
  const { owner } = firstAsset
  const address1 = owner.address.substring(0, 5)
  const addressLength = owner.address.length
  const address2 = owner.address.substring(addressLength - 5, addressLength)
  const address = address1 + '...' + address2

  return (
    <div className={clsx(styles.BaseCardBundle)} role="listitem">
      {/* Content */}
      <div className="flex-1 flex-col lg:flex-row">
        {/* Thumbnails */}
        <Link
          to={{
            pathname: `/bundles/${slug}`,
          }}
        >
          <BaseCardBundleThumbnails assets={assets} />
        </Link>
        {/* Body */}
        <div className="flex-auto">
          <div className="flex flex-wrap">
            <h3 className={clsx(styles.Name, 'mb-4 h-14 flex-auto break-all')}>{name}</h3>
          </div>
          <p
            className={clsx(
              styles.Description,
              'text-sm text-gray-500 break-all overflow-ellipsis',
            )}
          >
            {description}
          </p>
        </div>
      </div>
      {/* Footer */}
      <div className={clsx(styles.assetsContent)}>
        <div className={clsx(styles.assets)}>
          <span>Assets:</span>
          <span>{assets.length}</span>
        </div>
        <div className={clsx(styles.owner)}>
          <span>Owner:</span>
          <span>{address}</span>
        </div>
      </div>
    </div>
  )
}
