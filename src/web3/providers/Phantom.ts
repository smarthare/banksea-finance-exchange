import { PhantomProvider } from '../../types/Phantom'

const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

let provider: PhantomProvider | undefined
let retry = 4

export async function getPhantomProvider(): Promise<PhantomProvider | undefined> {
  if (provider) {
    return provider
  }

  while (retry--) {
    if ('solana' in window) {
      const { solana } = (window as any)
      if (solana.isPhantom/* && solana.publicKey*/) {
        retry = 4
        provider = solana
        return provider
      }
    } else {
      await sleep(1000)
    }
  }
}
