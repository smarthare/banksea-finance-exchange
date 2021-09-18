import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiPagingData, BanksyApiResponse } from '@/utils/banksyRequest'

export interface CollectionValuationAttribute {
  id: string
  nftSeriesId: string
  attributeType: string
  attributeValue: string
  assetContractAddress: string
  rarity: number
  popularity?: number
}

type CollectionValuationAttributeQueryParams = {
  id?: string
  current: number
  size?: number
  sortKey?: CollectionValuationAttributeQuerySortKey
}

export type CollectionValuationAttributeQuerySortKey = 'rarity' | 'popularity'

export const AVAILABLE_SORT_KEYS: CollectionValuationAttributeQuerySortKey[] = ['rarity', 'popularity']

export const useCollectionValuationAttributeQuery = (data: CollectionValuationAttributeQueryParams): UseQueryResult<BanksyApiPagingData<CollectionValuationAttribute>> => {
  return useQuery(
    ['COLLECTION_VALUATION_ATTR', data],
    async () => {
      if (!data.id) {
        return undefined
      }

      return await banksyRequest
        .post<BanksyApiResponse<BanksyApiPagingData<CollectionValuationAttribute>>>('/oracle/detail/attribute', data)
        .then(r => r.data.data)
    }
  )
}
