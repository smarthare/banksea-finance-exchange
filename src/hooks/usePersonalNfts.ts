import { personalNftList } from '../utils/banksyNftList'
import { useSelector } from 'react-redux'
import { getAccount } from '../store/wallet'
import { useState } from 'react'
import { useQuery } from 'react-query'


export function usePersonalNfts() {
  const account = useSelector(getAccount)

  const [current] = useState(1)

  const form = {
    addressOwner: account,
    current: current,
    size: 20
  }

  return useQuery('PERSONAL_NFT', async () => {
    return await personalNftList(form).then((res: any) => {
      return res.data.data.records.map((item: any) => ({
        ...item,
        image: `https://banksy.mypinata.cloud${item?.image.slice(-52)}`
      }))
    })
  })

}
