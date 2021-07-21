import { banksyNftList, BanksyNftListQueryParams } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { BanksyApiPagingData } from '../../utils/banksyRequest'

export function useNFTsQuery(params: BanksyNftListQueryParams): UseQueryResult<BanksyApiPagingData<any>> {
  return useQuery(
    ['ALL_NFTS', params],
    async () => {
      return await banksyNftList(params)
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
