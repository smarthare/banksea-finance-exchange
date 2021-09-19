import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export function voteCreate(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/vote/form/filecoin', data)
}

export function fileCoinList(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/vote/query/filecoin', data)
}

export function solanaList(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/vote/query/solana', data)
}

export function retweetCreat(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/vote/form/retweet', data)
}

export function retweetList(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/vote/list/retweet', data)
}
