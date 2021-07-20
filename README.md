
# Banksy Finance Dapp. 

# Features

## How we use IPFS & Filecoin in our application

![image](https://user-images.githubusercontent.com/18243292/126262947-157c4ba2-2a84-49fe-8d68-cd14d0e30f04.png)

![image](https://user-images.githubusercontent.com/18243292/126262910-7204cd33-9693-4263-9a4c-4bd35631955b.png)

In current version, in order to create NFT in Banksy Finance dAPP, users need to post the artwork source file of NFT(
maybe images, videos, etc.) onto IPFS by first. Then as the result, the IPFS hash will be returned to dAPP, so that we
can piece it together with the basic information of NFT into metadata.

Code snippet in NFT creation procedure:

```ts
const nftMetadata = generateNftMetadata(nftCreateForm)

const pinResult = await pinJsonToIPFS(nftMetadata).catch(e => {
  const error = e.response?.data?.error ?? e?.toString() ?? 'unknown error'
  ee.emit('json_pinned_failed', error)
})

const { IpfsHash } = pinResult

const tokenUri = getUriByIpfsHash(IpfsHash)
```

As we look ahead, we have planned more and more business associated Filecoin IPFS.
Hopefully, we can create more powerful, secure and reliable projects with the help of Filecoin & IPFS.

# Multi-chains support

A decentralized NFT financial hub that will provide a NFT cross-platform ecosystem. 
- Ethereum 
- Solana 
- Polkadot 
- Binance 
- EOS 
- Tron