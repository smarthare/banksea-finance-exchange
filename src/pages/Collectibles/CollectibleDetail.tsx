import React, { useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'
import { Button, message, Table } from 'antd'
import Show from '@/assets/images/show.png'
import Favorite from '@/assets/images/favorite.png'
import Heart from '@/assets/images/like.png'
import { banksyNftDetail, chooseOrder, completeOrder, NftDetailFavorite } from '../../utils/banksyNftList'
import moment from 'moment'
import 'moment/locale/pt-br'
import copy from 'copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import more1 from '@/assets/images/detailMoreImg/more1.jpg'
import more2 from '@/assets/images/detailMoreImg/more2.png'
import more3 from '@/assets/images/detailMoreImg/more3.jpg'
import more4 from '@/assets/images/detailMoreImg/more4.png'
import { thumbnailAddress, useLocationQuery } from '../../utils'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { toWei } from '../../web3/utils'
import { ExchangeOrder, ExchangeOrderAsset } from '../../BanksyWeb3/ethereum/services/exchange/types'
import { hashExchangeOrder, hashExchangeOrderAsset } from '../../BanksyWeb3/ethereum/services/exchange/utils'
import { banksyWeb3 } from '../../BanksyWeb3'
import { ethers } from 'ethers'
import { usePurchaseCheckoutModal } from '../../hooks/modals/usePurchaseCheckoutModal'
import { usePurchaseBlockedModal } from '../../hooks/modals/usePurchaseBlockedModal'
import { usePurchaseAuthorizingModal } from '../../hooks/modals/usePurchaseAuthorizingModal'
import { usePurchaseSuccessModal } from '../../hooks/modals/usePurchaseSuccessModal'
import { useSellingModal } from '../../hooks/modals/useSellingModal'

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const BundleDetailContainer = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem 10rem;
  background: url(${require('../../assets/images/Banksy-Collectible-BG@2x.png').default}) no-repeat;
  background-size: 100%;
  position: relative;

  .operating {
    width: 100%;
    height: 7rem;
    position: relative;
  }
`

const LeftArea = styled.div`
  width: 35.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 1.3rem;

`

const TradingHistoryTable = styled(Table)`
  width: 100%;
  margin-top: 1.5rem;

  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .ant-table-thead > tr > th {
    background-color: #E0DDF6 !important;
  }


  .ant-table-thead .ant-table-cell {
    font-size: 14px;
    font-weight: 550;
    line-height: 20px;
    color: #7C6DEB !important;
  }

  .ant-table-tbody .ant-table-cell {
    font-size: 14px;
    color: #7C6DEB;
    line-height: 20px;
  }
`

const RightArea = styled.div`
  width: 53.9rem;
  margin-left: 1.3rem;
  position: relative;
`

const Operating = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  .edit {
    width: 15rem;
    height: 40px;
    border: 1px solid #7C6DEB;
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #7C6DEB;
    line-height: 2rem;
    position: absolute;
    right: 16rem;
  }

  .sell {
    width: 15rem;
    height: 40px;
    background: #7C6DEB;
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 2rem;
    position: absolute;
    right: 0;
  }
`

const PropertiesArea = styled.div`
  height: 28.8rem;
  width: 36rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2.1rem;
  overflow-y: scroll;

  .properties-group {
    width: 14.3rem;
    height: 9.1rem;
    background: #E0DDF6;
    border-radius: 0.5rem;
    border: 0.1rem solid #7C6DEB;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .properties-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .key {
      font-size: 1.4rem;
      font-weight: 550;
      color: #7C6DEB;
      line-height: 2rem;
      margin-top: 1.2rem;
    }

    .value {
      margin-top: 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #A196EF;
      line-height: 1.7rem;
    }

    .percent {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #A196EF;
      line-height: 1.7rem;
    }
  }
`

const CornerFlag = styled.div`
  position: absolute;
  color: white;
  top: -1rem;
  left: -0.45rem;
  font-width: 500;
  text-align: center;
  line-height: 3rem;
  width: 8.5rem;
  height: 3.7rem;
  background-image: url(${require('../../assets/images/collectibles-item-corner-flag-bg.png').default});
  background-size: cover;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35.2rem;
  height: 42.9rem;
  border-radius: 1rem;
  justify-content: center;
  position: relative;
  border: 1px solid #BAB3F2;

  img {
    max-height: 40.9rem;
  }
`

const PriceContainer = styled.div`
  .item {
    display: flex;
    flex-direction: row;
    margin-top: 1.2rem;

    .info-label {
      font-size: 1.6rem;
      font-weight: 400;
      color: #A196EF;
      line-height: 2.2rem;
      padding-right: 1.4rem;
    }

    .price {
      font-size: 3.2rem;
      font-weight: 400;
      color: #7C6DEB;
      line-height: 2.5rem;
    }

    .price-in-usd {
      font-size: 1.6rem;
      font-weight: 400;
      color: #A196EF;
      line-height: 2.2rem;
      margin-left: 1rem;
    }
  }

`

const ItemsContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  .item {
    width: 25.9rem;
    height: 8.9rem;
    background: #E0DDF6;
    border-radius: 1rem;
    border: 1px solid #7C6DEB;

    padding: 2rem 1.1rem;
    flex-wrap: wrap;

    .row {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 1.2rem;
        font-weight: 500;
        color: #A196EF;
        line-height: 1.7rem;

      }

      .value {
        font-size: 1.2rem;
        font-weight: 400;
        color: #7C6DEB;
        line-height: 17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

  }
`

const SubTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 550;
  color: #7C6DEB;
  line-height: 2.2rem;
`

const OtherArtworksArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 91.7rem;
  align-self: center;
  height: 42.2rem;
  margin-top: 4.9rem;

`

const OtherArtworksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  .artwork-group {
    height: 37rem;
    width: 19.2rem;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .artwork-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .artwork-img {
        width: 172px;
        height: 205px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
      }

      .artwork-describe {
        width: 100%;
        font-size: 14px;
        font-weight: 550;
        color: #7C6DEB;
        padding: 0 1rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .artwork-like {
      display: flex;
      padding: 1.0rem 1rem;

      .liked {
        font-size: 14px;
        font-weight: 500;
        color: #7C6DEB;
        line-height: 20px;
      }
    }
  }
`

/*const VoteIcon = styled.div`
  width: 109px;
  height: 30px;
  background: #829FF2;
  border-radius: 10px;
  position: absolute;
  margin-left: 5rem;
  margin-top: 2.2rem;

  font-size: 12px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`*/

const NFTBaseInfoContainer = styled.div`
  .nft-name {
    font-size: 3.2rem;
    font-weight: 400;
    color: #7C6DEB;
  }

  .description {
    margin-top: 1.2rem;
    height: 12.5rem;
    overflow-y: scroll;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
  }

  .info-row {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-label {
        font-size: 1.6rem;
        font-weight: 400;
        color: #A196EF;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: #7C6DEB;
        line-height: 2.2rem;
        user-select: none;
      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #7C6DEB;
        cursor: pointer;
      }

      .icon-favorite {
        width: 2.4rem;
        height: 1.4rem;
        display: flex;
        align-self: center;
        margin-right: 0.4rem;
      }
    }
  }

  .price-favorite-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    div {
      display: flex;
      color: #A196EF;
    }

    .price {
      align-items: flex-end;
      line-height: 2.1rem;

      .price-label {
        font-size: 1.6rem;
        font-weight: bold;
        color: #A196EF;
        margin-right: 0.8rem;
      }

      .price-value {
        font-size: 3rem;
      }
    }

  }
`

/*const ConnectButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: #7C6DEB;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 2rem;
`*/

const BuyOperating = styled.div`
  width: 100%;
  margin-top: 1.2rem;

  .buyNow {
    width: 25.9rem;
    height: 40px;
    background: #7C6DEB;
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 2rem;
  }
`

const ETHIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/eth.svg').default}
      alt="ETH"
      style={{ width: '1.2rem', marginRight: '0.8rem' }}
    />
  )
}

const Properties: React.FC = () => {
  return (
    <div>
      <SubTitle>Properties</SubTitle>
      <PropertiesArea>
        <div className="properties-group">
          <div className="properties-item">
            <div className="key">CHARACTER</div>
            <div className="value">Cats</div>
            <div className="percent">25% have this trait</div>
          </div>
        </div>
        <div className="properties-group">
          <div className="properties-item">
            <div className="key">CHARACTER</div>
            <div className="value">Cats</div>
            <div className="percent">25% have this trait</div>
          </div>
        </div>
        <div className="properties-group">
          <div className="properties-item">
            <div className="key">CHARACTER</div>
            <div className="value">Cats</div>
            <div className="percent">25% have this trait</div>
          </div>
        </div>
        <div className="properties-group">
          <div className="properties-item">
            <div className="key">CHARACTER</div>
            <div className="value">Cats</div>
            <div className="percent">25% have this trait</div>
          </div>
        </div>
      </PropertiesArea>
    </div>
  )
}

const TradingHistories: React.FC<{ nftDetail: any }> = ({ nftDetail }) => {
  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 20
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 20
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 20
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 20
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }
  ]

  const historyDataSource = nftDetail
    ?.logTransferSingleVos
    ?.slice(0,4)
    ?.map((item: any, index: number) => ({
      key: index,
      event: item?.tokenId,
      price: 20,
      from: thumbnailAddress(item?.addressFrom),
      to: thumbnailAddress(item?.addressTo),
      date: moment(item.updateTime).fromNow()
    }))

  return (
    <div>
      <SubTitle>Trading Histories</SubTitle>
      <TradingHistoryTable
        columns={columns}
        dataSource={historyDataSource}
        scroll={{ x: 100 }}
        pagination={false}
      />
    </div>
  )
}

const NFTBaseInfo: React.FC<{ nftDetail: any }> = ({ nftDetail }) => {
  const uri = useLocationQuery('uri')

  const [likeNum, setLikeNum] = useState<any>()

  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  const fetchLikeCount = useCallback(async () => {
    NftDetailFavorite(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  return (
    <NFTBaseInfoContainer>
      <div className="nft-name">
        {nftDetail?.name}
      </div>
      <div className="info-row">
        <div className="info-row-item">
          <div className="info-row-item-label">Artist</div>
          <div className="info-row-item-value">
            {
              nftDetail?.nameArtist || thumbnailAddress(nftDetail?.addressCreate)
            }
          </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>
        <div className="info-row-item">
          <div className="info-row-item-label">Owner</div>
          <div className="info-row-item-value">
            {
              thumbnailAddress(nftDetail?.addressOwner)
            }
          </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>
        <div className="info-row-item">
          <img
            src={Show}
            alt=""
            className="icon-favorite"
          />
          <div className="info-row-item-value">{likeNum?.view ? likeNum?.view : 0} views</div>
        </div>
      </div>
      <div className="description">
        {nftDetail?.description}
      </div>
      <PriceContainer>
        <div className="price-favorite-row">
          <div className="price">
            <span className="price-label">Current Price</span>
            <ETHIcon />
            <span className="price-value">
              {nftDetail?.onSale
                ? nftDetail?.price
                : '---'}
            </span>
            {/*<div className="price-in-usd">($297.21)</div>*/}
          </div>
          <div>
            <img
              src={Favorite}
              alt=""
              style={{
                width: '2.4rem,',
                height: '1.4rem',
                display: 'flex',
                alignSelf: 'center',
                marginRight: '0.4rem'
              }}
            />
            <div className="info-name">{likeNum?.favorite} favorites</div>
          </div>
        </div>
      </PriceContainer>
    </NFTBaseInfoContainer>)
}

const NFTMetadata: React.FC<{ nftDetail: any }> = ({ nftDetail }) => {
  const type = useLocationQuery('type')

  return (
    <ItemsContainer>
      <div className="item">
        <div className="row">
          <div className="label">NFT Contract ID：</div>
          <div className="value">
            {
              type === 'own' ?
                <div className="item-value">---</div> :
                <div className="item-value">
                  {thumbnailAddress(nftDetail?.addressContract)}
                </div>
            }
          </div>
        </div>
        <div className="row">
          <div className="label" style={{ marginTop: '1.5rem' }}>Token &nbsp;ID：</div>
          <div className="value" style={{ marginTop: '1.5rem' }}>
            {thumbnailAddress(nftDetail?.addressOwner)}
          </div>
        </div>
      </div>
      <div className="item">
        <div className="row">
          <div className="label">Creator&apos;s Address：</div>
          <div className="value">
            {thumbnailAddress(nftDetail?.addressCreate)}
          </div>
        </div>
        <div className="row">
          <div className="label" style={{ marginTop: '1.5rem' }}>Owner&apos;s Address：</div>
          <div className="value" style={{ marginTop: '1.5rem' }}>
            {thumbnailAddress(nftDetail?.addressOwner)}
          </div>
        </div>
      </div>
    </ItemsContainer>
  )
}

const MoreArtworks: React.FC = () => {
  return (
    <OtherArtworksArea>
      <SubTitle>More Artworks</SubTitle>
      <OtherArtworksContainer>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more1} style={{ height: '205px' }} alt="" />
            </div>
            <div className="artwork-describe">Pikachu Baby Bimbo #0005</div>
          </div>
          <div className="artwork-like">
            <img
              src={Heart}
              alt=""
              style={{
                width: '2.4rem,',
                height: '1.4rem',
                display: 'flex',
                alignSelf: 'center',
                marginRight: '0.4rem'
              }}
            />
            <div className="liked">0</div>
            <div className="liked" style={{ marginLeft: '8.6rem' }}> 5BAKE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more2} style={{ height: '205px' }} alt="'" />
            </div>
            <div className="artwork-describe">1 - The Elf</div>
          </div>
          <div className="artwork-like">
            <img
              src={Heart}
              alt=""
              style={{
                width: '2.4rem,',
                height: '1.4rem',
                display: 'flex',
                alignSelf: 'center',
                marginRight: '0.4rem'
              }}
            />
            <div className="liked">0</div>
            <div className="liked" style={{ marginLeft: '8.6rem' }}> 5BAKE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more3} style={{ height: '205px' }} alt="" />
            </div>
            <div className="artwork-describe">Mona Lisa Smile &apos;Gamma Edition &apos;</div>
          </div>
          <div className="artwork-like">
            <img
              src={Heart}
              alt=""
              style={{
                width: '2.4rem,',
                height: '1.4rem',
                display: 'flex',
                alignSelf: 'center',
                marginRight: '0.4rem'
              }}
            />
            <div className="liked">0</div>
            <div className="liked" style={{ marginLeft: '8.6rem' }}> 5BAKE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more4} style={{ height: '205px' }} alt="" />
            </div>
            <div className="artwork-describe">Like you mean it</div>
          </div>
          <div className="artwork-like">
            <img
              src={Heart}
              alt=""
              style={{
                width: '2.4rem,',
                height: '1.4rem',
                display: 'flex',
                alignSelf: 'center',
                marginRight: '0.4rem'
              }}
            />
            <div className="liked">0</div>
            <div className="liked" style={{ marginLeft: '8.6rem' }}> 5BAKE</div>
          </div>
        </div>
      </OtherArtworksContainer>
    </OtherArtworksArea>
  )
}

async function handlePurchase(nftDetail: any, account: string, onAuthorized: () => void, onSuccess: () => void) {
  const buyData = (await chooseOrder({
    valueUri: nftDetail?.valueUri
  })).data.data

  const price = toWei(buyData!.makerAsset!.baseAsset!.value)

  const sellOrder: ExchangeOrder = {
    dir: 0,
    maker: nftDetail!.addressOwner,
    makerAsset: {
      settleType: 0,
      baseAsset: {
        code: {
          baseType: 3,
          extraType: nftDetail!.tokenId,
          contractAddr: '0xb1e45866BF3298A9974a65577c067C477D38712a'
        },
        value: 1
      },
      extraValue: 0
    },
    taker: '0x0000000000000000000000000000000000000000',
    takerAsset: {
      settleType: 0,
      baseAsset: {
        code: {
          baseType: 1,
          extraType: 0,
          contractAddr: '0x0000000000000000000000000000000000000000'
        },
        value: price
      },
      extraValue: 0
    },
    fee: 0,
    feeRecipient: '0x0000000000000000000000000000000000000000',
    startTime: 0,
    endTime: 0,
    salt: buyData?.salt
  }

  const makerAsset: ExchangeOrderAsset = {
    settleType: 0,
    baseAsset: {
      code: {
        baseType: 1,
        extraType: 0,
        contractAddr: '0x0000000000000000000000000000000000000000'
      },
      value: price
    },
    extraValue: 0
  }

  const takerAsset: ExchangeOrderAsset = {
    settleType: 0,
    baseAsset: {
      code: {
        baseType: 3,
        extraType: nftDetail?.tokenId,
        contractAddr: '0xb1e45866BF3298A9974a65577c067C477D38712a'
      },
      value: 1
    },
    extraValue: 0
  }

  const buyOrder: ExchangeOrder = {
    dir: 1,
    maker: account!,
    makerAsset,
    makerAssetHash: hashExchangeOrderAsset(makerAsset),
    taker: nftDetail!.addressOwner,
    takerAsset,
    takerAssetHash: hashExchangeOrderAsset(takerAsset),
    fee: 0,
    feeRecipient: '0x0000000000000000000000000000000000000000',
    startTime: 0,
    endTime: 0,
    salt: (Date.parse(new Date().toString())) / 1000
  }

  const signature = await banksyWeb3.signer!.signMessage(ethers.utils.arrayify(hashExchangeOrder(buyOrder)))
  onAuthorized()

  await banksyWeb3.eth.Exchange.matchSingle(sellOrder, buyData!.signature, buyOrder, signature, `${makerAsset!.baseAsset.value}`)
  await completeOrder({
    valueUri: nftDetail?.valueUri,
    addressOwner: account!
  })
  onSuccess()
}

const CollectibleDetailPage: React.FC = () => {
  moment.locale('en')

  const account = useSelector(getAccount)

  const uri = useLocationQuery('uri')
  const contractAddress = useLocationQuery('contractAddress')

  const [nftDetail, setNftDetail] = useState<any | undefined>()

  const init = useCallback(async () => {
    const { data } = await banksyNftDetail({ uri, contractAddress })
    setNftDetail(data.data)
  }, [uri, contractAddress])

  const { purchaseBlockedModal, openPurchaseBlockedModal } = usePurchaseBlockedModal()
  const { authorizingModal, openAuthorizingModal, closeAuthorizingModal } = usePurchaseAuthorizingModal()
  const { purchaseSuccessModal, openPurchaseSuccessModal } = usePurchaseSuccessModal()
  const { sellingModal, openSellingModal, closeSellingModal } = useSellingModal({
    nftDetail,
    onSellingConfirmed() {
      init()
      closeSellingModal()
    }
  })

  const checkoutPassed = () => {
    openAuthorizingModal()
    handlePurchase(nftDetail, account!, closeAuthorizingModal, openPurchaseSuccessModal)
  }

  const checkoutFailed = () => {
    openPurchaseBlockedModal()
  }

  const {
    purchaseCheckoutModal,
    openPurchaseCheckoutModal
  } = usePurchaseCheckoutModal(nftDetail, checkoutPassed, checkoutFailed)


  useEffect(() => {
    init()
    window.scrollTo(0, 0)
  }, [init])

  const isOwnerOfNFT = () => nftDetail?.tokenId > 0 && account === nftDetail?.addressOwner

  const onClickBuyButton = () => {
    openPurchaseCheckoutModal()
  }

  const coverImageUrl = useCallback(() => {
    return nftDetail?.image?.startsWith('ipfs:/') ?
      `https://banksy.mypinata.cloud${nftDetail?.image?.slice(6)}` :
      `https://banksy.mypinata.cloud${nftDetail?.image?.slice(-52)}`
  }, [nftDetail])

  return (
    <BundleDetailContainer>
      <div className="operating">
        {
          isOwnerOfNFT() &&
          <Operating>
            {/*<Button className="edit">Edit</Button>*/}
            <Button className="sell" onClick={openSellingModal}>Selling</Button>
          </Operating>
        }
      </div>
      <Row>
        <LeftArea>
          <ImageContainer>
            {nftDetail?.onSale && <CornerFlag>on Sale</CornerFlag>}
            <img src={coverImageUrl()} alt={nftDetail?.name} />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <NFTBaseInfo nftDetail={nftDetail} />

          {
            nftDetail?.onSale && nftDetail?.price && account !== nftDetail?.addressOwner &&
            <BuyOperating>
              <Button className="buyNow" onClick={onClickBuyButton}>Buy Now</Button>
            </BuyOperating>
          }

          <NFTMetadata nftDetail={nftDetail} />
        </RightArea>
      </Row>
      <Row>
        <LeftArea style={{ marginTop: '5rem' }}>
          <Properties />
        </LeftArea>
        <RightArea style={{ marginTop: '5rem', height: '34rem' }}>
          <TradingHistories nftDetail={nftDetail} />
        </RightArea>
      </Row>
      <Row>
        <MoreArtworks />
      </Row>

      {purchaseCheckoutModal}
      {purchaseBlockedModal}
      {authorizingModal}
      {purchaseSuccessModal}
      {sellingModal}

    </BundleDetailContainer>
  )
}

export { CollectibleDetailPage }
