import bankseaRequest from '@/utils/bankseaRequest'

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
  return bankseaRequest.post('/transfer/exchange/create', data)
}

export function getExchangeInfo(nftPubKey: string) {
  return bankseaRequest.post('/transfer/exchange/select', { nftPubKey })
}

export function cancelExchange(nftPubKey: string) {
  return bankseaRequest.post('/transfer/exchange/cancel', { nftPubKey })
}

export function completeExchange(data: CompleteExchangeRequest) {
  return bankseaRequest.post('/transfer/exchange/complete', data)
}
