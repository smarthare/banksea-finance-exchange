import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'

export interface TokenTransaction {
  eventType: string
  price: any
  transactionFromAccountAddress: string
  transactionToAccountAddress: string
  date: number
}

export type TokenTransactionType = 'Sales' | 'Bids' | 'Transfers' | 'Listings'

export interface NftTransactionQueryParams {
  tokenId: string
  assetContractAddress: string
  filter: TokenTransactionType[],
  current: number
  size?: number
}

export const useTokenTransactionsQuery = (params: NftTransactionQueryParams): UseQueryResult<BankseaApiPagingData<TokenTransaction>> => {
  return useQuery(
    ['TOKEN_TRANSACTIONS', params], async () => {
      return bankseaRequest
        .post<BankseaApiResponse<BankseaApiPagingData<TokenTransaction>>>('/oracle/transactions', params)
        .then(r => r.data.data)
    }
  )
}
