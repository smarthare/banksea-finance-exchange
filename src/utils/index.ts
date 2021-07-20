import { useLocation } from 'react-router-dom'
import { NFTCreateForm } from '../pages/Home/NFTCreate'
import { NFTMetadata } from '../types/NFTMetadata'
import { getUriByIpfsHash } from './ipfs'

export const useLocationQuery = (key: string): string | undefined => {
  return new URLSearchParams(useLocation().search).get(key) ?? undefined
}

export const thumbnailAddress = (address?: string) => {
  return  address ? `${address.substring(0, 6)}...${address.slice(-4)}`: '-'
}

export function generateNftMetadata(form: NFTCreateForm): NFTMetadata {
  /*const attributes: NFTMetadataAttribute[] = Object.keys(values).map(key => ({
    key,
    value: values[key]
  }))*/
  const { artworkName, briefIntroduction, assetIpfsHash } = form

  return {
    name: artworkName,
    description: briefIntroduction,
    image: getUriByIpfsHash(assetIpfsHash)
    // attributes
  }
}
