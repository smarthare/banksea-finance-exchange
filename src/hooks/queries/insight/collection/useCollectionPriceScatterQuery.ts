import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export const useCollectionPriceScatterQuery = (contractAddress: string): UseQueryResult<{
  price: Array<[number, number]>
}> => {
  return useQuery(
    ['COLLECTIONS_PRICE_SCATTER', contractAddress],
    async () => {
      return await bankseaRequest
        .post<BankseaApiResponse<Array<[number, number]>>>('/oracle/chart/price', {
          contractAddress
        })
        .then(r => r.data.data)
    }
  )
}
