# Banksy Finance Dapp.

The first AI-driven NFT pool-based lending platform to lead a revolution of the NFT market.

## How we use IPFS & Filecoin in our application

![image](https://user-images.githubusercontent.com/18243292/126262947-157c4ba2-2a84-49fe-8d68-cd14d0e30f04.png)

In current version, we have a lot of features about Filecoin / IPFS:
- Originality Check:
  Banksy would extract all NFT attribute features to compose corresponding feature vectors,
  calculate NFT feature Hash value by the encryption algorithm,
  and carry out Originality Check for all created NFT. **All NFT hash data will be stored on IPFS.**

- AI-Assisted NFT Creation:
  Banksy uses an AI algorithm of image style migration to generate NFT of
  specified style and content to help artists create better and faster.
  **The NFT created by AI will be directly stored on IPFS and provide direct original retrieval.**

- NFT Creation Faced to Users:
  When user want to create a brand new NFT in our application, he/she firstly needs to post his/her artwork source file(
  maybe images, videos, etc.) onto IPFS. As the result, the IPFS hash of artwork source file will be returned to
  application, so that we can piece it together with the basic information of NFT into metadata. Finally, the metadata
  will be posted onto IPFS too.

- NFT Lending Pool:
  Based on the NAK agreement, Banksy built the NFT pool based lending platform to provide effective
  funds security for lenders and meet the needs of NFT holders and lenders.
  **Different types of user-related data will be stored directly on IPFS, and quick retrieval channels and friendly interaction methods will be established.**


Here is the code snippet in NFT creation procedure:

```ts
// .........

const nftMetadata = generateNftMetadata(nftCreateForm)

const pinResult = await pinJsonToIPFS(nftMetadata).catch(e => {
  const error = e.response?.data?.error ?? e?.toString() ?? 'unknown error'
  ee.emit('json_pinned_failed', error)
})

const { IpfsHash } = pinResult

const tokenUri = getUriByIpfsHash(IpfsHash)

// .........
```
As we look ahead, we have planned more and more business associated Filecoin / IPFS
like NFT global-network searching, NFT duplication checking, NFT AI valuation.

Besides, we are going to build our own Filecoin endpoint,
to provider data storing, searching, copyright protecting of NFT and other basic services.
Among them, the data content includes NFTs' attribute data, transaction data, creator data social data and so on.
This all contributes to the foundation of Filecoin's NFT infrastructure.

Hopefully, we can create more powerful, secure and reliable projects with the help of Filecoin & IPFS.

## Multi-chains support

- Ethereum
- Solana
- Polkadot
- Binance
- EOS
- Tron
