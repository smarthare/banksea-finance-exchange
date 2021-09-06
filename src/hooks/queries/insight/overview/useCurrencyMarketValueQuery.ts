import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

export interface CurrencyMarketValue {
  marketCapBtc?: string
  marketCapEth?: string
}

export const useCurrencyMarketValueQuery = (): UseQueryResult<CurrencyMarketValue> => {
  return useQuery(
    ['CURRENCY_MARKET_VALUE'],
    async () => {
      return await banksyRequest.get<BanksyApiResponse<CurrencyMarketValue>>(
        '/oracle/ticker/coin')
        .then(r => r.data.data)
    }
  )
}
