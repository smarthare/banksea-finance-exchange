import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { NFTValuationData } from '../../types/NFTValuation'

const useNFTValuationData = (collection: string, tokenId: number): NFTValuationData => {
  const [data, setData] = useState<NFTValuationData>({
    properties: [],
    imageUrl: '',
    tokenId: 0,
    unit: 'ETH',
    valuation: '',
    valuationInUSD: '',
    marketData: {
      askingPrice: '',
      askingPriceInUsd: '',
      askingPriceOverValuation: '',
      askingPriceOverValuationInUsd: '',
      askingPriceOverValuationRate: '',
      lastSale: '',
      lastSaleInUsd: '',
      lastSaleTime: '',
      bids: '',
      bidsInUsd: '',
      bidsOverValuation: '',
      bidsOverValuationInUsd: '',
      bidsOverValuationRate: ''
    },
    changesData: [],
    valuationHistory: {
      data: [],
      analyze: {
        priceVolatilityPercent: '',
        heatRank: -1,
        turnoverRatePercent: ''
      }
    },
    transactionHistories: []
  })

  useEffect(() => {
    setData({
      imageUrl: 'https://lh3.googleusercontent.com/tlmoxN7phyuRcGZLqb8NIHrHHS2M2ceQF8IhqZu7pXFQp2HyYbAh4zViNfQudoBAWaWk3JSBK24rpy6WgUJGmjd92w=w600',
      tokenId,
      unit: 'ETH',
      valuation: '97.61',
      valuationInUSD: '317,155',
      properties: [
        { key: 'Type', value: 'Female' },
        { key: 'Skin Tone', value: 'Darker' },
        { key: 'Mouth', value: 'Hot Lipstick' },
        { key: 'Head wear', value: 'Pilot Helmet' },
        { key: 'Smoking', value: 'Device' }
      ],
      marketData: {
        askingPrice: '555.00',
        askingPriceInUsd: '$1,803,262',
        askingPriceOverValuation: '+457.39',
        askingPriceOverValuationInUsd: '1,486,107',
        askingPriceOverValuationRate: '+468.57',
        lastSale: '2.50',
        lastSaleInUsd: '$234',
        lastSaleTime: '3 years ago',
        bids: '0.48',
        bidsInUsd: '$1,560',
        bidsOverValuation: '-97.13',
        bidsOverValuationInUsd: '-315,595',
        bidsOverValuationRate: '-99.51'
      },
      changesData: [
        {
          type: 'Ethereum',
          fromYesterdayPercent: new BigNumber('11.40'),
          last7DaysPercent: new BigNumber('49.89'),
          last30DaysPercent: new BigNumber('-49.89')
        },
        {
          type: 'USD',
          fromYesterdayPercent: new BigNumber('11.40'),
          last7DaysPercent: new BigNumber('49.89'),
          last30DaysPercent: new BigNumber('-49.89')
        },
      ],
      valuationHistory: {
        data: [],
        analyze: {
          priceVolatilityPercent: '25.11',
          heatRank: 2,
          turnoverRatePercent: '49.55'
        }
      },
      transactionHistories: new Array(10).fill({}).map((_, index) => ({
        date: `${index} days ago`,
        fromAddr: '0x4977...2355',
        toAddr: '0x1855...ae86',
        type: 'Bid',
        value: (0.48 * index).toString(),
        valueInUsd: '1,231',
        valueUnit: 'ETH'
      }))
    })

  }, [collection, tokenId])


  return data
}

export {
  useNFTValuationData
}
