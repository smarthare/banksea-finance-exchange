import axios from 'axios'

const banksyRequest = axios.create({
  baseURL: 'http://43.129.189.139:25566',
  timeout: 10000
})

banksyRequest.interceptors.request.use(config => {
  return config
})

export default banksyRequest
