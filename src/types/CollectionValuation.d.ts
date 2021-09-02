
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
  bannerImageUrl: string
  externalLinks: CollectionExternalLink[]
  description: string
  statistic: CollectionValuationStatisticItem[]
  chartData: CollectionValuationChartData
  valuations: CollectionValuationByTypeAndAttribute[]
  tokens: CollectionToken[]
}

export interface CollectionInfo {
  id: string
  seriesName: string
  seriesLogo: string
  seriesSlug: string
  seriesPoster: string
  createdTime: string
  seriesDescription: string
  seriesWebsite?: any
  seriesLink?: string
  seriesDiscord?: string
  seriesTwitter?: any
  totalSupply: string
  marketCap: number
  numOwners: string
  totalVolume: number

  // mocked
  added: string
}
