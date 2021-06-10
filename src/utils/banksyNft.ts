import banksyRequest from './banksyRequest'
import axios from 'axios'

function banksyNftList(data: any) {
  const url = '/nft/web/v1/query/list'

  const config = {
    headers: {
      // 'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      'Content-Type': 'application/json',
    }
  }

  return banksyRequest.post<any>(url, data, config)
}

function banksyNftDetail(data: any) {
  const url = '/nft/web/v1/query/detail'

  const config = {
    headers: {
      // 'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      'Content-Type': 'application/json',
    }
  }

  return banksyRequest.post<any>(url, data, config)
}

function createNFT(data: {uri: string, addressCreate: string, tokenId: string}) {
  axios.post('http://43.129.189.139:25566/nft/web/v1/create/uri', data)
}

export { banksyNftList, banksyNftDetail, createNFT }
