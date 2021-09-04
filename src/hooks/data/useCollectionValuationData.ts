import { useEffect, useState } from 'react'

import Energy from '../../assets/mock/transaction-flow.json'
import {
  CollectionInfo,
  CollectionToken,
  CollectionValuationByTypeAndAttribute,
  CollectionValuationData
} from '../../types/CollectionValuation'

const useCollectionValuationData = (name: string): CollectionValuationData => {
  const [data, setData] = useState<CollectionValuationData>({
    statistic: [],
    bannerImageUrl: '',
    externalLinks: [],
    description: '',
    name: '',
    chartData: {},
    valuations: [],
    tokens: []
  })

  useEffect(() => {
    const priceScatter = []
    for (let i = 0; i < 300; i++) {
      const fromDay = new Date(2021, 8 - 1, 1)  // 2021/8/1
      priceScatter.push(
        [new Date(fromDay.setDate(fromDay.getDate() + i / 15)).toLocaleDateString(), Math.random() * i * 10000]
      )
    }

    const totalMarketValue = {
      time: [''],
      value: [0.0]
    }
    let base = +new Date(2021, 1 - 1, 1)
    const oneDay = 24 * 3600 * 1000
    for (let i = 1; i < 365; i++) {
      const now = new Date(base += oneDay)
      totalMarketValue.time.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
      totalMarketValue.value.push(Math.random() * 20)
    }

    const collectionInfo: CollectionInfo = (require('../../assets/mock/valuation-collections') as CollectionInfo[]).filter(o => o.seriesName === name)[0]

    const {
      seriesWebsite, seriesTwitter, seriesDiscord, seriesDescription, seriesPoster
    } = collectionInfo

    setData({
      name,
      bannerImageUrl: seriesPoster,
      externalLinks: [
        {
          name: 'Website',
          url: seriesWebsite,
          iconUrl: require('../../assets/images/commons/website.png').default
        },
        {
          name: 'Discord',
          url: seriesDiscord,
          iconUrl: require('../../assets/images/commons/discord.png').default
        },
        {
          name: 'Twitter',
          url: seriesTwitter,
          iconUrl: require('../../assets/images/commons/twitter.png').default
        }
      ],
      description: seriesDescription,
      statistic: [
        { key: '7 Day Volume', value: '4,233.03 ETH' },
        { key: 'Total Volume', value: '4,233.03 ETH' },
        { key: 'Total Supply', value: '10,000' },
        { key: 'Owners', value: '3001' },
        { key: '7 Day Avg Price', value: '4,233.03 ETH' },
        { key: '7 Day Min Price', value: '4,233.03 ETH' },
        { key: 'Turnover Rate', value: '49.02%' }
      ],
      chartData: {
        tradeFlow: Energy,
        heatComposition: require('../../assets/mock/collection-heat-composition.json'),
        totalMarketValue,
        priceScatter
      },
      valuations: new Array<CollectionValuationByTypeAndAttribute>(4).fill({
        accessory: 'Pilot Helmet', average: '125.86 ETH ($408,645)', number: 199, prevailingTrend: 196, valuation: '35,995.36 ETH ($116.87M)'
      }),
      tokens: new Array<CollectionToken>(100).fill({
        imageUrl: 'https://lh3.googleusercontent.com/tlmoxN7phyuRcGZLqb8NIHrHHS2M2ceQF8IhqZu7pXFQp2HyYbAh4zViNfQudoBAWaWk3JSBK24rpy6WgUJGmjd92w=w600', index: 0, owner: 'DANNY SECURE', tokenId: 3100
      })
    })
  }, [name])

  return data
}

export {
  useCollectionValuationData
}
