import banksyRequest, { BanksyApiResponse } from '../utils/banksyRequest'

export function aiGeneratorFastStyle(style: string, content: string) {
  const data = new FormData()
  data.set('style', style)
  data.set('content', content)

  return banksyRequest.post(
    '/aiGenerators/fastStyle/url', data, {
      headers: {
        contentType: 'multipart/form-data'
      },
      timeout: 60000
    })
}

export function aiStyleList() {
  return banksyRequest.get<BanksyApiResponse<any>>('/aiGenerators/style/list')
}

export function aiSwiperList() {
  return banksyRequest.get<BanksyApiResponse<any>>('/aiGenerators/slideshow')
}
