import React from 'react'
import { useParams } from 'react-router-dom'
import { useBundlesPageData } from './bundlesPageData'

import { BaseCard } from '../_common/BaseCardBundle/BaseCard'
import { ModalBundleItem } from '../_common/ModalBundleItem/ModalBundleItem'
import './BaseCardPage.css'

interface IRouteParams {
  bundleSlug: string
}

export const BundlesPage = () => {
  const { bundleSlug } = useParams<IRouteParams>()
  const { loading, error, data } = useBundlesPageData()

  if (loading) return <p>Loading bundles...</p>
  if (error) return <p role="alert">Error :( ({error.message})</p>

  const { bundles } = data
  const bundleSelected = bundleSlug
    ? bundles.find((bundle) => bundle.slug === bundleSlug) || null
    : null

  return (
    <div className="BaseCardPage">
      <div>
        {data.bundles.map((bundle, index) => {
          return (
            <div key={index}>
              <BaseCard data={bundle} />
            </div>
          )
        })}
      </div>

      {bundleSelected && <ModalBundleItem bundle={bundleSelected} />}
    </div>
  )
}

export default BundlesPage
