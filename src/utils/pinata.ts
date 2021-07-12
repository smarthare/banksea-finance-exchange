import request from './request'

export const PinataApiKey = process.env.REACT_APP_PINATA_API_KEY!
export const PinataApiSecret = process.env.REACT_APP_PINATA_API_SECRET!
// const jwt = process.env.REACT_APP_PINATA_JWT

export type PinataResult = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

function pinFileToIPFS(file: any) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

  const data = new FormData()
  data.append('file', file)

  // @ts-ignore
  const boundary = data._boundary

  const config = {
    headers: {
      'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      pinata_api_key: PinataApiKey,
      pinata_secret_api_key: PinataApiSecret
    }
  }

  return request.post<PinataResult>(url, data, config)
}

async function pinJsonToIPFS(data: any): Promise<PinataResult> {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'

  // const boundary = data._boundary

  const config = {
    headers: {
      // 'Content-Type': `multipart/form-data; boundary= ${boundary}`,
      'Content-Type': 'application/json',
      pinata_api_key: PinataApiKey,
      pinata_secret_api_key: PinataApiSecret
    }
  }

  const result = await request.post<PinataResult>(url, data, config)
  return result.data
}

function getPinataUriByIpfsHash(ipfsHash: string) {
  const gateway = 'https://banksy.mypinata.cloud'

  return `${gateway}/ipfs/${ipfsHash}`

}

export { pinFileToIPFS, pinJsonToIPFS, getPinataUriByIpfsHash }
