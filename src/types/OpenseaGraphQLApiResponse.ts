import { Asset } from './Asset'
import { AssetBundle } from './AssetBundle'

export interface OpenseaGraphQLApiResponse {
  data: Data
}

export interface Data {
  query: Query
}

export interface Query {
  collection: any
  selectedCollections: SelectedCollections
  collections: Collections
  paymentAssets: PaymentAssets
  PaymentFilter_collection: any
  categories: any[]
  search: Search
}

export interface SelectedCollections {
  edges: any[]
}

export interface Collections {}

export interface PaymentAssets {}

export interface Search {
  edges: Edge[]
  totalCount: number
  pageInfo: PageInfo
}

export interface Edge {
  node: Node
  cursor: string
}

export interface Node {
  asset: Asset
  assetBundle: AssetBundle
  __typename: string
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
}
