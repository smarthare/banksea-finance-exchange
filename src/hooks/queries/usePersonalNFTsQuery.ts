import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { useQuery, UseQueryResult } from 'react-query'
import { ChainType, personalNftList } from '../../apis/nft'

type PersonalNFTsQueryParams = {
  current?: number
  size?: number,
  searchKey?: string
  typeChain: ChainType
}

export function usePersonalNFTsQuery(params: PersonalNFTsQueryParams): UseQueryResult<Array<any>> {
  const account = useSelector(getAccount)

  return useQuery(
    ['PERSONAL_NFT', params],
    async () => {
      if (!account) {
        return []
      }

      return await personalNftList({
        ...params,
        addressOwner: account
      })
        .then((res: any) =>
          res.data.data.records.map((item: any) => ({
            ...item,
            image: `https://banksy.mypinata.cloud${item?.image.slice(-52)}`
          }))
        )
    }
  )
}
