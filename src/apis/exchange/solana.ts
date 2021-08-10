import banksyRequest from '../../utils/banksyRequest'

type CreateExchangeRequest = {
  nftPubKey: string
  exchangePubKey: string
  nftPrice: string
}

type CompleteExchangeRequest = {
  nftPubKey: string
  addressTo: string
  accountTo: string
}

export function createExchangeInfo(data: CreateExchangeRequest) {
  return banksyRequest.post('/transfer/exchange/create', data)
}

export function getExchangeInfo(nftPubKey: string) {
  return banksyRequest.post('/transfer/exchange/select', { nftPubKey })
}

export function cancelExchange(nftPubKey: string) {
  return banksyRequest.post('/transfer/exchange/cancel', { nftPubKey })
}

export function completeExchange(data: CompleteExchangeRequest) {
  return banksyRequest.post('/transfer/exchange/complete', data)
}
