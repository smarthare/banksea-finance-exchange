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
    setAllWhitelistCollections([
      {
        added: '2021/04/30',
        avgPriceIn7Days: '90.20ETH',
        estimatedMarketCap: '901,890.68ETH',
        name: 'CryptoPunks',
        ownerProportion: 30.01,
        owners: 3001,
        salesAllTime: 16245,
        salesIn7Days: 823,
        totalSupply: 9999,
        volumeAllTime: '466,215.12 ETH',
        volumeIn7Days: '85,233.03ETH',
        iconUrl: 'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s120'
      },
      {
        added: '2021/04/30',
        avgPriceIn7Days: '90.20ETH',
        estimatedMarketCap: '901,890.68ETH',
        name: 'Bored Ape YC',
        ownerProportion: 30.01,
        owners: 3001,
        salesAllTime: 16245,
        salesIn7Days: 823,
        totalSupply: 9999,
        volumeAllTime: '399,104,84ETH',
        volumeIn7Days: '85,233.03ETH',
        iconUrl: 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s120'
      },
      {
        added: '2021/04/30',
        avgPriceIn7Days: '90.20ETH',
        estimatedMarketCap: '901,890.68ETH',
        name: 'Meebits',
        ownerProportion: 30.01,
        owners: 3001,
        salesAllTime: 16245,
        salesIn7Days: 823,
        totalSupply: 9999,
        volumeAllTime: '399,104,84ETH',
        volumeIn7Days: '85,233.03ETH',
        iconUrl: 'https://lh3.googleusercontent.com/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpGyHBd8Gq3h4mykK5Enj8pxqOUorgD2PfIWcVj9ugvu8l0=s120'
      },
      {
        added: '2021/04/30',
        avgPriceIn7Days: '90.20ETH',
        estimatedMarketCap: '901,890.68ETH',
        name: 'Mutant Ape Yacht Club',
        ownerProportion: 30.01,
        owners: 3001,
        salesAllTime: 16245,
        salesIn7Days: 823,
        totalSupply: 9999,
        volumeAllTime: '399,104,84ETH',
        volumeIn7Days: '85,233.03ETH',
        iconUrl: 'https://lh3.googleusercontent.com/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI=s120'
      }
    ])

    setFeatureAddedWhitelistCollections(require('../../assets/mock/valuation-collections'))
  }, [])

  return {
    allWhitelistCollections,
    featureAddedWhitelistCollections
  }

}

export {
  useValuationOverviewData
}
