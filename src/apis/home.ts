import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export function NftHomeCreateData() {
  return bankseaRequest.get<BankseaApiResponse<any>>('/home/count')
}
