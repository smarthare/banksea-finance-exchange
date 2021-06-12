import banksyRequest from '../utils/banksyRequest'

// @ts-ignore
export function aiGeneratorFastStyle(style: string, content: string) {
  const data = new FormData()
  data.set('style', style)
  data.set('content', content)

  return banksyRequest.post(
    '/nft/web/v1/aiGenerators/fastStyle/url', data, {
      headers: {
        contentType: 'multipart/form-data'
      },
      timeout: 60000
    })
}
