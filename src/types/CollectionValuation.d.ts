
export type CollectionExternalLink = {
  name: string
  url: string
  iconUrl: string
}

export type CollectionValuationChartData = {
  heatTrend?: any
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
  name: string
  externalLinks: CollectionExternalLink[]
  description: string
  statistic: CollectionValuationStatisticItem[]
  chartData: CollectionValuationChartData
  valuations: CollectionValuationByTypeAndAttribute[]
  tokens: CollectionToken[]
}
