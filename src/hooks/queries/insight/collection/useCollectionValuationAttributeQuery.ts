import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'

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

export const useCollectionValuationAttributeQuery = (data: CollectionValuationAttributeQueryParams): UseQueryResult<BankseaApiPagingData<CollectionValuationAttribute>> => {
  return useQuery(
    ['COLLECTION_VALUATION_ATTR', data],
    async () => {
      if (!data.id) {
        return undefined
      }

      return await bankseaRequest
        .post<BankseaApiResponse<BankseaApiPagingData<CollectionValuationAttribute>>>('/oracle/detail/attribute', data)
        .then(r => r.data.data)
    }
  )
}
