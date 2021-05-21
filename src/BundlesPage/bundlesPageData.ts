import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'
import { weiToString } from '../web3/utils'
// import openSeaService from '../_services/openSeaService'
// import { OpenSeaAssetBundle } from 'opensea-js/lib/types'

const OPENSEA_GRAPHQL_API_URL = 'https://api.opensea.io/graphql/'

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

/*export const useQueryOpenseaBundles = (category?: string) => {
  // const [bundles, setBundles] = useState<AssetBundle[]>()
  const [bundles, setBundles] = useState<OpenSeaAssetBundle[]>()
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(async () => {
    setLoading(true)

    setBundles((await openSeaService.api.getBundles()).bundles)
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

// export const useOrdersQuery = (slug: string) => {
export const useOrdersQuery = (bundle?: OpenSeaAssetBundle | null) => {
  const [orders, setOrders] = useState<any[]>()

  const fetch = useCallback(async () => {
    /!*console.log('use orders query')
    const id = 'OrdersQuery'
    const query = `query OrdersQuery(
  $cursor: String
  $count: Int = 10
  $excludeMaker: IdentityInputType
  $isExpired: Boolean
  $isFilled: Boolean
  $isValid: Boolean
  $maker: IdentityInputType
  $makerArchetype: ArchetypeInputType
  $makerAssetIsPayment: Boolean
  $takerArchetype: ArchetypeInputType
  $takerAssetCategories: [CollectionSlug!]
  $takerAssetCollections: [CollectionSlug!]
  $takerAssetIsOwnedBy: IdentityInputType
  $takerAssetIsPayment: Boolean
  $sortAscending: Boolean
  $sortBy: OrderSortOption
  $makerAssetBundle: BundleSlug
  $takerAssetBundle: BundleSlug
) {
  ...Orders_data_2g7x2d
}

fragment AccountLink_data on AccountType {
  address
  chain {
    identifier
    id
  }
  user {
    publicUsername
    id
  }
  ...ProfileImage_data
  ...wallet_accountKey
}

fragment AskPrice_data on OrderV2Type {
  dutchAuctionFinalPrice
  openedAt
  priceFnEndedAt
  makerAssetBundle {
    assetQuantities(first: 30) {
      edges {
        node {
          ...quantity_data
          id
        }
      }
    }
    id
  }
  takerAssetBundle {
    assetQuantities(first: 1) {
      edges {
        node {
          ...AssetQuantity_data
          id
        }
      }
    }
    id
  }
}

fragment AssetCell_assetBundle on AssetBundleType {
  assetQuantities(first: 2) {
    edges {
      node {
        asset {
          collection {
            name
            id
          }
          name
          ...AssetMedia_asset
          ...asset_url
          id
        }
        relayId
        id
      }
    }
  }
  name
  slug
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

fragment Orders_data_2g7x2d on Query {
  orders(after: $cursor, excludeMaker: $excludeMaker, first: $count, isExpired: $isExpired, isFilled: $isFilled, isValid: $isValid, maker: $maker, makerArchetype: $makerArchetype, makerAssetIsPayment: $makerAssetIsPayment, takerArchetype: $takerArchetype, takerAssetCategories: $takerAssetCategories, takerAssetCollections: $takerAssetCollections, takerAssetIsOwnedBy: $takerAssetIsOwnedBy, takerAssetIsPayment: $takerAssetIsPayment, sortAscending: $sortAscending, sortBy: $sortBy, makerAssetBundle: $makerAssetBundle, takerAssetBundle: $takerAssetBundle) {
    edges {
      node {
        closedAt
        isFulfillable
        isValid
        oldOrder
        openedAt
        orderType
        maker {
          address
          ...AccountLink_data
          ...wallet_accountKey
          id
        }
        makerAsset: makerAssetBundle {
          assetQuantities(first: 1) {
            edges {
              node {
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
                  id
                }
                id
              }
            }
          }
          id
        }
        makerAssetBundle {
          assetQuantities(first: 30) {
            edges {
              node {
                ...AssetQuantity_data
                ...quantity_data
                id
              }
            }
          }
          id
        }
        relayId
        side
        taker {
          ...AccountLink_data
          ...wallet_accountKey
          id
          address
        }
        takerAssetBundle {
          assetQuantities(first: 1) {
            edges {
              node {
                asset {
                  ownedQuantity(identity: {})
                  decimals
                  symbol
                  relayId
                  assetContract {
                    account {
                      address
                      id
                    }
                    id
                  }
                  id
                }
                quantity
                ...AssetQuantity_data
                ...quantity_data
                id
              }
            }
          }
          id
        }
        ...AskPrice_data
        ...orderLink_data
        makerAssetBundleDisplay: makerAssetBundle {
          ...AssetCell_assetBundle
          id
        }
        takerAssetBundleDisplay: takerAssetBundle {
          ...AssetCell_assetBundle
          id
        }
        ...quantity_remaining
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

fragment ProfileImage_data on AccountType {
  imageUrl
  address
  chain {
    identifier
    id
  }
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

fragment orderLink_data on OrderV2Type {
  makerAssetBundle {
    assetQuantities(first: 30) {
      edges {
        node {
          asset {
            externalLink
            collection {
              externalUrl
              id
            }
            id
          }
          id
        }
      }
    }
    id
  }
}

fragment quantity_data on AssetQuantityType {
  asset {
    decimals
    id
  }
  quantity
}

fragment quantity_remaining on OrderV2Type {
  quantity_remaining_makerAssetBundle: makerAssetBundle {
    assetQuantities(first: 1) {
      edges {
        node {
          asset {
            decimals
            id
          }
          quantity
          id
        }
      }
    }
    id
  }
  quantity_remaining_takerAssetBundle: takerAssetBundle {
    assetQuantities(first: 1) {
      edges {
        node {
          asset {
            decimals
            id
          }
          quantity
          id
        }
      }
    }
    id
  }
  remainingQuantity
  side
}

fragment wallet_accountKey on AccountType {
  address
  chain {
    identifier
    id
  }
}
`
    const defaultVariables = {
      cursor: null,
      count: null,
      excludeMaker: null,
      isExpired: false,
      isFilled: null,
      isValid: true,
      maker: null,
      makerArchetype: null,
      makerAssetIsPayment: null,
      takerArchetype: null,
      takerAssetCategories: null,
      takerAssetCollections: null,
      takerAssetIsOwnedBy: null,
      takerAssetIsPayment: true,
      sortAscending: true,
      sortBy: 'TAKER_ASSETS_USD_PRICE',
      makerAssetBundle: '',
      takerAssetBundle: null
    }

    const r = await axios.post(OPENSEA_GRAPHQL_API_URL, {
      id,
      query,
      variables: { ...defaultVariables, makerAssetBundle: slug }
    })

    setOrders(r.data.data.orders.edges.map((edge: any) => edge.node))*!/
    try {
      if (bundle) {
        openSeaService.api
          .getOrders({
            token_ids: bundle.assets.map(ass => ass.tokenId!),
            bundled: true,
            asset_contract_address: bundle.assetContract?.address
          })
          .then(({ orders }) => {
            console.log(`orders: ${orders}`)

            setOrders(orders)
          })
          .catch(_ => {
            // setTimeout(fetch, 1200)
          })
      }
    } catch (e) {}
  }, [bundle])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    orders
  }
}*/

export const useEventHistoryQuery = (bundle: string) => {
  const [histories, setHistories] = useState<any[]>([])

  const fetch = useCallback(async () => {
    const id = 'EventHistoryQuery'
    const query = `query EventHistoryQuery(
  $archetype: ArchetypeInputType
  $bundle: BundleSlug
  $collections: [CollectionSlug!]
  $categories: [CollectionSlug!]
  $chains: [ChainScalar!]
  $eventTypes: [EventType!]
  $cursor: String
  $count: Int = 10
  $showAll: Boolean = false
  $identity: IdentityInputType
) {
  ...EventHistory_data_L1XK6
}

fragment AccountLink_data on AccountType {
  address
  chain {
    identifier
    id
  }
  user {
    publicUsername
    id
  }
  ...ProfileImage_data
  ...wallet_accountKey
}

fragment AssetCell_asset on AssetType {
  collection {
    name
    id
  }
  name
  ...AssetMedia_asset
  ...asset_url
}

fragment AssetCell_assetBundle on AssetBundleType {
  assetQuantities(first: 2) {
    edges {
      node {
        asset {
          collection {
            name
            id
          }
          name
          ...AssetMedia_asset
          ...asset_url
          id
        }
        relayId
        id
      }
    }
  }
  name
  slug
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

fragment EventHistory_data_L1XK6 on Query {
  assetEvents(after: $cursor, bundle: $bundle, archetype: $archetype, first: $count, categories: $categories, collections: $collections, chains: $chains, eventTypes: $eventTypes, identity: $identity, includeHidden: true) {
    edges {
      node {
        assetBundle @include(if: $showAll) {
          ...AssetCell_assetBundle
          id
        }
        assetQuantity {
          asset @include(if: $showAll) {
            ...AssetCell_asset
            id
          }
          ...quantity_data
          id
        }
        relayId
        eventTimestamp
        eventType
        offerEnteredClosedAt
        customEventName
        devFee {
          quantity
          ...AssetQuantity_data
          id
        }
        devFeePaymentEvent {
          ...EventTimestamp_data
          id
        }
        fromAccount {
          address
          ...AccountLink_data
          id
        }
        price {
          quantity
          ...AssetQuantity_data
          id
        }
        endingPrice {
          quantity
          ...AssetQuantity_data
          id
        }
        seller {
          ...AccountLink_data
          id
        }
        toAccount {
          ...AccountLink_data
          id
        }
        winnerAccount {
          ...AccountLink_data
          id
        }
        ...EventTimestamp_data
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

fragment EventTimestamp_data on AssetEventType {
  eventTimestamp
  transaction {
    blockExplorerLink
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

fragment ProfileImage_data on AccountType {
  imageUrl
  address
  chain {
    identifier
    id
  }
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

fragment quantity_data on AssetQuantityType {
  asset {
    decimals
    id
  }
  quantity
}

fragment wallet_accountKey on AccountType {
  address
  chain {
    identifier
    id
  }
}
`
    const defaultVariables = {
      archetype: null,
      bundle: '',
      collections: null,
      categories: null,
      chains: null,
      eventTypes: null,
      cursor: null,
      count: 10,
      showAll: false,
      identity: null
    }

    const r = await axios.post(OPENSEA_GRAPHQL_API_URL, {
      id,
      query,
      variables: { ...defaultVariables, bundle }
    })

    setHistories(r.data.data.assetEvents.edges.map((edge: any) => edge.node))
  }, [bundle])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    histories
  }
}

export const useQueryBundleCurrentPrice = (bundle: string) => {
  const [bundleCurrentPrice, setBundleCurrentPrice] = useState<string | undefined>()

  const { histories } = useEventHistoryQuery(bundle)

  useEffect(() => {
    const [history] = histories

    setBundleCurrentPrice(weiToString(history?.price?.quantity))
  }, [histories])

  return {
    bundleCurrentPrice
  }
}
