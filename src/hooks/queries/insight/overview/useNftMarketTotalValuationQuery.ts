import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

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
  createTime: number
}

export const useNftMarketTotalValuationQuery = (): UseQueryResult<NftMarketTotalValuation> => {
  return useQuery(
    ['NFT_MARKET_TOTAL_VALUATION_QUERY'],
    () => {
      return bankseaRequest
        .get<BankseaApiResponse<NftMarketTotalValuation>>('/oracle/ticker/nft')
        .then(r => r.data.data)
    }
  )
}
