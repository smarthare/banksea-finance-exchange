import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

type CollectionTradingFlowCountQueryParams = {
  source?: string
  target?: string
  assetContractAddress?: string
}

export const useCollectionTradingFlowCountQuery = (params: CollectionTradingFlowCountQueryParams): UseQueryResult<{
  price: Array<[number, number]>
}> => {
  return useQuery(
    ['COLLECTION_TRADING_FLOW_COUNT', params],
    () => {
      if (!params.source || !params.target || !params.assetContractAddress) {
        return undefined
      }

      return bankseaRequest
        .post<BankseaApiResponse<number>>('/oracle/flow/count', params)
        .then(r => r.data.data)
    }
  )
}
