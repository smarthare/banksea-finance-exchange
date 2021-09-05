import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

export type CollectionMarketValue = {
  time: number[]
  value: number[]
}

export const useCollectionMarketValueQuery = (nftSeriesId: string): UseQueryResult<CollectionMarketValue> => {
  return useQuery(
    ['COLLECTION_MARKET_VALUE', nftSeriesId],
    async () => {
      return await banksyRequest
        .post<BanksyApiResponse<CollectionMarketValue>>(
          '/oracle/chart/cap',
          { nftSeriesId }
        )
        .then(r => r.data.data)
    }
  )
}
