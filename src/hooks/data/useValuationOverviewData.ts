import { WhitelistCollection } from '../../pages/Valuation/components/AllWhitelistCollections'
import { useEffect, useState } from 'react'
import { CollectionInfo } from '../../types/CollectionValuation'

type ValuationPageData = {
  allWhitelistCollections: WhitelistCollection[]
  // featureAddedWhitelistCollections: FeatureAddedWhitelistCollection[]
  featureAddedWhitelistCollections: CollectionInfo[]
}

const useValuationOverviewData = (): ValuationPageData => {
  const [allWhitelistCollections, setAllWhitelistCollections] = useState<WhitelistCollection[]>([])
  const [featureAddedWhitelistCollections, setFeatureAddedWhitelistCollections] = useState<CollectionInfo[]>([])

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
  }, [])

  return {
    allWhitelistCollections,
    featureAddedWhitelistCollections
  }

}

export {
  useValuationOverviewData
}
