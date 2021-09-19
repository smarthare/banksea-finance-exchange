import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export function depositPoolsList(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/deposit/pool/list', data)
}

export function mortgagePoolsList(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/mortgage/pool/list', data)
}

export function depositPoolsDetail(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/deposit/pool/detail', data)
}

export function depositSize() {
  return bankseaRequest.get<BankseaApiResponse<any>>('/pools/deposit/size/total')
}

export function mortgageSize() {
  return bankseaRequest.get<BankseaApiResponse<any>>('/pools/mortgage/value/total')
}

export function depositSizeStatistics() {
  return bankseaRequest.get<BankseaApiResponse<any>>('/pools/deposit/size')
}

export function mortgageConfirm(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/mortgage/confirm', data)
}

export function borrowConfirm(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/borrow/confirm', data)
}


export function dashboardUser(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/dashboard/user', data)
}

export function dashboardMortgageAvailable(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/dashboard/mortgage/available', data)
}

export function dashboardMortgageMortgaged(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/dashboard/mortgage/mortgaged', data)
}

export function dashboardMortgagePreorder(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/dashboard/mortgage/preorder', data)
}

export function poolsConnect(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/connect', data)
}

export function liquidationList(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/mortgage/liquidation', data)
}

export function mortgageOpinion(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/mortgage/opinion', data)
}

export function depositPoolUser(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/pools/deposit/pool/user', data)
}
