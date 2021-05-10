import React from 'react'

import { Link, useLocation } from 'react-router-dom'
import { AssetBundle } from '../../types/AssetBundle'
import { Asset } from '../../types/Asset'

export interface ModalBundleItemProps {
  bundle: AssetBundle
}

export const ModalBundleItem: React.FC<ModalBundleItemProps> = ({ bundle }) => {
  const location = useLocation()

  const search = new URLSearchParams(location.search)
  search.delete('slug')

  const { name } = bundle
  const assets: Asset[] = bundle.assetQuantities.edges.map(edge => edge.node.asset)
  const description = assets[0].description

  return (
    <div
      className="
       bg-black bg-opacity-70
        fixed w-full h-full top-0 left-0 z-50 p-10 md:p-32
        flex flex-col justify-start
        backdrop-filter backdrop-blur-md
      "
    >
      <div className="container mx-auto p-8 bg-white shadow-xl rounded relative z-10 text-gray-700">
        <h1 className="text-3xl mb-10">{name}</h1>

        <p className="mb-10">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" role="list">
          {assets.map(asset => {
            return (
              <a target="_blank" key={asset.tokenId} rel="noreferrer" href={`/bundle/${bundle.slug}`}>
                <div
                  className="
                  bg-white
                    rounded w-full
                    shadow
                    overflow-x-hidden
                    p-2
                    transform
                    scale-100
                    grayscale
                    hover:grayscale-0
                    hover:scale-110
                    transition-all
                  "
                >
                  <img src={asset.imageUrl} alt={asset.name} className="object-cover h-48 w-full" />
                </div>
              </a>
            )
          })}
        </div>
      </div>
      <Link
        to={{
          pathname: `/`,
          search: search.toString()
        }}
        className="cursor-default"
      >
        <div className="absolute top-0 left-0 w-full z-0 h-full" />
      </Link>
    </div>
  )
}

export default ModalBundleItem
