import { useQuery, UseQueryResult } from 'react-query'
import { bankseaNftDetail, NftDetailQueryRequest } from '@/apis/nft'
import { NftDetail } from '@/types/NFTDetail'

export const useNftDetailQuery = (params: NftDetailQueryRequest): UseQueryResult<NftDetail> => {
  return useQuery(
    ['NFT_DETAIL', params],
    async () => {
      return await bankseaNftDetail(params)
        .then(res => res.data.data)
    }
  )
}
