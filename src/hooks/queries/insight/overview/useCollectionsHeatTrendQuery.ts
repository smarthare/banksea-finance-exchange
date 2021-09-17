import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '@/utils/banksyRequest'

export type OracleHeatChartData = {
  seriesName: string
  heatScore: number[]
  t1TurnoverRate: number[]
  t1TurnoverRateScore: number[]
  t3TurnoverRate: number[]
  t3TurnoverRateScore: number[]
  t7TurnoverRate: number[]
  t7TurnoverRateScore: number[]
  t30TurnoverRate: number[]
  t30TurnoverRateScore: number[]
  t90TurnoverRate: number[]
  t90TurnoverRateScore: number[]
  t180TurnoverRate: number[]
  t180TurnoverRateScore: number[]
  t365TurnoverRate: number[]
  t365TurnoverRateScore: number[]
  time: number[]
}

export const useCollectionsHeatTrendQuery = (seriesSlug?: string): UseQueryResult<OracleHeatChartData[]> => {
  return useQuery(
    ['COLLECTIONS_HEAT_TREND', seriesSlug], () => {
      return banksyRequest
        .post<BanksyApiResponse<OracleHeatChartData[]>>('/oracle/chart/heat', { seriesSlug })
        .then(r => r.data.data)
    }
  )
}
