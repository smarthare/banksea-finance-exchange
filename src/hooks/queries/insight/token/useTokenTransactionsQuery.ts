import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'

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

export const useTokenTransactionsQuery = (params: NftTransactionQueryParams): UseQueryResult<BankseaApiPagingData<NftTransaction>> => {
  return useQuery(
    ['TOKEN_TRANSACTIONS', params], async () => {
      return bankseaRequest
        .post<BankseaApiResponse<BankseaApiPagingData<NftTransaction>>>('/oracle/transactions', params)
        .then(r => r.data.data)
    }
  )
}
