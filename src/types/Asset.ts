export interface Asset {
  relayId: string
  animationUrl: string
  backgroundColor: string
  collection: Collection
  description: string
  name: string
  tokenId: string
  imageUrl: string
  isDelisted: boolean
  id: string
}

export interface Collection {
  description: string
  displayData: DisplayData
  imageUrl: string
  hidden: boolean
  name: string
  slug: string
  id: string
  relayId: string
}

export interface DisplayData {
  cardDisplayStyle: string
}
