import axios from 'axios'

const banksyTestRequest = axios.create({
  baseURL: 'https://gaolingtech.com/banksy/nft/web/v1',
  timeout: 10000
})

banksyTestRequest.interceptors.request.use(config => {
  return config
})

export default banksyTestRequest
