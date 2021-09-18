import banksyRequest, { BanksyApiPagingData, BanksyApiResponse } from '@/utils/banksyRequest'
import { NftDetail, NftListItem } from '@/types/NFTDetail'

export type ChainType = 'Ethereum' | 'Solana' | ''

export type BanksyNftTransactionStatus = 0 | 1

export type BanksyNftListQueryParams = {
  current?: number,
  size?: number,
  searchKey?: string,
  sortType?: 'time_stamp',
  addressContract?: string
  group?: string
  transactionStatus?: BanksyNftTransactionStatus
  typeChain: ChainType
}

export type BanksyPersonalNftListQueryParams = {
  addressOwner: string,
  typeChain?: ChainType
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

  // Below 3 is Solana-specific fields
  supply?: number
  accountOwner?: string
  nftPubKey?: string
}

export type NftDetailQueryRequest = {
  uri: string
  contractAddress?: string
}

export function createNFT(data: NftCreateForm) {
  return banksyRequest.post<BanksyApiResponse<any>>('/create/uri', data)
}

export function banksyNftList(data: BanksyNftListQueryParams) {
  return banksyRequest.post<BanksyApiResponse<BanksyApiPagingData<NftListItem>>>('/query/list', data)
}

export function banksyNftDetail(data: NftDetailQueryRequest) {
  return banksyRequest.post<BanksyApiResponse<NftDetail>>('/query/detail', data)
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
