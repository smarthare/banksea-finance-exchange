import banksyRequest from './banksyRequest'
import banksyTestRequest from './banksyTestRequest'
import { SellingOrder } from '../BanksyWeb3/contracts/ethereum/services/exchange/types'

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
  return banksyRequest.post<BanksyApiResponse<BanksyApiPagingData<any>>>('/query/list', data)
}

export function banksyNftDetail(data: { uri?: string, contractAddress?: string }) {
  return banksyRequest.post<BanksyApiResponse<any>>('/query/detail', data)
}

export function personalNftList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/zone/nft/list', data)
}

export function NftHomeCreateData() {
  return banksyRequest.get<BanksyApiResponse<any>>('/home/count')
}

export function createNFT(data: { uri: string, addressCreate: string, tokenId: string, group: string }) {
  return banksyRequest.post<BanksyApiResponse<any>>('/create/uri', data)
}

export function sellOrder(data: SellingOrder) {
  return banksyRequest.post<BanksyApiResponse<any>>('/transfer/order/create',data)
}

export function chooseOrder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/transfer/order/select',data)
}

export function aiStyleList() {
  return banksyRequest.get<BanksyApiResponse<any>>('/aiGenerators/style/list')
}

export function aiSwiperList() {
  return banksyRequest.get<BanksyApiResponse<any>>('/aiGenerators/slideshow')
}

export function NftFavorite(uri: any) {
  return banksyRequest.get<BanksyApiResponse<any>>(`/view/favorite/${uri}`)
}

export function NftDetailFavorite(uri: any) {
  return banksyRequest.get<BanksyApiResponse<any>>(`/view/info/${uri}`)
}

export function completeOrder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/transfer/order/complete', data)
}

export function voteCreate(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/vote/form/filecoin', data)
}

export function filecoinList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/vote/query/filecoin', data)
}

export function solanaList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/vote/query/solana', data)
}

export function retweetCreat(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/vote/form/retweet', data)
}

export function retweetList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/vote/list/retweet', data)
}

export function depositPoolsList(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/deposit/pool/list', data)
}

export function mortgagePoolsList(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/mortgage/pool/list', data)
}

export function depositPoolsDetail(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/deposit/pool/detail', data)
}

export function depositSize() {
  return banksyTestRequest.get<BanksyApiResponse<any>>('/pools/mortgage/value/total')
}

export function mortgageSize() {
  return banksyTestRequest.get<BanksyApiResponse<any>>('/pools/mortgage/value/total')
}

