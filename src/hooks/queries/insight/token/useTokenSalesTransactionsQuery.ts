import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'
import { TokenTransaction } from '@/hooks/queries/insight/token/useTokenTransactionsQuery'

export const useTokenSalesTransactionsQuery = (collectionSlug: string, tokenId: string | number): UseQueryResult<TokenTransaction[]> => {
  return useQuery(
    ['TOKEN_SALES_TRANSACTIONS', collectionSlug, tokenId], async () => {
      return bankseaRequest
        .get<BankseaApiResponse<TokenTransaction[]>>(`/oracle/sales/${collectionSlug}/${tokenId}`)
        .then(r => r.data.data)
    }
  )
}
