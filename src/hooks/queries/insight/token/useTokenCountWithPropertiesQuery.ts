import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'


export const useTokenCountWithPropertiesQuery = (tokenId: string, collectionSlug: string): UseQueryResult<number> => {
  return useQuery(
    ['TOKEN_PROPERTIES_COUNT', tokenId, collectionSlug], async () => {
      return bankseaRequest
        .post<BankseaApiResponse<number>>('/oracle/detail/count', {
          collectionSlug,
          nftNumber: tokenId
        })
        .then(r => r.data.data)
    }
  )
}
