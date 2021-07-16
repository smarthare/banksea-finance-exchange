import banksyRequest, { BanksyApiPagingData, BanksyApiResponse } from '../utils/banksyRequest'

type ChainType = 'Ethereum' | 'Solana'

export type BanksyNftListQueryParams = {
  current?: number,
  size?: number,
  searchKey?: string,
  sortType?: 'time_stamp',
  addressContract?: string
  group?: string
  transactionStatus?: 0 | 1
  typeChain: ChainType
}

export type BanksyPersonalNftListQueryParams = {
  addressOwner: string,
  typeChain: ChainType
  size?: number
  current?: number
  searchKey?: string
}

export type NftCreateForm = {
  uri: string
  addressCreate: string
  tokenId: string
  group: string
  feeRecipient: string
  fee: string
  nameArtist: string
  typeChain: ChainType
  supply?: number
}

export function createNFT(data: NftCreateForm) {
  return banksyRequest.post<BanksyApiResponse<any>>('/create/uri', data)
}

export function banksyNftList(data: BanksyNftListQueryParams) {
  return banksyRequest.post<BanksyApiResponse<BanksyApiPagingData<any>>>('/query/list', data)
}

export function banksyNftDetail(data: { uri?: string, contractAddress?: string }) {
  return banksyRequest.post<BanksyApiResponse<any>>('/query/detail', data)
}

export function personalNftList(data: BanksyPersonalNftListQueryParams) {
  return banksyRequest.post<BanksyApiResponse<any>>('/zone/nft/list', data)
}

export function setNftFavorite(uri: string) {
  return banksyRequest.get<BanksyApiResponse<any>>(`/view/favorite/${uri}`)
}

export function getNftFavoriteCount(uri: any) {
  return banksyRequest.get<BanksyApiResponse<any>>(`/view/info/${uri}`)
}
