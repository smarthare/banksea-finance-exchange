import { useQuery, UseQueryResult } from 'react-query'
import banksyRequest, { BanksyApiResponse } from '../../../../utils/banksyRequest'

export interface NftMarketTotalValuation {
  nftMarketCapitalizationVoList: NftMarketCapitalization[]
  marketCapitalizationEth: number
  marketCapitalizationUsd: number
  createTime: number
  changeOneDay: number
}

export interface NftMarketCapitalization {
  id: string
  marketCapitalizationEth: number
  marketCapitalizationUsd: number
  createTime: string
}

export const useNftMarketTotalValuationQuery = (): UseQueryResult<NftMarketTotalValuation> => {
  return useQuery(
    ['NFT_MARKET_TOTAL_VALUATION_QUERY'],
    async () => {
      return await banksyRequest.get<BanksyApiResponse<NftMarketTotalValuation>>(
        '/oracle/ticker/nft')
        .then(r => r.data.data)
    }
  )
}
