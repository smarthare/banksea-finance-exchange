import axios from 'axios'

const banksyRequest = axios.create({
  baseURL: process.env.REACT_APP_BANKSY_API_URL,
  timeout: 10000
})

banksyRequest.interceptors.request.use(config => {
  return config
})

// banksyRequest.interceptors.response.use((response: AxiosResponse<BanksyApiResponse<any>>) => {
//   return response.data.data
// })

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
