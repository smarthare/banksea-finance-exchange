import BigNumber from 'bignumber.js'

export type NFTValuationUnit = 'ETH' | 'BTC'

export type NFTValuationProperties = {
  key: string
  value: string
}

export type NFTValuationMarketData = {
  askingPrice: string
  askingPriceInUsd: string
  askingPriceOverValuation: string
  askingPriceOverValuationInUsd: string
  askingPriceOverValuationRate: string

  lastSale: string
  lastSaleInUsd: string
  lastSaleTime: string

  bids: string
  bidsInUsd: string
  bidsOverValuation: string
  bidsOverValuationInUsd: string
  bidsOverValuationRate: string
}

export type NFTValuationChangeData = {
  type: string
  fromYesterdayPercent: BigNumber
  last7DaysPercent: BigNumber
  last30DaysPercent: BigNumber
}

export type NFTTransactionHistory = {
  type: 'Bid' | 'Withdraw Bid'
  fromAddr: string
  toAddr: string
  value: string
  valueUnit: string
  valueInUsd: string
  date: string
}

export type NFTValuationHistory = {
  data: any
  analyze: {
    priceVolatilityPercent: string
    heatRank: number
    turnoverRatePercent: string
  }
}

export type NFTValuationData = {
  // name: string
  tokenId: number
  imageUrl: string
  valuation: string
  unit: NFTValuationUnit
  valuationInUSD: string
  properties: NFTValuationProperties[]
  marketData: NFTValuationMarketData
  changesData: NFTValuationChangeData[]
  valuationHistory: NFTValuationHistory
  transactionHistories: NFTTransactionHistory[]
}
