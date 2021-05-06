import clsx from 'clsx'
import React from 'react'
import styles from './BaseCard.module.css'

import BaseCardBundleMedia from './BaseCardBundleMedia'
import { Asset } from '../../types/Asset'

export interface BaseCardBundleThumbnailsProps {
  assets: Asset[]
}

export const BaseCardBundleThumbnails: React.FC<BaseCardBundleThumbnailsProps> = ({ assets }) => {
  const firstAsset = assets[0]
  const secondAsset = assets[1] || undefined
  const numAssetsMore = Math.max(assets.length - 1, 0)

  return (
    <div className={clsx(styles.ThumbnailsContainer)}>
      <div
        className={clsx(
          styles.ThumbnailPrimary,
          `
        h-40 md:h-32 lg:w-40 xl:w-48
        bg-white shadow-md overflow-hidden rounded relative z-20
      `
        )}
      >
        <BaseCardBundleMedia src={firstAsset.imageUrl} className={styles.ThumbnailImg} />
      </div>
      <div
        className={clsx(
          styles.ThumbnailSecondary,
          `
        lg:w-40 xl:w-48 h-32
        bg-white shadow-md overflow-hidden rounded absolute top-0 z-0`
        )}
      >
        {numAssetsMore && (
          <>
            <div
              className="
                absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2
                p-10
                rounded-full
              bg-gray-900 text-white
                whitespace-nowrap
                opacity-80
                z-10
              "
            />
            <span className="absolute right-2 bottom-2 text-xs z-20 font-semibold">+{numAssetsMore}</span>
          </>
        )}
        <BaseCardBundleMedia src={secondAsset.imageUrl} className={styles.ThumbnailImg} />
      </div>
    </div>
  )
}

export default BaseCardBundleThumbnails
