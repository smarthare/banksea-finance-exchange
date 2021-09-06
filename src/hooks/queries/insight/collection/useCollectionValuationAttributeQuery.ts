import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'


export interface CollectionValuationAttribute {
  id: string
  nftSeriesId: string
  prevailingTrend: any
  attributeType: string
  attributeValue: string
  volumeNftEth: any
  volumeNftUsd: any
  avgPriceNftEth: any
  avgPriceNftUsd: any
  numNft: string
  rateAttribute: number
}

export const useCollectionValuationAttributeQuery = (id: string): UseQueryResult<CollectionValuationAttribute[]> => {
  return useQuery(
    ['COLLECTION_VALUATION_ATTR'],
    async () => {
      return await banksyRequest.get<BanksyApiResponse<CollectionValuationAttribute[]>>(
        `/oracle/detail/${id}/attributes`)
        .then(r => r.data.data)
    }
  )
}
