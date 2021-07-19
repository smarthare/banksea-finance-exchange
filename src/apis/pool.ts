import banksyTestRequest from '../utils/banksyTestRequest'
import banksyRequest, { BanksyApiResponse } from '../utils/banksyRequest'

export function depositPoolsList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/deposit/pool/list', data)
}

export function mortgagePoolsList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/mortgage/pool/list', data)
}

export function depositPoolsDetail(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/deposit/pool/detail', data)
}

export function depositSize() {
  return banksyRequest.get<BanksyApiResponse<any>>('/pools/deposit/size/total')
}

export function mortgageSize() {
  return banksyRequest.get<BanksyApiResponse<any>>('/pools/mortgage/value/total')
}

export function marketSizeStatistics() {
  return banksyRequest.get<BanksyApiResponse<any>>('/pools/deposit/size')
}

export function mortgageConfirm(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/mortgage/confirm', data)
}

export function borrowConfirm(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/borrow/confirm', data)
}


export function dashboardUser(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/dashboard/user', data)
}

export function dashboardMortgageAvailable(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/dashboard/mortgage/available', data)
}

export function dashboardMortgageMortgaged(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/dashboard/mortgage/mortgaged', data)
}

export function dashboardMortgagePreorder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/dashboard/mortgage/preorder', data)
}

export function poolsConnect(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/connect', data)
}

export function liquidationList(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/mortgage/liquidation', data)
}

export function mortgageOpinion(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/mortgage/opinion', data)
}

export function depositPoolUser(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/pools/deposit/pool/user', data)
}
