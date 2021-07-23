import { SellingOrder } from '../../BanksyWeb3/contracts/ethereum/services/exchange/types'
import banksyRequest, { BanksyApiResponse } from '../../utils/banksyRequest'

export function sellOrder(data: SellingOrder) {
  return banksyRequest.post<BanksyApiResponse<any>>('/transfer/order/create', data)
}

export function completeOrder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/transfer/order/complete', data)
}

export function chooseOrder(data: any) {
  return banksyRequest.post<BanksyApiResponse<any>>('/transfer/order/select', data)
}
