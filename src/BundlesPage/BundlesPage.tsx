import React from 'react'
import { useQueryOpenseaBundles } from './bundlesPageData'
import './BaseCardPage.css'
import { OpenseaBundleCard } from '../_common/BaseCardBundle/OpenseaBundleCard'
import { useLocation } from 'react-router-dom'
import { useCurrentPlatform } from '../utils'
import { USE_ALL_NFTS } from '../assets/SolibleNfts'
import { SolibleAssetCard } from '../_common/BaseCardBundle/SolibleAssetCard'

const SolibleBundles: React.FC = () => {
  // const marketAddress = new URLSearchParams(useLocation().search).get('marketAddress') ?? undefined

  // const assetSelected = marketAddress
  //   ? assets?.find(asset => asset.marketAddress.toString() === marketAddress) || null
  //   : null

  return (
    <div className="BaseCardPage">
      <div>
        {USE_ALL_NFTS?.map((asset, index) => {
          return (
            <div key={index}>
              <SolibleAssetCard asset={asset} />
            </div>
          )
        })}
      </div>

      {/*{assetSelected && <ModalBundleItem bundle={assetSelected} />}*/}
    </div>
  )
}

const OpenseaBundles: React.FC = () => {
  const category = new URLSearchParams(useLocation().search).get('category') ?? undefined

  const { loading, bundles } = useQueryOpenseaBundles(category)

  // const bundleSlug = new URLSearchParams(useLocation().search).get('slug') ?? undefined

  // const bundleSelected = bundleSlug ? bundles?.find(bundle => bundle.slug === bundleSlug) || null : null

  if (loading) return <p>Loading bundles...</p>

  return (
    <div className="BaseCardPage">
      <div>
        {bundles?.map((bundle, index) => {
          return (
            <div key={index}>
              <OpenseaBundleCard bundle={bundle} />
            </div>
          )
        })}
      </div>

      {/*{bundleSelected && <ModalBundleItem bundle={bundleSelected} />}*/}
    </div>
  )
}

export const BundlesPage: React.FC = () => {
  const { platform } = useCurrentPlatform()
  console.log(platform)

  return (
    <>
      {platform === 'Opensea' && <OpenseaBundles />}
      {platform === 'Solible' && <SolibleBundles />}
    </>
  )
}

export default BundlesPage
