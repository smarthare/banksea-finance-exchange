import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export interface CurrencyMarketValue {
  marketCapBtc?: string
  marketCapEth?: string
}

export const useCurrencyMarketValueQuery = (): UseQueryResult<CurrencyMarketValue> => {
  return useQuery(
    ['CURRENCY_MARKET_VALUE'],
    async () => {
      return await bankseaRequest
        .get<BankseaApiResponse<CurrencyMarketValue>>('/oracle/ticker/coin')
        .then(r => r.data.data)
    }
  )
}
