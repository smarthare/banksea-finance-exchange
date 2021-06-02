import banksyRequest from './banksyRequest'

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

export { banksyNftList, banksyNftDetail }
