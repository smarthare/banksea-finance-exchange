import axios from 'axios'

const banksyTestRequest = axios.create({
  baseURL: 'http://192.168.1.4:25566/nft/web/v1',
  timeout: 10000
})

banksyTestRequest.interceptors.request.use(config => {
  return config
})

export default banksyTestRequest
