import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

export type TradingFlowData = {
  nodesList: { name: string }[]
  linksList: { source: string, target: string, value: number }[]
}

export const useCollectionTradingFlowQuery = (id: string): UseQueryResult<TradingFlowData> => {
  return useQuery(
    ['COLLECTIONS_TRADING_FLOW', id],
    async () => {
      return await banksyRequest.get<BanksyApiResponse<TradingFlowData>>(
        `/oracle/flow/id/${id}`)
        .then(r => r.data.data)
    }
  )
}
