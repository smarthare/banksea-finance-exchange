import { WhitelistCollection } from '../../pages/Valuation/components/AllWhitelistCollections'
import { useEffect, useState } from 'react'
import { CollectionInfo } from '../../types/CollectionValuation'
import LifeExpectancyTable from '../../assets/mock/collections-heat-trend.json'
import { AllNFTValuationChartData } from '../../pages/Valuation/components/charts/AllNFTValuationChart'

type ValuationPageData = {
  allWhitelistCollections: WhitelistCollection[]
  featureAddedWhitelistCollections: CollectionInfo[]
  collectionsHeatTrendData: any
  allNftValuationData?: AllNFTValuationChartData
}

const useValuationOverviewData = (): ValuationPageData => {
  const [allWhitelistCollections, setAllWhitelistCollections] = useState<WhitelistCollection[]>([])
  const [featureAddedWhitelistCollections, setFeatureAddedWhitelistCollections] = useState<CollectionInfo[]>([])
  const [collectionsHeatTrendData, setCollectionsHeatTrendData] = useState<any>()
  const [allNftValuationData, setAllNftValuationData] = useState<AllNFTValuationChartData>()

  useEffect(() => {
    const collectionInfos: CollectionInfo[] = (require('../../assets/mock/valuation-collections') as CollectionInfo[])

    setAllWhitelistCollections(collectionInfos.map(o => ({
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

    setFeatureAddedWhitelistCollections(collectionInfos)

    setCollectionsHeatTrendData(LifeExpectancyTable)

    setAllNftValuationData({
      eth: [1791, 1965, 1885, 1966, 2390, 2430, 2520],
      time: ['24 Aug 2021', '25 Aug 2021', '26 Aug 2021', '27 Aug 2021', '28 Aug 2021', '29 Aug 2021', '30 Aug 2021'],
      usd: [820, 932, 901, 934, 1290, 1330, 1320],
    })
  }, [])

  return {
    allWhitelistCollections,
    featureAddedWhitelistCollections,
    collectionsHeatTrendData,
    allNftValuationData
  }
}

export {
  useValuationOverviewData
}
