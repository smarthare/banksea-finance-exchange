import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'
import { OpenseaGraphQLApiResponse } from '../types/OpenseaGraphQLApiResponse'
import { AssetBundle } from '../types/AssetBundle'

export type AssetSearchQueryVariables = {
  categories?: string[]
  chains?: unknown
  collection?: unknown
  collectionQuery?: unknown
  collectionSortBy?: string
  collections?: []
  count?: number
  cursor?: unknown
  identity?: unknown
  includeHiddenCollections?: boolean
  includeIsListable?: boolean
  numericTraits?: unknown
  paymentAssets?: unknown
  priceFilter?: unknown
  query?: string
  resultModel?: unknown
  shouldShowQuantity?: boolean
  sortAscending?: unknown
  sortBy?: unknown
  stringTraits?: unknown
  toggles?: unknown
}

export const useQueryOpenseaBundles = (category?: string) => {
  const defaultVariables: AssetSearchQueryVariables = {
    categories: [],
    chains: null,
    collection: null,
    collectionQuery: null,
    collectionSortBy: 'SEVEN_DAY_VOLUME',
    collections: [],
    count: 32,
    cursor: null,
    identity: null,
    includeHiddenCollections: true,
    includeIsListable: false,
    numericTraits: null,
    paymentAssets: null,
    priceFilter: null,
    query: '',
    resultModel: 'BUNDLES',
    shouldShowQuantity: false,
    sortAscending: null,
    sortBy: null,
    stringTraits: null,
    toggles: null
  }

  const [bundles, setBundles] = useState<AssetBundle[]>()
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(async () => {
    setLoading(true)

    const query = {
      id: 'AssetSearchQuery',
      query: `query AssetSearchQuery(
  $categories: [CollectionSlug!]
  $chains: [ChainScalar!]
  $collection: CollectionSlug
  $collectionQuery: String
  $collectionSortBy: CollectionSort
  $collections: [CollectionSlug!]
  $count: Int
  $cursor: String
  $identity: IdentityInputType
  $includeHiddenCollections: Boolean
  $includeIsListable: Boolean = false
  $numericTraits: [TraitRangeType!]
  $paymentAssets: [PaymentAssetSymbol!]
  $priceFilter: PriceFilterType
  $query: String
  $resultModel: SearchResultModel
  $shouldShowQuantity: Boolean = false
  $sortAscending: Boolean
  $sortBy: SearchSortBy
  $stringTraits: [TraitInputType!]
  $toggles: [SearchToggle!]
) {
  query {
    ...AssetSearch_data_1tAP2Z
  }
}

fragment AssetCardContent_assetBundle on AssetBundleType {
  assetQuantities(first: 18) {
    edges {
      node {
        asset {
          relayId
          ...AssetMedia_asset
          id
        }
        id
      }
    }
  }
}

fragment AssetCardContent_asset_1kiIrM on AssetType {
  ...AssetMedia_asset
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    openseaVersion
    id
  }
  tokenId
  collection {
    slug
    id
  }
  isDelisted
}

fragment AssetCardFooter_assetBundle on AssetBundleType {
  name
  assetQuantities(first: 18) {
    edges {
      node {
        asset {
          collection {
            name
            relayId
            id
          }
          id
        }
        id
      }
    }
  }
  assetEventData {
    lastSale {
      unitPriceQuantity {
        ...AssetQuantity_data
        id
      }
    }
  }
  orderData {
    bestBid {
      orderType
      paymentAssetQuantity {
        ...AssetQuantity_data
        id
      }
    }
    bestAsk {
      closedAt
      orderType
      dutchAuctionFinalPrice
      openedAt
      priceFnEndedAt
      quantity
      decimals
      paymentAssetQuantity {
        quantity
        ...AssetQuantity_data
        id
      }
    }
  }
}

fragment AssetCardFooter_asset_fdERL on AssetType {
  ownedQuantity(identity: $identity) @include(if: $shouldShowQuantity)
  name
  tokenId
  collection {
    name
    id
  }
  hasUnlockableContent
  isDelisted
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    openseaVersion
    id
  }
  assetEventData {
    firstTransfer {
      timestamp
    }
    lastSale {
      unitPriceQuantity {
        ...AssetQuantity_data
        id
      }
    }
  }
  decimals
  orderData {
    bestBid {
      orderType
      paymentAssetQuantity {
        ...AssetQuantity_data
        id
      }
    }
    bestAsk {
      closedAt
      orderType
      dutchAuctionFinalPrice
      openedAt
      priceFnEndedAt
      quantity
      decimals
      paymentAssetQuantity {
        quantity
        ...AssetQuantity_data
        id
      }
    }
  }
}

fragment AssetCardHeader_data on AssetType {
  relayId
  favoritesCount
  isDelisted
  isFavorite
}

fragment AssetMedia_asset on AssetType {
  animationUrl
  backgroundColor
  collection {
    description
    displayData {
      cardDisplayStyle
    }
    imageUrl
    hidden
    name
    slug
    id
  }
  description
  name
  tokenId
  imageUrl
  isDelisted
}

fragment AssetQuantity_data on AssetQuantityType {
  asset {
    ...Price_data
    id
  }
  quantity
}

fragment AssetSearchFilter_data_3zwQJ6 on Query {
  ...CollectionFilter_data_1W5IQW
  collection(collection: $collection) {
    numericTraits {
      key
      value {
        max
        min
      }
      ...NumericTraitFilter_data
    }
    stringTraits {
      key
      ...StringTraitFilter_data
    }
    id
  }
  ...PaymentFilter_data_2YoIWt
}

fragment AssetSearchList_data_3ZVFPC on SearchResultType {
  asset {
    assetContract {
      account {
        address
        chain {
          identifier
          id
        }
        id
      }
      id
    }
    isListable @include(if: $includeIsListable)
    relayId
    tokenId
    ...AssetSelectionItem_data
    ...asset_url
    id
  }
  assetBundle {
    relayId
    id
  }
  ...Asset_data_28Onen
}

fragment AssetSearch_data_1tAP2Z on Query {
  ...CollectionHeadMetadata_data_2YoIWt
  ...AssetSearchFilter_data_3zwQJ6
  ...CategoryBar_data
  ...SearchPills_data_2Kg4Sq
  search(after: $cursor, chains: $chains, categories: $categories, collections: $collections, first: $count, identity: $identity, numericTraits: $numericTraits, paymentAssets: $paymentAssets, priceFilter: $priceFilter, querystring: $query, resultType: $resultModel, sortAscending: $sortAscending, sortBy: $sortBy, stringTraits: $stringTraits, toggles: $toggles) {
    edges {
      node {
        ...AssetSearchList_data_3ZVFPC
        __typename
      }
      cursor
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment AssetSelectionItem_data on AssetType {
  backgroundColor
  collection {
    displayData {
      cardDisplayStyle
    }
    imageUrl
    id
  }
  imageUrl
  name
  relayId
}

fragment Asset_data_28Onen on SearchResultType {
  asset {
    assetContract {
      account {
        chain {
          identifier
          id
        }
        id
      }
      id
    }
    isDelisted
    ...AssetCardHeader_data
    ...AssetCardContent_asset_1kiIrM
    ...AssetCardFooter_asset_fdERL
    ...AssetMedia_asset
    ...asset_url
    id
  }
  assetBundle {
    slug
    assetCount
    ...AssetCardContent_assetBundle
    ...AssetCardFooter_assetBundle
    id
  }
}

fragment CategoryBar_data on Query {
  categories {
    imageUrl
    name
    slug
  }
}

fragment CollectionFilter_data_1W5IQW on Query {
  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
    edges {
      node {
        assetCount
        imageUrl
        name
        slug
        id
      }
    }
  }
  collections(assetOwner: $identity, chains: $chains, first: 100, includeHidden: $includeHiddenCollections, parents: $categories, query: $collectionQuery, sortBy: $collectionSortBy) {
    edges {
      node {
        assetCount
        imageUrl
        name
        slug
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment CollectionHeadMetadata_data_2YoIWt on Query {
  collection(collection: $collection) {
    bannerImageUrl
    description
    imageUrl
    name
    id
  }
}

fragment CollectionModalContent_data on CollectionType {
  description
  imageUrl
  name
  slug
}

fragment NumericTraitFilter_data on NumericTraitTypePair {
  key
  value {
    max
    min
  }
}

fragment PaymentFilter_data_2YoIWt on Query {
  paymentAssets(first: 10) {
    edges {
      node {
        asset {
          symbol
          id
        }
        relayId
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  PaymentFilter_collection: collection(collection: $collection) {
    paymentAssets {
      asset {
        symbol
        id
      }
      relayId
      id
    }
    id
  }
}

fragment Price_data on AssetType {
  decimals
  imageUrl
  symbol
  usdSpotPrice
  assetContract {
    blockExplorerLink
    id
  }
}

fragment SearchPills_data_2Kg4Sq on Query {
  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
    edges {
      node {
        imageUrl
        name
        slug
        ...CollectionModalContent_data
        id
      }
    }
  }
}

fragment StringTraitFilter_data on StringTraitType {
  counts {
    count
    value
  }
  key
}

fragment asset_url on AssetType {
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    id
  }
  tokenId
}
`,
      variables: { ...defaultVariables, categories: category ? [category] : [] }
    }

    const result = await axios.post<OpenseaGraphQLApiResponse>('https://api.opensea.io/graphql/', query)

    setBundles(result.data.data.query.search.edges.map((edge) => edge.node.assetBundle))
    setLoading(false)
  }, [category])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    bundles,
    loading
  }
}
