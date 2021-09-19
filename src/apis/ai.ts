import bankseaRequest, { BankseaApiResponse } from '@/utils/bankseaRequest'

export function aiGeneratorFastStyle(style: string, content: string) {
  const data = new FormData()
  data.set('style', style)
  data.set('content', content)

  return bankseaRequest.post(
    '/aiGenerators/fastStyle/url', data, {
      headers: {
        contentType: 'multipart/form-data'
      },
      timeout: 60000
    })
}

export function aiStyleList() {
  return bankseaRequest.get<BankseaApiResponse<any>>('/aiGenerators/style/list')
}

export function aiSwiperList() {
  return bankseaRequest.get<BankseaApiResponse<any>>('/aiGenerators/slideshow')
}
