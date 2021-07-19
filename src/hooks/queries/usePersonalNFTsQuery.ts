import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { useQuery, UseQueryResult } from 'react-query'
import { BanksyPersonalNftListQueryParams, personalNftList } from '../../apis/nft'

type PersonalNFTsQueryParams = {
  current?: number
  size?: number,
  searchKey?: string
}

export function usePersonalNFTsQuery({ current, size, searchKey }: PersonalNFTsQueryParams): UseQueryResult<Array<any>> {
  const account = useSelector(getAccount)

  const form: BanksyPersonalNftListQueryParams = {
    addressOwner: account!,
    current: current ?? 1,
    size: size ?? 20,
    typeChain: 'Ethereum',
    searchKey
  }

  return useQuery(
    ['PERSONAL_NFT', form],
    async () => {
      return await personalNftList(form)
        .then((res: any) =>
          res.data.data.records.map((item: any) => ({
            ...item,
            image: `https://banksy.mypinata.cloud${item?.image.slice(-52)}`
          }))
        )
    }
  )
}
