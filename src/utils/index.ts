import { NFTCreateForm } from '../pages/Home/NFTCreate'
import { NFTMetadata } from '../types/NFTMetadata'
import { getUriByIpfsHash } from './ipfs'
import BigNumber from 'bignumber.js'

export const thumbnailAddress = (address?: string) => {
  return address ? `${address.substring(0, 6)}...${address.slice(-4)}` : '-'
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

export function numberWithCommas(x?: string | number | BigNumber, decimalPlace = 2): string {
  if (!x?.toString().length) {
    return numberWithCommas('0')
  }

  const trimTrailingZero = (x: string): string => {
    if (x.length <= decimalPlace) {
      return x.padEnd(decimalPlace, '0')
    }

    return x[x.length - 1] !== '0' ? x : trimTrailingZero(x.substring(0, length - 1))
  }

  const parts: string[] = new BigNumber(x).toFixed(decimalPlace).split('.')

  parts[0] = (parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')) ?? '0'

  if (!parts[1]) {
    parts[1] = '0'.repeat(decimalPlace)
  } else {
    parts[1] = trimTrailingZero(parts[1])
  }

  if (!decimalPlace) {
    return parts[0]
  }
  return parts.join('.')
}

export function simplifyNumber(x?: string | number | BigNumber, decimalPlace = 2): string {
  if (!x?.toString().length) {
    return '0'
  }

  const num = new BigNumber(x.toString())

  const kilo = new BigNumber('1000')
  const million = new BigNumber('1000000')
  const billion = new BigNumber('1000000000')

  if (num.gte(billion)) {
    return num.div(billion).toFixed(decimalPlace) + 'B'
  } else if (num.gte(million)) {
    return num.div(million).toFixed(decimalPlace) + 'M'
  } else if (num.gte(kilo)) {
    return num.div(kilo).toFixed(decimalPlace) + 'K'
  } else {
    return num.toFixed(decimalPlace)
  }
}


export function formatTime(time: Date) {
  const now = Date.now()

  const diff = (now - time.getTime()) / 1000

  const onMinute = 60
  const onHour = onMinute * 60
  const onDay = onHour * 24
  const oneMonth = onDay * 30
  const oneYear = onDay * 365

  if (diff < 30) {
    return 'Just Now'
  } else if (diff < onHour) {
    return [Math.ceil(diff / onMinute), ' minute', diff / onMinute > 1 ? 's': '', ' ago']
  } else if (diff < onDay) {
    return [Math.ceil(diff / onHour), ' hour', diff / onHour > 1 ? 's': '', ' ago']
  } else if (diff < oneMonth) {
    return [Math.ceil(diff / onDay), ' day', diff / onDay > 1 ? 's': '', ' ago']
  } else if (diff < oneYear) {
    return [Math.ceil(diff / oneMonth), ' month', diff / oneMonth > 1 ? 's': '', ' ago']
  } else {
    return [Math.ceil(diff / oneYear), ' year', diff / oneYear > 1 ? 's': '', ' ago']
  }
}
