import { NFTCreateForm } from '../../../pages/Home/NFTCreate'
import { BanksyWeb3Services, PurchaseByFixedPriceParams } from '../index'
import SimpleEventEmitter from '../../../utils/SimpleEventEmitter'
import { CreateNftEvents } from '../events'
import { generateNftMetadata } from '../../../utils'
import { pinJsonToIPFS } from '../../../utils/ipfs'
import { createNFT } from '../../../apis/nft'
import { createNftAccount } from './create'
import { createExchange, findUserAccount, processExchange } from './exchange'
import { banksyWeb3 } from '../../index'
import { PublicKey } from '@solana/web3.js'
import { completeExchange, createExchangeInfo, getExchangeInfo } from '../../../apis/exchange/solana'
import { NftDetail } from '../../../types/NFTDetail'
import {
  getTokenAccountWithMaximumBalance,
  getTokenSupply,
  MapSolanaTokenNameToMint,
  SupportedSolanaTokenName
} from './utils'
import BigNumber from 'bignumber.js'
import { toBigNumber } from '../../../web3/utils'


/*type SolanaNftAccountInfo = {
  authority: PublicKey
  uri: string
  supply: BN
}

async function getNftAccountInfo(nftAccount: Address): Promise<SolanaNftAccountInfo>  {
  const program = banksyWeb3.sol.Banksy!
  return ( await program.account.nftAccount.fetch(nftAccount) as SolanaNftAccountInfo)
}*/

export class BanksyWeb3SolanaServicesImpl implements BanksyWeb3Services {

  createNft(nftCreateForm: NFTCreateForm, account: string): SimpleEventEmitter<CreateNftEvents> {
    const ee = new SimpleEventEmitter<CreateNftEvents>()

    ee.task = async () => {
      const nftMetadata = generateNftMetadata(nftCreateForm)

      ee.emit('pinning_json')

      const pinResult = await pinJsonToIPFS(nftMetadata).catch(e => {
        const error = e.response?.data?.error ?? e?.toString() ?? 'unknown error'
        ee.emit('json_pinned_failed', error)
      })

      if (!pinResult) {
        return
      }

      ee.emit('json_pinned')

      const { IpfsHash } = pinResult

      ee.emit('submitted')

      createNftAccount(IpfsHash)
        .then(async ({ userAccountPubKey, nftPubKey, transactionStatus }) => {
          await transactionStatus
          return { userAccountPubKey, nftPubKey }
        })
        .then(async ({ userAccountPubKey, nftPubKey }) => {
          await createNFT({
            uri: IpfsHash,
            addressCreate: account,
            tokenId: '',
            group: '',
            nameArtist: nftCreateForm.artistName,
            fee: '',
            feeRecipient: '',
            typeChain: 'Solana',
            supply: 1,
            nftPubKey,
            accountOwner: userAccountPubKey
          })
          ee.emit('complete')
        })
        .catch(e => {
          ee.emit('wallet_error', e)
        })
    }

    return ee
  }

  async listByFixedPrice(nftDetail: NftDetail, price: string) {
    // const ee = new SimpleEventEmitter<any>()
    // ee.task = async () => {
    // }
    // return ee

    const mint = MapSolanaTokenNameToMint['USDC']

    const tokenSupply = await getTokenSupply({ mint })

    const { tokenAccount } = await getTokenAccountWithMaximumBalance('USDC')

    const exchange = await createExchange(
      banksyWeb3.sol.Exchange!,
      banksyWeb3.sol.Banksy!,
      new PublicKey(nftDetail.nftPubKey!),
      1,
      mint,
      new BigNumber(price).multipliedBy(new BigNumber(10).pow(tokenSupply.decimals)).toString(),
      tokenAccount?.pubkey
    )
    console.log('exchange created: ', exchange.toBase58())

    await createExchangeInfo({
      exchangePubKey: exchange.toBase58(),
      nftPrice: price,
      nftPubKey: nftDetail.nftPubKey
    })
  }

  async checkBalance(nftDetail: NftDetail): Promise<void> {
    // TODO: mock
    // const tokenName = nftDetail.makerPriceUnit
    const tokenName = 'USDC'

    if (!MapSolanaTokenNameToMint[tokenName as SupportedSolanaTokenName]) {
      return Promise.reject(`Invalid token name: ${tokenName}`)
    }

    const { tokenAmount } = await getTokenAccountWithMaximumBalance(tokenName)

    if (!tokenAmount) {
      return Promise.reject(`Could find any account of ${tokenName} about your wallet`)
    }

    const realBalance = new BigNumber(tokenAmount.amount).dividedBy(new BigNumber('10').pow(tokenAmount.decimals))

    if (realBalance.gte(toBigNumber(nftDetail.price))) {
      return Promise.resolve()
    } else {
      return Promise.reject('Insufficient balance')
    }
  }

  async purchaseByFixedPrice({ nftDetail, account, onSuccess }: PurchaseByFixedPriceParams) {
    const exchangePubKey = (await getExchangeInfo(nftDetail.nftPubKey)).data.data.exchangePubKey

    const exchangeAccount: any = await banksyWeb3.sol.Exchange!.account.exchange.fetch(exchangePubKey) // get exchange data

    const {  currency } = exchangeAccount
    console.log('currency', currency.toBase58())

    const { tokenAccount } = await getTokenAccountWithMaximumBalance('USDC')
    const currencyHolder = tokenAccount!.pubkey
    console.log('currencyHolder', currencyHolder.toBase58())

    const itemReceiver = await findUserAccount(banksyWeb3.sol.Banksy!, new PublicKey(account), exchangeAccount.item)
    console.log('itemReceiver', itemReceiver.toBase58())

    await processExchange(exchangePubKey, exchangeAccount, itemReceiver, currencyHolder)

    await completeExchange({
      accountTo: itemReceiver.toBase58(),
      addressTo: banksyWeb3.sol.provider!.wallet.publicKey.toBase58(),
      nftPubKey: nftDetail.nftPubKey
    })

    onSuccess()
  }

}
