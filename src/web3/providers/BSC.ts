import { providers } from 'ethers'
import { BscConnector, NoBscProviderError } from '@binance-chain/bsc-connector'

// @ts-ignore
export const BscWeb3Provider = async ({ chainId }) =>
  new Promise((resolve, reject) => {
    const bscConnector = new BscConnector({
      supportedChainIds: [chainId]
    })
    bscConnector.getProvider().then((provider: any) => {
      if (!provider) {
        setTimeout(async () => {
          provider = await bscConnector.getProvider()
          if (provider) {
            resolve(new providers.Web3Provider(provider))
          } else {
            reject(new NoBscProviderError())
          }
        }, 1500)
      } else {
        resolve(new providers.Web3Provider(provider))
      }
    })
  })
