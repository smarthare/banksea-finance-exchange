import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export type TradingFlowData = {
  nodesList: { name: string }[]
  linksList: { source: string, target: string, value: number }[]
}

export const useCollectionTradingFlowQuery = (id?: string): UseQueryResult<TradingFlowData> => {
  return useQuery(
    ['COLLECTIONS_TRADING_FLOW', id],
    async () => {
      if (!id) {
        return undefined
      }

      return await bankseaRequest
        .get<BankseaApiResponse<TradingFlowData>>(`/oracle/flow/id/${id}`)
        .then(r => r.data.data)
    }
  )
}
