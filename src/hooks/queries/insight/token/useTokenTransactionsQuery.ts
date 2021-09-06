import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiPagingData, BanksyApiResponse } from '../../../../utils/banksyRequest'

export interface NftTransaction {
  eventType: string
  price: any
  transactionFromAccountAddress: string
  transactionToAccountAddress: string
  date: number
}

export type NftTransactionType = 'Sales' | 'Bids' | 'Transfers' | 'Listings'

export interface NftTransactionQueryParams {
  tokenId: string
  assetContractAddress: string
  filter: NftTransactionType[],
  current: number
  size?: number
}

export const useTokenTransactionsQuery = (params: NftTransactionQueryParams): UseQueryResult<BanksyApiPagingData<NftTransaction>> => {
  return useQuery(
    ['TOKEN_TRANSACTIONS', params], async () => {
      return banksyRequest
        .post<BanksyApiResponse<BanksyApiPagingData<NftTransaction>>>('/oracle/transactions', params)
        .then(r => r.data.data)
    }
  )
}
