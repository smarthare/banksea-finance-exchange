import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'
import { CollectionExternalLink } from '../../../../types/CollectionValuation'

export interface CollectionValuationDetail {
  id: string
  assetContractAddress: string
  nftRanking?: number
  seriesName: string
  seriesLogo: string
  seriesSlug: string
  seriesPoster: string
  createdTime: string
  seriesDescription: string
  seriesWebsite?: string
  seriesLink?: string
  seriesDiscord?: string
  seriesTwitter?: string
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
  rateOwners?: string
  allTransaction: string
  sevenDayTransaction: string
  sevenDayAvgPrice: number
  sevenDayFloorPrice?: unknown
  turnoverRate?: string
  oneDayTransaction: number
  oneDayAvgPrice: number
  avgPrice: number

  convertToCollectionExternalLinks: () => CollectionExternalLink[]
}

export const useCollectionValuationDetailQuery = (id: string): UseQueryResult<CollectionValuationDetail> => {
  return useQuery(
    ['COLLECTION_VALUATION_DETAIL'],
    async () => {
      return await banksyRequest.get<BanksyApiResponse<CollectionValuationDetail>>(
        `/oracle/detail/${id}`)
        .then(r => r.data.data)
    }
  )
}
