import { WhitelistCollection } from '../../pages/Valuation/components/AllWhitelistCollections'
import { FeatureAddedWhitelistCollection } from '../../pages/Valuation/components/FeatureAddedWhitelistCollections'
import { useEffect, useState } from 'react'

type ValuationPageData = {
  allWhitelistCollections: WhitelistCollection[]
  featureAddedWhitelistCollections: FeatureAddedWhitelistCollection[]
}

const useValuationOverviewData = (): ValuationPageData => {
  const [allWhitelistCollections, setAllWhitelistCollections] = useState<WhitelistCollection[]>([])
  const [featureAddedWhitelistCollections, setFeatureAddedWhitelistCollections] = useState<FeatureAddedWhitelistCollection[]>([])

  useEffect(() => {
    setAllWhitelistCollections(new Array<WhitelistCollection>(60).fill({
      added: '2021/04/30',
      avgPriceIn7Days: '90.20ETH',
      estimatedMarketCap: '901,890.68ETH',
      index: 0,
      name: 'CryptoPunks',
      ownerProportion: 30.01,
      owners: 3001,
      salesAllTime: 16245,
      salesIn7Days: 823,
      totalSupply: 9999,
      volumeAllTime: '399,104,84ETH',
      volumeIn7Days: '85,233.03ETH',
      iconUrl: 'https://pbs.twimg.com/profile_images/630765282219438080/d8kY-ecm_400x400.png'
    }))

    setFeatureAddedWhitelistCollections(new Array<FeatureAddedWhitelistCollection>(4).fill({
      added: '24 Jul 2021',
      description: 'The genesis collection "Muttniks" by Cosmic Paws celebrates the legacy and sacrifice of the first dogs to fly into space. our bespoke platform allows collectors to interact directly with our random generator where they mint...',
      coverUrl: 'https://pbs.twimg.com/profile_banners/62418232/1497877318/1500x500',
      avatarUrl: 'https://pbs.twimg.com/profile_images/630765282219438080/d8kY-ecm_400x400.png',
      name: 'Muttniks',
      owner: 0,
      volume: 0
    }))
  }, [])

  return {
    allWhitelistCollections,
    featureAddedWhitelistCollections
  }

}

export {
  useValuationOverviewData
}
