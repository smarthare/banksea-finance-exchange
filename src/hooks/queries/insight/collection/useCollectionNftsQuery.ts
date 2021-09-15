import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiPagingData, BanksyApiResponse } from '../../../../utils/banksyRequest'

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

export const useCollectionNftsQuery = (data: CollectionNftsQueryParams): UseQueryResult<BanksyApiPagingData<CollectionNft>> => {
  return useQuery(
    ['CURRENCY_MARKET_VALUE', data],
    async () => {
      if (!data.nftSeriesId) {
        return
      }

      return await banksyRequest
        .post<BanksyApiResponse<BanksyApiPagingData<CollectionNft>>>('/oracle/detail/search', data)
        .then(r => r.data.data)
    }
  )
}
