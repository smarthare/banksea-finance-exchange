import axios from 'axios'

const banksyRequest = axios.create({
  baseURL: 'http://43.129.189.139/api/banksy/nft/web/v1',
  timeout: 10000
})

banksyRequest.interceptors.request.use(config => {
  return config
})

export type BanksyApiResponse<T> = {
  code: number
  data: T
  message: string
  success: boolean
}

export type BanksyApiPagingData<T> = {
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  orders: Array<any>
  pages: number
  records: Array<T>
  searchCount: boolean
  size: number
  total: number
}

export default banksyRequest
