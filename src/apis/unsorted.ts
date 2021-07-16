import banksyRequest, { BanksyApiResponse } from '../utils/banksyRequest'

export function voteCreate(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/vote/form/filecoin', data)
}

export function fileCoinList(data: any) {
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
