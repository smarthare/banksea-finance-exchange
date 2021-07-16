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

export function mortgageConfirm(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/mortgage/confirm', data)
}

export function borrowConfirm(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/borrow/confirm', data)
}


export function dashboardUser(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/dashboard/user', data)
}

export function dashboardMortgageAvailable(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/dashboard/mortgage/available', data)
}

export function dashboardMortgageMortgaged(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/dashboard/mortgage/mortgaged', data)
}

export function dashboardMortgagePreorder(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/dashboard/mortgage/preorder', data)
}

export function poolsConnect(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/connect', data)
}

export function liquidationList(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/mortgage/liquidation', data)
}

export function mortgageOpinion(data: any) {
  return banksyTestRequest.post<BanksyApiResponse<any>>('/pools/mortgage/opinion', data)
}
