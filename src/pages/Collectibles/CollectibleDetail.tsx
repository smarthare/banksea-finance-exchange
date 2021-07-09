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
import { useAuthorizingModal } from '../../hooks/modals/useAuthorizingModal'
import { usePurchaseTransactionSentModal } from '../../hooks/modals/usePurchaseTransactionSentModal'
import { useSellingModal } from '../../hooks/modals/useSellingModal'
import ETHIcon from '../../components/ETHIcon'
import { usePurchaseWaitingConfirmationModal } from '../../hooks/modals/usePurchaseWaitingConfirmationModal'

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


  }

  .ant-table-container table > thead > tr:first-child th:last-child {


  }

  .ant-table-thead > tr > th {
    background-color: #0B111E !important;
  }

  .ant-table-thead .ant-table-cell {
    font-size: 14px;
    font-weight: 550;
    line-height: 20px;
    color: #B3B3B3 !important;
  }

  .ant-table-tbody .ant-table-cell {
    font-size: 1.4rem;
    color: white;
    line-height: 20px;
    font-weight: 550;
  }

  .ant-table-tbody .ant-table-cell :first-child {
    border-radius: 5rem;
  }

  .ant-table-row {
    background-color: #18284C;
    user-select: none;
  }

  .ant-table-tbody {
    > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-row-hover, .ant-table-row-hover > td {
      background: #354d86 !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: 4px solid #0B111E;
    border-top: 4px solid #0B111E;
  }

  .ant-table-empty {
    background-color: transparent;
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
    width: 10rem;
    height: 40px;
    background: #354d86;
    border: none;
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
  height: 21.4rem;
  width: 31.6rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #98BDF9;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
  }

  .properties-group {
    width: 14.3rem;
    height: 9.1rem;
    background: #305099;
    border-radius: 0.5rem;
    margin-left: -0.5rem;
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
      color: white;
      line-height: 2rem;
      margin-top: 1.2rem;
    }

    .value {
      margin-top: 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #98BDF9;
      line-height: 1.7rem;
    }

    .percent {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #98BDF9;
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
  width: 31.2rem;
  height: 34.4rem;
  border-radius: 2rem;
  justify-content: center;
  position: relative;
  border: 1px solid #98BDF9;

  img {
    max-height: 98%;
    max-width: 98%;
    border-radius: 2rem;
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
    height: 9.2rem;
    background: #305099;
    border-radius: 1rem;

    padding: 2rem 1.1rem;
    flex-wrap: wrap;

    .row {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 1.2rem;
        font-weight: 500;
        color: #B3B3B3;
        line-height: 1.7rem;

      }

      .value {
        font-size: 1.2rem;
        font-weight: 550;
        color: white;
        line-height: 17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

  }
`

const SubTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 550;
  color: #98BDF9;
  line-height: 2.2rem;
  margin-bottom: 4rem;
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
    height: 30rem;
    width: 22rem;
    background-color: #111C3A;
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
        height: 22rem;
        width: 22rem;
        object-fit: cover;
        border-radius: 10px;
        display: flex;
        justify-content: center;
      }

      .artwork-describe {
        width: 100%;
        font-size: 14px;
        font-weight: 550;
        color: white;
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
      justify-content: space-between;

      .liked {
        display: flex;
        font-size: 14px;
        font-weight: 500;
        color: white;
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
    font-size: 4.5rem;
    font-weight: 550;
    color: #98BDF9;
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
    flex-direction: column;
    justify-content: space-between;

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-label {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        user-select: none;
      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #98BDF9;
        cursor: pointer;
      }


    }
  }

  .info-row-favorite {
    display: flex;
    justify-content: flex-end;
    margin-top: 6rem;

    .info-row-item-value {
      display: flex;
      justify-content: flex-end;
    }

    .icon-favorite {
      width: 2rem;
      height: 1.2rem;
      display: flex;
      align-self: center;
      margin-right: 0.4rem;
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
      color: #98BDF9;
      font-weight: 550;
    }

    .price {
      align-items: flex-end;
      line-height: 2.1rem;

      .price-label {
        font-size: 1.6rem;
        font-weight: bold;
        color: #98BDF9;
        margin-right: 0.8rem;
      }

      .price-value {
        font-size: 1.6rem;
      }
    }

    .info-name {
      display: flex;
      justify-content: flex-end;
      font-size: 1.6rem;
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
    background: #305099;
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 2rem;
  }
`

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
    ?.slice(0, 4)
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
      </div>
      <div className="info-row-favorite">
        <img
          src={Show}
          alt=""
          className="icon-favorite"
        />
        <div className="info-row-item-value">{likeNum?.view ? likeNum?.view : 0}</div>
      </div>

      {/*<div className="description">
        {nftDetail?.description}
      </div>*/}
      <PriceContainer>
        <div className="price-favorite-row">
          {
            nftDetail?.onSale ? (
              <div className="price">
                <span className="price-label">Current Price</span>
                <ETHIcon />
                <span className="price-value">
                  {nftDetail?.price}
                </span>
                {/*<div className="price-in-usd">($297.21)</div>*/}
              </div>
            ) : <div />
          }
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
            <div className="info-name">{likeNum?.favorite}</div>
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
              <img src={more1} style={{ borderRadius: '1rem', objectFit: 'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Pikachu Baby Bimbo #0005</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked"> 5BAKE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more2} style={{ borderRadius: '1rem', objectFit: 'cover' }} alt="'" />
            </div>
            <div className="artwork-describe">1 - The Elf</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked"> 5BAKE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more3} style={{ borderRadius: '1rem', objectFit: 'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Mona Lisa Smile &apos;Gamma Edition &apos;</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked"> 5BAKE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more4} style={{ borderRadius: '1rem', objectFit: 'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Like you mean it</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked"> 5BAKE</div>
          </div>
        </div>
      </OtherArtworksContainer>
    </OtherArtworksArea>
  )
}

async function handlePurchase(nftDetail: any, account: string, {
  onAuthorized,
  onSuccess
}: { onAuthorized: () => void, onSuccess: () => void }) {
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

  const { purchaseBlockedModal, openPurchaseBlockedModal } = usePurchaseBlockedModal()
  const { authorizingModal, openAuthorizingModal, closeAuthorizingModal } = useAuthorizingModal()
  const {
    purchaseWaitingConfirmationModal,
    openPurchaseWaitingConfirmationModal,
    closePurchaseWaitingConfirmationModal
  } = usePurchaseWaitingConfirmationModal()
  const { purchaseTransactionSentModal, openPurchaseTransactionSentModal } = usePurchaseTransactionSentModal()
  const { sellingModal, openSellingModal } = useSellingModal({
    nftDetail,
    onSellingConfirmed() {
      window.location.reload()
    },
    onStart: openAuthorizingModal
  })

  const checkoutPassed = () => {
    openAuthorizingModal()
    handlePurchase(nftDetail, account!, {
      onAuthorized: () => {
        closeAuthorizingModal()
        openPurchaseWaitingConfirmationModal()
      },
      onSuccess: () => {
        openPurchaseTransactionSentModal()
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        closePurchaseCheckoutModal()
        closePurchaseWaitingConfirmationModal()
      }
    })
  }

  const checkoutFailed = () => {
    openPurchaseBlockedModal()
  }

  const {
    purchaseCheckoutModal,
    openPurchaseCheckoutModal,
    closePurchaseCheckoutModal
  } = usePurchaseCheckoutModal(nftDetail, checkoutPassed, checkoutFailed)

  const init = useCallback(async () => {
    const { data } = await banksyNftDetail({ uri, contractAddress })
    setNftDetail(data.data)
  }, [uri, contractAddress])

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
            <Button className="sell" onClick={openSellingModal}>Sell</Button>
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
      {purchaseWaitingConfirmationModal}
      {purchaseTransactionSentModal}
      {sellingModal}

    </BundleDetailContainer>
  )
}

export { CollectibleDetailPage }
