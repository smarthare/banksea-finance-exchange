import { bankseaNftList, BankseaNftListQueryParams } from '@/apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { BankseaApiPagingData } from '@/utils/bankseaRequest'
import { NftListItem } from '@/types/NFTDetail'

export function useNFTsQuery(params: BankseaNftListQueryParams): UseQueryResult<BankseaApiPagingData<NftListItem>> {
  return useQuery(
    ['ALL_NFTS', params],
    async () => {
      return await bankseaNftList(params)
        .then(res => res.data.data)
        .then(pagingData => ({
          ...pagingData,
          records: pagingData.records.map((item: any) => ({
            ...item,
            image: item?.image?.slice(6) === 'ipfs:/' ? `https://banksy.mypinata.cloud${item?.image?.slice(6)}` : `https://banksy.mypinata.cloud${item?.image?.slice(-52)}`
          }))
        }))
    }
  )
}
