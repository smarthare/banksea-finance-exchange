import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'

export type RankingCollection = {
  id: string
  assetContractAddress: string
  nftRanking: any
  seriesName: string
  seriesLogo: string
  seriesSlug: string
  seriesPoster: string
  createdTime: string
  seriesDescription: string
  seriesWebsite: any
  seriesLink: string
  seriesDiscord: string
  seriesTwitter: any
  totalSupply: string
  floorPrice: number
  marketCap: number
  numOwners: string
  sevenDayChange: number
  sevenDayVolume: number
  thirtyDayChange: number
  thirtyDayVolume: number
  oneDayChange: number
  oneDayVolume: number
  totalVolume: number
  rateOwners: any
  allTransaction: string
  sevenDayTransaction: string
  sevenDayAvgPrice: number
  sevenDayFloorPrice: any
  turnoverRate: any
  oneDayTransaction: number
  oneDayAvgPrice: number
  avgPrice: number
}

export const useRankingCollectionsQuery = (size?: number, current?: number): UseQueryResult<BankseaApiPagingData<RankingCollection>> => {
  return useQuery(
    ['RANKING_COLLECTION', size, current],
    async () => {
      return await bankseaRequest
        .post<BankseaApiResponse<BankseaApiPagingData<RankingCollection>>>('/oracle/whitelist/rankings', { size, current })
        .then(r => r.data.data)
    }
  )
}
