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
  nftSeriesId: string
  sortByKey?: string
  current: number,
  size?: number
}

export const useCollectionNftsQuery = (data: CollectionNftsQueryParams): UseQueryResult<BanksyApiPagingData<CollectionNft>> => {
  return useQuery(
    ['CURRENCY_MARKET_VALUE', data],
    async () => {
      return await banksyRequest.post<BanksyApiResponse<BanksyApiPagingData<CollectionNft>>>(
        '/oracle/detail/sort', data)
        .then(r => r.data.data)
    }
  )
}
