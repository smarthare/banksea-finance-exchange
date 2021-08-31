import { useEffect, useState } from 'react'

import Energy from '../../assets/mock/energy.json'
import LifeExpectancyTable from '../../assets/mock/life-expectancy-table.json'

export type CollectionExternalLink = {
  name: string
  url: string
  iconUrl: string
}

export type CollectionValuationChartData = {
  heatTrend?: any
  priceScatter?: any
  totalMarketValue?: any
  tradeFlow?: any
}

export type CollectionValuationByTypeAndAttribute = {
  prevailingTrend: number
  accessory: string
  number: number
  valuation: string
  average: string
}

export type CollectionValuationStatisticItem = { key: string, value: string }

export type CollectionToken = {
  index: number
  owner: string
  imageUrl: string
  tokenId: number
}

export type CollectionValuationData = {
  name: string
  externalLinks: CollectionExternalLink[]
  description: string
  statistic: CollectionValuationStatisticItem[]
  chartData: CollectionValuationChartData
  valuations: CollectionValuationByTypeAndAttribute[]
  tokens: CollectionToken[]
}

const useCollectionValuationData = (name: string): CollectionValuationData => {
  const [data, setData] = useState<CollectionValuationData>({
    statistic: [],
    externalLinks: [],
    description: '',
    name: '',
    chartData: {},
    valuations: [],
    tokens: [],
  })

  useEffect(() => {
    const priceScatter = []
    for (let i = 0; i < 300; i++) {
      const fromDay = new Date(2021, 8 - 1, 1)  // 2021/8/1
      priceScatter.push(
        [new Date(fromDay.setDate(fromDay.getDate() + i / 15)), Math.random() * i * 10000]
      )
    }

    const totalMarketValue = {
      date: [''],
      data: [0.0]
    }
    let base = +new Date(2021, 1 - 1, 1)
    const oneDay = 24 * 3600 * 1000
    for (let i = 1; i < 365; i++) {
      const now = new Date(base += oneDay)
      totalMarketValue.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
      totalMarketValue.data.push(Math.random() * 20)
    }

    setData({
      name,
      externalLinks: [
        {
          name: 'Website',
          url: 'https://www.larvalabs.com/cryptopunks',
          iconUrl: require('../../assets/images/commons/website.png').default
        },
        {
          name: 'Discord',
          url: 'https://www.larvalabs.com/cryptopunks',
          iconUrl: require('../../assets/images/commons/discord.png').default
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/larvalabs',
          iconUrl: require('../../assets/images/commons/twitter.png').default
        }
      ],
      description: 'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.',
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
        heatTrend: LifeExpectancyTable,
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
