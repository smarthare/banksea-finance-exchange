import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '@/utils/banksyRequest'


export const useTokenCountWithPropertiesQuery = (tokenId: string, collectionSlug: string): UseQueryResult<number> => {
  return useQuery(
    ['TOKEN_PROPERTIES_COUNT', tokenId, collectionSlug], async () => {
      return banksyRequest
        .post<BanksyApiResponse<number>>('/oracle/detail/count', {
          collectionSlug,
          nftNumber: tokenId
        })
        .then(r => r.data.data)
    }
  )
}
