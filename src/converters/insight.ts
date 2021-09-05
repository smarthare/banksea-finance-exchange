import { CollectionValuationDetail } from '../hooks/queries/insight/collection/useCollectionValuationDetailQuery'
import { CollectionExternalLink, CollectionValuationStatisticItem } from '../types/CollectionValuation'
import { numberWithCommas } from '../utils'

export function convertCollectionValuationDetailToCollectionExternalLinks(detail?: CollectionValuationDetail): CollectionExternalLink[] {
  if (!detail) {
    return []
  }

  const list: CollectionExternalLink[] = []

  if (detail.seriesTwitter) {
    list.push({
      iconUrl: require('../assets/images/commons/twitter.png').default,
      name: 'Twitter',
      url: detail.seriesTwitter
    })
  }

  if (detail.seriesDiscord) {
    list.push({
      iconUrl: require('../assets/images/commons/discord.png').default,
      name: 'Discord',
      url: detail.seriesDiscord
    })
  }

  if (detail.seriesWebsite) {
    list.push({
      iconUrl: require('../assets/images/commons/website.png').default,
      name: 'Website',
      url: detail.seriesWebsite
    })
  }

  return list
}

export function convertCollectionValuationDetailToCollectionValuationStatisticItems(detail?: CollectionValuationDetail): CollectionValuationStatisticItem[] {
  if (!detail) {
    return []
  }

  return [
    { key: '7 Day Volume', value: `${numberWithCommas(detail.sevenDayVolume)} ETH` },
    { key: 'Total Volume', value: `${numberWithCommas(detail.totalVolume)} ETH` },
    { key: 'Total Supply', value: `${numberWithCommas(detail.totalSupply)} ETH` },
    { key: 'Owners', value: detail.numOwners },
    { key: '7 Day Avg Price', value: `${numberWithCommas(detail.sevenDayAvgPrice)} ETH` },
    { key: 'Avg Price', value: `${numberWithCommas(detail.avgPrice)} ETH` },
    // { key: 'Turnover Rate', value: detail.turnoverRate }
  ]
}
