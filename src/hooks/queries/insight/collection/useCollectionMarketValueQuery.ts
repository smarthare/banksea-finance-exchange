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
      // fixme: mock
      const CRYPTO_PUNKS_SERIES_ID = '1432621402511089665'

      const url = nftSeriesId === CRYPTO_PUNKS_SERIES_ID ? '/oracle/chart/capitalization' : '/oracle/chart/cap'

      return await bankseaRequest
        .post<BankseaApiResponse<CollectionMarketValue>>(
          url,
          { nftSeriesId }
        )
        .then(r => r.data.data)
    }
  )
}
