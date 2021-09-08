import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiPagingData, BanksyApiResponse } from '../../../../utils/banksyRequest'


export interface CollectionValuationAttribute {
  id: string
  nftSeriesId: string
  prevailingTrend?: string
  attributeType: string
  attributeValue: string
  volumeNftEth?: string
  volumeNftUsd?: string
  avgPriceNftEth?: string
  avgPriceNftUsd?: string
  numNft: string
  rateAttribute: number
}

type CollectionValuationAttributeQueryParams = {
  id: string
  current: number
  size?: number
}

export const useCollectionValuationAttributeQuery = (data: CollectionValuationAttributeQueryParams): UseQueryResult<BanksyApiPagingData<CollectionValuationAttribute>> => {
  return useQuery(
    ['COLLECTION_VALUATION_ATTR', data],
    async () => {
      return await banksyRequest
        .post<BanksyApiResponse<BanksyApiPagingData<CollectionValuationAttribute>>>('/oracle/detail/attributes', data)
        .then(r => r.data.data)
    }
  )
}
