import { SellingOrder } from '@/BankseaWeb3/contracts/ethereum/services/exchange/types'
import bankseaRequest, { BankseaApiResponse } from '../../utils/bankseaRequest'

export function sellOrder(data: SellingOrder) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/transfer/order/create', data)
}

export function completeOrder(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/transfer/order/complete', data)
}

export function chooseOrder(data: any) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/transfer/order/select', data)
}
