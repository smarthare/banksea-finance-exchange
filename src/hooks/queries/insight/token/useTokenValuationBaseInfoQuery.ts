import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

export interface NftValuation {
  id: string
  assetContractAddress: string
  seriesName: string
  bids: number
  askingPrice?: string
  lastSalePrice?: string
  nftSeriesId: string
  tokenId: number
  nftName: string
  oracleValuationEth?: string
  oracleValuationUsd?: string
  askingPriceEth?: string
  askingPriceUsd?: string
  askingPriceFloatEth?: string
  askingPriceFloatUsd?: string
  askingPriceBias?: string
  lastSalePriceEth?: string
  lastSalePriceUsd?: string
  lastSaleTime?: number
  bidsPriceEth?: string
  bidsPriceUsd?: string
  bidsPriceFloatEth?: string
  bidsPriceFloatUsd?: string
  bidsPriceBias?: string
  thirtyDayChangeValuationEth?: string
  sevenDayChangeValuationEth?: string
  oneDayChangeValuationEth?: string
  thirtyDayChangeValuationUsd?: string
  sevenDayChangeValuationUsd?: string
  oneDayChangeValuationUsd?: string
  nftImageUrl: string
  nftAttributes: NftAttribute[]
  nftOwner?: string
  priceVolatility?: string
  ranking?: number
  turnoverRate?: string
  numbWithAttributesCount: number
}

export interface NftAttribute {
  traitType: string
  value: string
  ratio: number
}

export const useTokenValuationBaseInfoQuery = (id: string): UseQueryResult<NftValuation> => {
  return useQuery(
    ['NFT_VALUATION', id], async () => {
      return await banksyRequest.get<BanksyApiResponse<NftValuation>>(
        `/oracle/detail/sort/${id}`
      ).then(r => r.data.data
      )
    }
  )
}
