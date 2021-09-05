import { useEffect, useState } from 'react'
import { useCollectionsHeatTrendQuery } from '../queries/insight/overview/useCollectionsHeatTrendQuery'
import {
  useWhitelistCollectionsQuery,
  WhitelistCollection
} from '../queries/insight/overview/useWhitelistCollectionsQuery'
import { RankingCollection, useRankingCollectionsQuery } from '../queries/insight/overview/useRankingCollectionsQuery'
import {
  CurrencyMarketValue,
  useCurrencyMarketValueQuery
} from '../queries/insight/overview/useCurrencyMarketValueQuery'
import { CollectionsHeatTrendChartProps } from '../../pages/Valuation/components/charts/CollectionsHeatTrendChart'
import {
  NftMarketTotalValuation,
  useNftMarketTotalValuationQuery
} from '../queries/insight/overview/useNftMarketTotalValuationQuery'

type ValuationPageData = {
  nftMarketTotalValuation?: NftMarketTotalValuation
  allWhitelistCollections: RankingCollection[]
  featureAddedWhitelistCollections: WhitelistCollection[]
  collectionsHeatTrendData?: CollectionsHeatTrendChartProps
  currencyMarketValue?: CurrencyMarketValue
}

const useValuationOverviewData = (): ValuationPageData => {
  const [collectionsHeatTrendData, setCollectionsHeatTrendData] = useState<CollectionsHeatTrendChartProps>()

  const { data: heatDataList } = useCollectionsHeatTrendQuery()

  const { data: whitelistCollections } = useWhitelistCollectionsQuery()

  const { data: currencyMarketValue } = useCurrencyMarketValueQuery()

  const rankingCollections = useRankingCollectionsQuery().data?.records

  const { data: nftMarketTotalValuation } = useNftMarketTotalValuationQuery()

  useEffect(() => {
    if (heatDataList) {
      const collections = heatDataList.map(o => o.seriesName)

      const map = heatDataList.flatMap(heatData =>
        heatData.heatScore.map((score, index) => ([heatData.seriesName, score, heatData.time[index]]))
      )

      setCollectionsHeatTrendData({
        collections,
        chartData: [
          ['collection', 'heat', 'time'],
          ...map
        ]
      })
    }
  }, [heatDataList])

  useEffect(() => {
    // const collectionInfos: CollectionInfo[] = (require('../../assets/mock/valuation-collections') as CollectionInfo[])

    /*setAllWhitelistCollections(collectionInfos.map(o => ({
      added: '2021/04/30',
      avgPriceIn7Days: '90.20ETH',
      estimatedMarketCap: '901,890.68ETH',
      name: o.seriesName,
      ownerProportion: 30.01,
      owners: 3001,
      salesAllTime: 16245,
      salesIn7Days: 823,
      totalSupply: 9999,
      volumeAllTime: '466,215.12 ETH',
      volumeIn7Days: '85,233.03ETH',
      iconUrl: o.seriesLogo
    })))

    setFeatureAddedWhitelistCollections(collectionInfos)*/

  }, [heatDataList])

  return {
    allWhitelistCollections: rankingCollections ?? [],
    featureAddedWhitelistCollections: whitelistCollections ?? [],
    collectionsHeatTrendData,
    currencyMarketValue,
    nftMarketTotalValuation
  }
}

export {
  useValuationOverviewData
}
