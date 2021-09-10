import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

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

      return banksyRequest
        .post<BanksyApiResponse<{ price?: string }>>('/oracle/ai/price', params)
        .then(r => r.data?.data?.price)
    }
  )
}
