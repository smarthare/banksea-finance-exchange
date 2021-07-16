import banksyTestRequest from '../utils/banksyTestRequest'
import { BanksyApiResponse } from '../utils/banksyRequest'

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
  return banksyTestRequest.get<BanksyApiResponse<any>>('/pools/deposit/size/total')
}

export function mortgageSize() {
  return banksyTestRequest.get<BanksyApiResponse<any>>('/pools/mortgage/value/total')
}

export function marketSizeStatistics() {
  return banksyTestRequest.get<BanksyApiResponse<any>>('/pools/deposit/size')
}

