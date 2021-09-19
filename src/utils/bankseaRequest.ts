import axios from 'axios'

const bankseaRequest = axios.create({
  baseURL: 'https://banksea.finance/api/nft/web/v1',
  timeout: 20000
})

bankseaRequest.interceptors.request.use(config => {
  return config
})

export type BankseaApiResponse<T> = {
  code: number
  data: T
  message: string
  success: boolean
}

export type BankseaApiPagingData<T> = {
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

export default bankseaRequest
