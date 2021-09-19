import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export interface WhitelistCollection {
  id: string
  seriesName: string
  seriesLogo: string
  seriesSlug: string
  seriesPoster: string
  createdTime: string
  seriesDescription: string
  seriesWebsite: any
  seriesLink: string
  seriesDiscord: string
  seriesTwitter: any
  totalSupply: string
  marketCap: number
  numOwners: string
  totalVolume: number
}

export const useWhitelistCollectionsQuery = (): UseQueryResult<WhitelistCollection[]> => {
  return useQuery(
    ['WHITELIST_COLLECTIONS'],
    async () => {
      return await bankseaRequest
        .get<BankseaApiResponse<WhitelistCollection[]>>('/oracle/whitelist/posters')
        .then(r => r.data.data)
    }
  )
}
