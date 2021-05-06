import React from 'react'
import { useQueryOpenseaBundles } from './bundlesPageData'
import './BaseCardPage.css'
import { BundleCard } from '../_common/BaseCardBundle/BundleCard'
import ModalBundleItem from '../_common/ModalBundleItem/ModalBundleItem'
import { useLocation } from 'react-router-dom'

export const BundlesPage = () => {
  const category = new URLSearchParams(useLocation().search).get('category') ?? undefined
  const bundleSlug = new URLSearchParams(useLocation().search).get('slug') ?? undefined

  const { loading, bundles } = useQueryOpenseaBundles(category)

  const bundleSelected = bundleSlug ? bundles?.find((bundle) => bundle.slug === bundleSlug) || null : null

  if (loading) return <p>Loading bundles...</p>

  return (
    <div className="BaseCardPage">
      <div>
        {bundles?.map((bundle, index) => {
          return (
            <div key={index}>
              <BundleCard bundle={bundle} />
            </div>
          )
        })}
      </div>

      {bundleSelected && <ModalBundleItem bundle={bundleSelected} />}
    </div>
  )
}

export default BundlesPage
