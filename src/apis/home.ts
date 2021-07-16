import banksyRequest, { BanksyApiResponse } from '../utils/banksyRequest'

export function NftHomeCreateData() {
  return banksyRequest.get<BanksyApiResponse<any>>('/home/count')
}
