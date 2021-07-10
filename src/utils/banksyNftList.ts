import banksyRequest from './banksyRequest'
import { SellingOrder } from '../BanksyWeb3/ethereum/services/exchange/types'

export type BanksyApiResponse<T> = {
  code: number
  data: T
  message: string
  success: boolean
}

export type BanksyApiPagingData<T> = {
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  orders: Array<any>
  pages: number
  records: Array<T>
  searchCount: boolean
  size: number
  total: number
}

export function banksyNftList(data: any) {
  return banksyRequest.post<BanksyApiResponse<BanksyApiPagingData<any>>>('/nft/web/v1/query/list', data)
}

export function banksyNftDetail(data: { uri?: string, contractAddress?: string }) {
  return banksyRequest.post<BanksyApiResponse<any>>('/nft/web/v1/query/detail', data)
}

export function personalNftList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/nft/web/v1/zone/nft/list', data)
}

export function NftHomeCreateData() {
  return banksyRequest.get<BanksyApiResponse<any>>('/nft/web/v1/home/count')
}

export function createNFT(data: { uri: string, addressCreate: string, tokenId: string, group: string }) {
  return banksyRequest.post<BanksyApiResponse<any>>('/nft/web/v1/create/uri', data)
}

export function sellOrder(data: SellingOrder) {
  return banksyRequest.post<BanksyApiResponse<any>>('/nft/web/v1/transfer/order/create',data)
}

export function chooseOrder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/nft/web/v1/transfer/order/select',data)
}

export function aiStyleList() {
  return banksyRequest.get<BanksyApiResponse<any>>('/nft/web/v1/aiGenerators/style/list')
}

export function aiSwiperList() {
  return banksyRequest.get<BanksyApiResponse<any>>('/nft/web/v1/aiGenerators/slideshow')
}

export function NftFavorite(uri: any) {
  return banksyRequest.get<BanksyApiResponse<any>>(`/nft/web/v1/view/favorite/${uri}`)
}

export function NftDetailFavorite(uri: any) {
  return banksyRequest.get<BanksyApiResponse<any>>(`/nft/web/v1/view/info/${uri}`)
}

export function completeOrder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('nft/web/v1/transfer/order/complete', data)
}

export function voteCreate(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('nft/web/v1/vote/form/filecoin', data)
}

export function filecoinList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('nft/web/v1/vote/query/filecoin', data)
}

export function solanaList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('nft/web/v1/vote/query/solana', data)
}

export function retweetCreat(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('nft/web/v1/vote/form/retweet', data)
}

export function retweetList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('nft/web/v1/vote/list/retweet', data)
}
