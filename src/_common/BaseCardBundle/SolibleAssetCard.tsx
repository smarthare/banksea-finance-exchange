import clsx from 'clsx'
import React from 'react'
import styles from './BaseCard.module.css'

import { Link } from 'react-router-dom'
import { SolibleNFT } from '../../assets/SolibleNfts'

type SolibleAssetCardProps = {
  asset: SolibleNFT
}

export const SolibleAssetCard: React.FC<SolibleAssetCardProps> = ({ asset }) => {
  const { marketAddress, img, name } = asset
  // const { name, assetQuantities, slug, orderData } = bundle

  // const assets = assetQuantities.edges.map(edge => edge.node.asset)
  // const description = assets[0].description
  // const price = weiToString(orderData.bestAsk?.paymentAssetQuantity.quantity ?? undefined)

  // @ts-ignore
  return (
    <div className={clsx(styles.BaseCardBundle)} role="listitem">
      {/* Content */}
      <div className="flex-1 flex-col lg:flex-row">
        {/* Thumbnails */}
        <Link
          to={location => {
            const newSearch = new URLSearchParams(location.search)
            newSearch.set('marketAddress', marketAddress.toString())
            return { pathname: '/bundles', search: newSearch.toString() }
          }}
        >
          {/* @ts-ignore */}
          <img src={img.default} alt="" style={{ height: 240, margin: '0 auto' }} />
          {/*<BaseCardBundleThumbnails assets={assets} />*/}
        </Link>
        {/* Body */}
        <div className="flex-auto">
          <div className="flex flex-wrap">
            {/*<Link to={{ pathname: `/bundle/${slug}` }}>*/}
            <h3 className={clsx(styles.Name, 'mb-4 h-14 flex-auto break-all')}>{name}</h3>
            {/*</Link>*/}
          </div>
          {/*<p className={clsx(styles.Description, 'text-sm text-gray-500 break-all overflow-ellipsis')}>{description}</p>*/}
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
    </div>
  )
}
