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
  askingPriceBias?: number
  lastSalePriceEth?: string
  lastSalePriceUsd?: string
  lastSaleTime?: number
  bidsPriceEth?: string
  bidsPriceUsd?: string
  bidsPriceFloatEth?: string
  bidsPriceFloatUsd?: string
  bidsPriceBias?: number
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
  valuationChange?: {
    changeOneDayEth: number
    changeSevenDayEth: number
    changeThirtyDayEth: number
    changeOneDayUsd: number
    changeSevenDayUsd: number
    changeThirtyDayUsd: number
  }
  aiValuationVo: AiValuation
  aiValuationVoList: AiValuation[]
  aiPrice?: string
}

export interface AiValuation {
  assetTokenId: number
  assetContractAddress: string
  collectionSlug: string
  realPrice: number
  valuation: number
  valuationTime: number
  idTotalCount: number
  salesCount: number
  salesAveragePrice: number
  salesMaxPrice: number
  salesMinPrice: number
  salesSum: number
  salesPriceFluctuation: number
  rarityAttributesMeanFeature: number
  rarityAttributesMaxFeature: number
  rarityAttributesMinFeature: number
  popularityAttributesMeanFeature: number
  popularityAttributesMaxFeature: number
  popularityAttributesMinFeature: number
  attributesCountAttributesMaxFeature: number
  attributesCountAttributesMinFeature: number
  successfulTotalPriceMaxAttributesMaxFeature: number
  successfulTotalPriceMinAttributesMaxFeature: number
  successfulTotalPriceSumAttributesMaxFeature: number
  successfulTotalPriceStdAttributesMaxFeature: number
  successfulCount: number
  assetSuccessfulMaxCount: number
  assetPopularityScore: number
  t1AssetTurnoverRate: number
  t1AssetTurnoverRateScore: number
  t3AssetTurnoverRate: number
  t3AssetTurnoverRateScore: number
  t7AssetTurnoverRate: number
  t7AssetTurnoverRateScore: number
  t30AssetTurnoverRate: number
  t30AssetTurnoverRateScore: number
  t90AssetTurnoverRate: number
  t90AssetTurnoverRateScore: number
  t180AssetTurnoverRate: number
  t180AssetTurnoverRateScore: number
  t365AssetTurnoverRate: number
  t365AssetTurnoverRateScore: number
  collectionPopularityScore: number
  t1CollectionTurnoverRate: number
  t1CollectionTurnoverRateScore: number
  t3CollectionTurnoverRate: number
  t3CollectionTurnoverRateScore: number
  t7CollectionTurnoverRate: number
  t7CollectionTurnoverRateScore: number
  t30CollectionTurnoverRate: number
  t30CollectionTurnoverRateScore: number
  t90CollectionTurnoverRate: number
  t90CollectionTurnoverRateScore: number
  t180CollectionTurnoverRate: number
  t180CollectionTurnoverRateScore: number
  t365CollectionTurnoverRate: number
  t365CollectionTurnoverRateScore: number
  t1BtcMarketCapUsdMean: number
  t1BtcMarketCapUsdMax: number
  t1BtcMarketCapUsdMin: number
  t1BtcMarketCapUsdStd: number
  t1BtcMarketCapUsdSum: number
  t3BtcMarketCapUsdMean: number
  t3BtcMarketCapUsdMax: number
  t3BtcMarketCapUsdMin: number
  t3BtcMarketCapUsdStd: number
  t3BtcMarketCapUsdSum: number
  t7BtcMarketCapUsdMean: number
  t7BtcMarketCapUsdMax: number
  t7BtcMarketCapUsdMin: number
  t7BtcMarketCapUsdStd: number
  t7BtcMarketCapUsdSum: number
  t30BtcMarketCapUsdMean: number
  t30BtcMarketCapUsdMax: number
  t30BtcMarketCapUsdMin: number
  t30BtcMarketCapUsdStd: number
  t30BtcMarketCapUsdSum: number
  t90BtcMarketCapUsdMean: number
  t90BtcMarketCapUsdMax: number
  t90BtcMarketCapUsdMin: number
  t90BtcMarketCapUsdStd: number
  t90BtcMarketCapUsdSum: number
  realPriceChangeRate: number
  valuationChangeRate?: number
  salesCountChangeRate?: number
  salesAveragePriceChangeRate?: number
  salesMaxPriceChangeRate?: number
  salesMinPriceChangeRate?: number
  salesSumChangeRate?: number
  salesPriceFluctuationChangeRate?: number
  rarityAttributesMeanFeatureChangeRate?: number
  rarityAttributesMaxFeatureChangeRate?: number
  rarityAttributesMinFeatureChangeRate?: number
  popularityAttributesMeanFeatureChangeRate?: number
  popularityAttributesMaxFeatureChangeRate?: number
  popularityAttributesMinFeatureChangeRate?: number
  attributesCountAttributesMaxFeatureChangeRate?: number
  attributesCountAttributesMinFeatureChangeRate?: number
  successfulTotalPriceMaxAttributesMaxFeatureChangeRate?: number
  successfulTotalPriceMinAttributesMaxFeatureChangeRate?: number
  successfulTotalPriceSumAttributesMaxFeatureChangeRate?: number
  successfulTotalPriceStdAttributesMaxFeatureChangeRate?: number
  successfulCountChangeRate?: number
  assetSuccessfulMaxCountChangeRate?: number
  assetPopularityScoreChangeRate?: number
  t1AssetTurnoverRateChangeRate?: number
  t1AssetTurnoverRateScoreChangeRate?: number
  t3AssetTurnoverRateChangeRate?: number
  t3AssetTurnoverRateScoreChangeRate?: number
  t7AssetTurnoverRateChangeRate?: number
  t7AssetTurnoverRateScoreChangeRate?: number
  t30AssetTurnoverRateChangeRate?: number
  t30AssetTurnoverRateScoreChangeRate?: number
  t90AssetTurnoverRateChangeRate?: number
  t90AssetTurnoverRateScoreChangeRate?: number
  t180AssetTurnoverRateChangeRate?: number
  t180AssetTurnoverRateScoreChangeRate?: number
  t365AssetTurnoverRateChangeRate?: number
  t365AssetTurnoverRateScoreChangeRate?: number
  collectionPopularityScoreChangeRate?: number
  t1CollectionTurnoverRateChangeRate?: number
  t1CollectionTurnoverRateScoreChangeRate?: number
  t3CollectionTurnoverRateChangeRate?: number
  t3CollectionTurnoverRateScoreChangeRate?: number
  t7CollectionTurnoverRateChangeRate?: number
  t7CollectionTurnoverRateScoreChangeRate?: number
  t30CollectionTurnoverRateChangeRate?: number
  t30CollectionTurnoverRateScoreChangeRate?: number
  t90CollectionTurnoverRateChangeRate?: number
  t90CollectionTurnoverRateScoreChangeRate?: number
  t180CollectionTurnoverRateChangeRate?: number
  t180CollectionTurnoverRateScoreChangeRate?: number
  t365CollectionTurnoverRateChangeRate?: number
  t365CollectionTurnoverRateScoreChangeRate?: number
  t1BtcMarketCapUsdMeanChangeRate?: number
  t1BtcMarketCapUsdMaxChangeRate?: number
  t1BtcMarketCapUsdMinChangeRate?: number
  t1BtcMarketCapUsdStdChangeRate?: number
  t1BtcMarketCapUsdSumChangeRate?: number
  t3BtcMarketCapUsdMeanChangeRate?: number
  t3BtcMarketCapUsdMaxChangeRate?: number
  t3BtcMarketCapUsdMinChangeRate?: number
  t3BtcMarketCapUsdStdChangeRate?: number
  t3BtcMarketCapUsdSumChangeRate?: number
  t7BtcMarketCapUsdMeanChangeRate?: number
  t7BtcMarketCapUsdMaxChangeRate?: number
  t7BtcMarketCapUsdMinChangeRate?: number
  t7BtcMarketCapUsdStdChangeRate?: number
  t7BtcMarketCapUsdSumChangeRate?: number
  t30BtcMarketCapUsdMeanChangeRate?: number
  t30BtcMarketCapUsdMaxChangeRate?: number
  t30BtcMarketCapUsdMinChangeRate?: number
  t30BtcMarketCapUsdStdChangeRate?: number
  t30BtcMarketCapUsdSumChangeRate?: number
  t90BtcMarketCapUsdMeanChangeRate?: number
  t90BtcMarketCapUsdMaxChangeRate?: number
  t90BtcMarketCapUsdMinChangeRate?: number
  t90BtcMarketCapUsdStdChangeRate?: number
  t90BtcMarketCapUsdSumChangeRate?: number
}

export interface AttributeHeat {
  traitType: string
  value: string
  ratio: number
  heat: number
  change: any
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
        `/oracle/detail/asset/${id}`
      ).then(r => r.data.data
      )
    }
  )
}
