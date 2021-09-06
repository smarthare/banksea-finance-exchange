import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

export const useCollectionPriceScatterQuery = (contractAddress: string): UseQueryResult<{
  price: Array<[number, number]>
}> => {
  return useQuery(
    ['COLLECTIONS_PRICE_SCATTER', contractAddress],
    async () => {
      return await banksyRequest.post<BanksyApiResponse<Array<[number, number]>>>(
        '/oracle/chart/price', {
          contractAddress
        })
        .then(r => r.data.data)
    }
  )
}
