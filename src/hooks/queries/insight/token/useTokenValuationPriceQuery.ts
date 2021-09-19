import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

type TokenValuationPriceQueryParams = {
  tokenId: number
  assetContractAddress: string
}

export const useTokenValuationPriceQuery = (params: TokenValuationPriceQueryParams): UseQueryResult<string | undefined> => {
  return useQuery(
    ['TOKEN_VALUATION_PRICE', params], () => {
      if (!params.assetContractAddress) {
        return undefined
      }

      return bankseaRequest
        .post<BankseaApiResponse<{ price?: string }>>('/oracle/ai/price', params)
        .then(r => r.data?.data?.price)
    }
  )
}
