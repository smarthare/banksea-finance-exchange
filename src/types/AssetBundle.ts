import { Edge } from './OpenseaGraphQLApiResponse'

export interface AssetBundle {
  relayId: string
  id: string
  slug: string
  assetCount: number
  assetQuantities: AssetQuantities
  name: string
  assetEventData: AssetEventData
  orderData: OrderData
}

export interface AssetQuantities {
  edges: Edge[]
}

export interface AssetEventData {
  lastSale: any
}

export interface OrderData {
  bestBid: any
  bestAsk: BestAsk
}

export interface BestAsk {
  closedAt: any
  orderType: string
  dutchAuctionFinalPrice: any
  openedAt: string
  priceFnEndedAt: any
  quantity: string
  decimals: string
  paymentAssetQuantity: PaymentAssetQuantity
}

export interface PaymentAssetQuantity {
  quantity: string
  asset: Asset
  id: string
}

export interface Asset {
  decimals: number
  imageUrl: string
  symbol: string
  usdSpotPrice: number
  assetContract: AssetContract
  id: string
}

export interface AssetContract {
  blockExplorerLink: string
  id: string
}
