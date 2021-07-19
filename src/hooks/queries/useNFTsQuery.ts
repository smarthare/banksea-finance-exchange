import { banksyNftList, BanksyNftListQueryParams } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { BanksyApiPagingData } from '../../utils/banksyRequest'

type PersonalNFTsQueryParams = {
  current?: number
  size?: number
  searchKey?: string
  transactionStatus?: string
}

export function useNFTsQuery({ current, size, searchKey }: PersonalNFTsQueryParams): UseQueryResult<BanksyApiPagingData<any>> {
  const form: BanksyNftListQueryParams = {
    current: current ?? 1,
    size: size ?? 20,
    searchKey,
    typeChain: 'Ethereum'
  }

  return useQuery(
    ['ALL_NFTS', form],
    async () => {
      return await banksyNftList(form)
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
