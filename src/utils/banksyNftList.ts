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

function personalNftList(data: any) {
  const url = '/nft/web/v1/zone/nft/list'

  const config = {
    headers: {
      // 'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      'Content-Type': 'application/json',
    }
  }

  return banksyRequest.post<any>(url, data, config)
}

function personalNftDetail(data: any) {
  const url = '/nft/web/v1/zone/nft/detail'

  const config = {
    headers: {
      // 'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      'Content-Type': 'application/json',
    }
  }

  return banksyRequest.post<any>(url, data, config)
}

function NftHomeCreateData() {
  const url = '/nft/web/v1/home/count'

  const config = {
    headers: {
      // 'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      'Content-Type': 'application/json',
    }
  }

  return banksyRequest.get<any>(url)
}


function createNFT(data: {uri: string, addressCreate: string, tokenId: string}) {
  axios.post('http://43.129.189.139:25566/nft/web/v1/create/uri', data)
}

export { banksyNftList, banksyNftDetail, createNFT, personalNftList, personalNftDetail, NftHomeCreateData }
