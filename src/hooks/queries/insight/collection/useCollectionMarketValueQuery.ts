import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export type CollectionMarketValue = {
  time: number[]
  value: number[]
}

export const useCollectionMarketValueQuery = (nftSeriesId?: string): UseQueryResult<CollectionMarketValue> => {
  return useQuery(
    ['COLLECTION_MARKET_VALUE', nftSeriesId],
    async () => {
      return await bankseaRequest
        .post<BankseaApiResponse<CollectionMarketValue>>(
          '/oracle/chart/cap',
          { nftSeriesId }
        )
        .then(r => r.data.data)
    }
  )
}
