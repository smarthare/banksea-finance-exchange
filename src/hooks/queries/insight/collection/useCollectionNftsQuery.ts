import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'

export interface CollectionNft {
  id: string
  nftSeriesId: string
  nftNumber: number
  nftName: string
  nftImageUrl: string
  nftAttributes: string
  nftOwner?: number
  priceVolatility?: string
  ranking?: number
  turnoverRate?: number

  lastPrice: string
  valuation: string
  rarity: string
  popularity: string
  salesNumber: string
}

interface CollectionNftsQueryParams {
  nftSeriesId?: string
  sortByKey?: CollectionNftsQuerySortByKey
  current: number
  size?: number
  searchKey?: string
}

export type CollectionNftsQuerySortByKey = 'Last Price' | 'Valuation' | 'Rarity' | 'Popularity' | 'Sales Number'

export const AVAILABLE_SORT_KEYS: CollectionNftsQuerySortByKey[] = [
  'Last Price', 'Valuation', 'Rarity', 'Popularity', 'Sales Number'
]

export const useCollectionNftsQuery = (data: CollectionNftsQueryParams): UseQueryResult<BankseaApiPagingData<CollectionNft>> => {
  return useQuery(
    ['CURRENCY_MARKET_VALUE', data],
    async () => {
      if (!data.nftSeriesId) {
        return
      }

      return await bankseaRequest
        .post<BankseaApiResponse<BankseaApiPagingData<CollectionNft>>>('/oracle/detail/search', data)
        .then(r => r.data.data)
    }
  )
}
