import { CollectionValuationDetail } from '../hooks/queries/insight/collection/useCollectionValuationDetailQuery'
import { CollectionValuationAttribute } from '../hooks/queries/insight/collection/useCollectionValuationAttributeQuery'

export type CollectionExternalLink = {
  name: string
  url: string
  iconUrl: string
}

export type CollectionValuationChartData = {
  heatComposition?: any
  priceScatter?: any
  totalMarketValue?: any
  tradeFlow?: any
}

export type CollectionValuationByTypeAndAttribute = {
  prevailingTrend: number
  accessory: string
  number: number
  valuation: string
  average: string
}

export type CollectionValuationStatisticItem = { key: string, value: string }

export type CollectionToken = {
  index: number
  owner: string
  imageUrl: string
  tokenId: number
}

export type CollectionValuationData = {
  detail?: CollectionValuationDetail
  collectionValuationTableData: CollectionValuationAttribute[]
}
