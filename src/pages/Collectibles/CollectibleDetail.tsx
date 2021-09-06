import React, { useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'
import { Button, Image, message, Popover } from 'antd'
import Show from '@/assets/images/collectibleDetailImg/show.png'
import Heart from '@/assets/images/collectibleDetailImg/like.png'
import moment from 'moment'
import 'moment/locale/pt-br'
import copy from 'copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import more1 from '@/assets/images/detailMoreImg/more1.jpg'
import more2 from '@/assets/images/detailMoreImg/more2.png'
import more3 from '@/assets/images/detailMoreImg/more3.jpg'
import more4 from '@/assets/images/detailMoreImg/more4.png'
import { thumbnailAddress } from '../../utils'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useSelector } from 'react-redux'
import { getAccount, getCurrentChain } from '../../store/wallet'
import { banksyWeb3 } from '../../BanksyWeb3'
import { usePurchaseCheckoutModal } from '../../hooks/modals/usePurchaseCheckoutModal'
import { usePurchaseBlockedModal } from '../../hooks/modals/usePurchaseBlockedModal'
import { useAuthorizingModal } from '../../hooks/modals/useAuthorizingModal'
import { usePurchaseTransactionSentModal } from '../../hooks/modals/usePurchaseTransactionSentModal'
import { useSellingModal } from '../../hooks/modals/useSellingModal'
import ETHIcon from '../../components/ETHIcon'
import { usePurchaseWaitingConfirmationModal } from '../../hooks/modals/usePurchaseWaitingConfirmationModal'
import { getNftFavoriteCount } from '../../apis/nft'
import { useMediaQuery } from 'react-responsive'
import { NftDetail } from '../../types/NFTDetail'
import { closeExchange } from '../../BanksyWeb3/services/solana/exchange'
import { getExchangeInfo } from '../../apis/exchange/solana'
import { useWeb3EnvContext } from '../../contexts/Web3EnvProvider'
import { useWalletSelectionModal } from '../../contexts/WalletSelectionModal'
import { useNftDetailQuery } from '../../hooks/queries/useNftDetailQuery'
import { useHistory } from 'react-router-dom'
import ThemeTable from '../../styles/ThemeTable'

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const CollectiblesDetailContainer = styled.div`
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2vw 6vw;
  position: relative;

  .operating {
    width: 100%;
    height: 7rem;
    position: relative;
  }

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: fit-content;
    background-color: #0B111E;
    padding: 0;
    overflow-x: hidden;

  }
`

const LeftArea = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 2vw;

`

const RightArea = styled.div`
  width: 53.9rem;
  margin-left: 1.3rem;
  position: relative;
`

const Operating = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;

  .ant-btn {
    width: fit-content;
    margin-left: 1vw;
    background: #354d86;
    border: none;
    border-radius: 0.5vw;
    font-size: 1vw;
    font-weight: 550;
    color: #FFFFFF;
    line-height: 2rem;
  }

  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;

    .ant-btn {
      width: 40vw;
      height: 10vw;
      border-radius: 2vw;
      font-size: 5vw;
    }
  }
`

const PropertiesArea = styled.div`
  height: 21rem;
  width: 30rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: scroll;

  /*::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #98BDF9;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
  }*/

  .properties-group {
    width: 14.3rem;
    height: 9.1rem;
    background: #305099;
    border-radius: 0.5rem;
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

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: fit-content;

    .mobile-properties {
      width: 80vw;
      height: 25vh;
      background-color: #305099;
      border-radius: 2rem;
      padding: 4vw 2vw;
    }

    .properties-group {
      width: 35vw;
      height: 10vh;
      background: #162d68;
      border-radius: 1rem;
    }
  }
`

const CornerFlag = styled.div`
  position: absolute;
  color: white;
  bottom: 20vw;
  right: 16vw;
  font-weight: 550;
  text-align: center;
  width: 4.5vw;
  height: 2vw;
  background-image: url(${require('../../assets/images/collectibles-item-corner-flag-bg.png').default});
  background-size: cover;
  z-index: 2;

  @media screen and (max-width: 1000px) {
    top: 3vw;
    left: 8.7vw;
    width: 25vw;
    height: 10vw;
  }
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
  object-fit: cover;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 2rem;
  }

  @media screen and (max-width: 600px) {
    margin-top: 5vw;
    border: none;
    height: 100%;
    width: 100vw;

    img {
      height: 50vh;
      width: 80vw;
      object-fit: cover;
      border: 1px solid #98BDF9;
    }
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
    width: 25rem;
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

  @media screen and (max-width: 600px) {
    display: flex ;
    justify-content: center ;
    flex-direction: column ;
    height: fit-content;

    .item {
      background: #305099;
      width: 80vw;

      .row {
        display: flex;
        justify-content: space-between;
      }
    }
`

const SubTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 550;
  color: #98BDF9;
  line-height: 2.2rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 600px) {
    padding: 3vh 0;
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
    width: 100vw;
    font-size: 8vw !important;
  }
`

const OtherArtworksArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 91.7rem;
  align-self: center;
  height: 42.2rem;
  margin-top: 4.9rem;

  @media screen and (max-width: 1000px) {
    width: 100vw;
  }

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

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    width: 100vw !important;

    .artwork-group {
      margin-left: calc((100vw - 22rem) / 2);
      margin-bottom: 5vh;
    }
  }
`

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
        font-weight: 550;
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

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;

    .nft-name {
      width: fit-content;
      font-size: 4.5rem;
      font-weight: 550;
      color: #98BDF9;
      padding: 5vh 0;
    }

    .line {
      margin-bottom: 5vh;
      width: 80vw;
      border-bottom: solid 0.2rem #787A91;
    }
  }
`

const BuyButton = styled(Button)`
  margin-top: 1.2rem;
  width: 12vw;
  height: 40px;
  background: #305099;
  color: #FFFFFF;
  border-radius: 10px;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;

  &[disabled] {
    background: rgba(48, 80, 153, 0.55) !important;
    color: #999;
  }
`

const MobileContainer = styled.div`
`

const MobileNFTBaseInfoContainer = styled.div`
  .nft-info {
    display: flex;
    justify-content: space-between;
    padding: 1vh 10.5vw;
    color: #B2B1B9;
    font-size: 5vw;

    .info-favorite > img {
      width: 7vw;
      height: 2vh;
      display: flex;
      align-self: center;
      margin-right: 2vw;
    }

    .icon-heart > img {
      width: 5vw;
      height: 2vh;
      display: flex;
      align-self: center;
      margin-right: 2vw;
    }

    .nft-artist-label {
      font-weight: 550;
    }

    .nft-artist-value {
      font-weight: normal;
    }
  }

`

const Properties: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  return (
    <div>
      <SubTitle>Properties</SubTitle>
      <PropertiesArea>
        {
          isMobile ?
            <div className="mobile-properties" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100vw' }}>
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
              </div>
            </div>
            :
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '30rem', flexWrap: 'wrap' }}>
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
            </div>
        }
      </PropertiesArea>
    </div>
  )
}

const TradingHistories: React.FC<{ nftDetail?: NftDetail }> = ({ nftDetail }) => {

  const isMobile = useMediaQuery({ query: '(max-width:1000px' })

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
      {
        isMobile ?
          <ThemeTable
            columns={columns}
            dataSource={historyDataSource}
            scroll={{ x: 550 }}
            pagination={false}
          />
          :
          <ThemeTable
            columns={columns}
            dataSource={historyDataSource}
            scroll={{ x: 100 }}
            pagination={false}
          />
      }
    </div>
  )
}

const MobileNFTBaseInfo: React.FC<{ nftDetail?: NftDetail }> = ({ nftDetail }) => {
  const uri = useLocationQuery('uri')
  const [likeNum, setLikeNum] = useState<any>()

  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  const fetchLikeCount = useCallback(async () => {
    getNftFavoriteCount(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  return (
    <MobileNFTBaseInfoContainer>
      <div className="nft-info">
        <div style={{ display: 'flex' }}>
          <div className="nft-artist-label"> Artist :</div>
          <div className="nft-artist-value">
            {nftDetail?.nameArtist || thumbnailAddress(nftDetail?.addressCreate)}
          </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>
        <div className="info-favorite" style={{ display: 'flex' }}>
          <img
            src={Show}
            alt=""
            className="icon-favorite"
          />
          <div className="info-row-item-value">{likeNum?.view ? likeNum?.view : 0}</div>
        </div>
      </div>

      <div className="nft-info">
        <div style={{ display: 'flex' }}>
          <div className="nft-artist-label"> Owner :</div>
          <div className="nft-artist-value">
            <div className="nft-owner">{thumbnailAddress(nftDetail?.addressOwner)}</div>
          </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>
        <div style={{ display: 'flex' }} className="icon-heart">
          <img
            className="icon-heart"
            src={Heart}
            alt=""
          />
          <div className="info-name">{likeNum?.favorite}</div>
        </div>
      </div>
    </MobileNFTBaseInfoContainer>
  )
}

const NFTBaseInfo: React.FC<{ nftDetail?: NftDetail }> = ({ nftDetail }) => {
  const uri = useLocationQuery('uri')

  const [likeNum, setLikeNum] = useState<any>()

  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  const fetchLikeCount = useCallback(async () => {
    getNftFavoriteCount(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  const isMobile = useMediaQuery({ query: '(max-width:600px)' })
  return (
    <NFTBaseInfoContainer>
      {
        isMobile ?
          <div>
            <div className="nft-name">
              {nftDetail?.name}
            </div>
            <div className="line" />
            {/*<div style={{ display:'flex',justifyContent:'flex-start', flexDirection:'column' }}>
              <div className="info-row-item-label">Artist : { nftDetail?.nameArtist || thumbnailAddress(nftDetail?.addressCreate) }</div>
              <div className="info-row-item-label">Owner : { thumbnailAddress(nftDetail?.addressOwner) }
              </div>
            </div>*/}
          </div>
          :
          <div>
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

            <PriceContainer>
              <div className="price-favorite-row">
                {
                  nftDetail?.onSale && (
                    <div className="price">
                      <span className="price-label">Current Price</span>
                      <ETHIcon />
                      <span className="price-value">
                        {nftDetail?.price}
                      </span>
                      {/*<div className="price-in-usd">($297.21)</div>*/}
                    </div>
                  )
                }
                <div>
                  <img
                    src={Heart}
                    alt=""
                    style={{
                      width: '2.5rem,',
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
          </div>
      }
    </NFTBaseInfoContainer>
  )
}

const NFTMetadata: React.FC<{ nftDetail?: NftDetail }> = ({ nftDetail }) => {
  const type = useLocationQuery('type')
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <ItemsContainer>
      {
        isMobile ?
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5vh' }}>
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
            </div>

          </div>

          :

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '90rem' }}>
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
          </div>
      }
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
              <img src={more2}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
                alt="'"
              />
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
              <img src={more3}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
                alt=""
              />
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
              <img src={more4}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
                alt=""
              />
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

const CollectibleDetailPage: React.FC = () => {
  moment.locale('en')

  const history = useHistory()

  const { providerInitialized } = useWeb3EnvContext()

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const account = useSelector(getAccount)
  const currentChain = useSelector(getCurrentChain)

  const uri = useLocationQuery('uri')
  const contractAddress = useLocationQuery('contractAddress')

  if (!uri) {
    history.push('/collectibles')
    return <div />
  }

  const { data: nftDetail } = useNftDetailQuery({ uri, contractAddress })

  const [reasonOfUnableToBuy, setReasonOfUnableToBuy] = useState<string>()

  const { open: openWalletSelectionModal } = useWalletSelectionModal()
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

    banksyWeb3.services.purchaseByFixedPrice({
      account: account!,
      nftDetail,
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

  useEffect(() => {
    if (nftDetail?.nftPubKey) {
      //
    }

  }, [nftDetail])

  const allowToSell = () => {
    if (nftDetail?.typeChain === 'Solana') {
      // TODO: hack
      // return true
      return nftDetail?.nftPubKey?.length > 0 && account === nftDetail?.addressOwner
    }

    if (nftDetail?.typeChain === 'Ethereum') {
      return nftDetail?.tokenId > 0 && account === nftDetail?.addressOwner
    }
  }

  useEffect(() => {
    if (!(nftDetail?.onSale && nftDetail.price)) {
      setReasonOfUnableToBuy('Not on sale')
      return
    }

    if (account === nftDetail?.addressOwner) {
      setReasonOfUnableToBuy('You CANNOT buy your own NFT')
      return
    }

    if (nftDetail?.typeChain === 'Ethereum' && currentChain !== 'Ethereum'
      || nftDetail?.typeChain === 'Solana' && currentChain !== 'Solana') {
      setReasonOfUnableToBuy(`The NFT is on ${nftDetail.typeChain}, but now you are on ${currentChain}`)
      return
    }

    setReasonOfUnableToBuy(undefined)
  }, [account, currentChain, nftDetail])

  const allowToSoldOut = () => {
    return nftDetail?.onSale && allowToSell()
  }

  const onClickBuyButton = () => {
    openPurchaseCheckoutModal()
  }

  const handleSoldOut = async () => {
    const exchangePubKey = (await (getExchangeInfo(nftDetail!.nftPubKey))).data.data.exchangePubKey

    closeExchange(nftDetail!.nftPubKey, exchangePubKey)
  }

  const coverImageUrl = useCallback(() => {
    return nftDetail?.image?.startsWith('ipfs:/')
      ? `https://banksy.mypinata.cloud${nftDetail?.image?.slice(6)}`
      : `https://banksy.mypinata.cloud${nftDetail?.image?.slice(-52)}`
  }, [nftDetail])

  return (
    <CollectiblesDetailContainer>
      {
        isMobile ?
          <MobileContainer>
            <NFTBaseInfo nftDetail={nftDetail} />
            <ImageContainer>
              {nftDetail?.onSale && <CornerFlag>on Sale</CornerFlag>}
              <Image src={coverImageUrl()} />
            </ImageContainer>

            <MobileNFTBaseInfo nftDetail={nftDetail} />
            {
              !reasonOfUnableToBuy &&
              <Button className="buyNow" onClick={onClickBuyButton}>
                Buy Now
              </Button>
            }
            {
              allowToSell() &&
              <Operating>
                <Button className="sell" onClick={openSellingModal}>
                  Sell
                </Button>
              </Operating>
            }
            <NFTMetadata nftDetail={nftDetail} />
            <div className="mobile-properties-area">
              <Properties />
            </div>
            <TradingHistories nftDetail={nftDetail} />
            <MoreArtworks />
          </MobileContainer> :
          <div>
            <Operating>
              {
                allowToSoldOut() && (
                  <Button onClick={handleSoldOut}>
                    Sold out
                  </Button>
                )
              }
              {
                allowToSell() && (
                  <Button onClick={openSellingModal}>
                    Sell
                  </Button>
                )
              }
            </Operating>
            <Row>
              <LeftArea>
                <ImageContainer>
                  {nftDetail?.onSale && <CornerFlag>on Sale</CornerFlag>}
                  <Image src={coverImageUrl()} height="34.4rem" width="31.2rem" />
                </ImageContainer>
              </LeftArea>
              <RightArea>
                <NFTBaseInfo nftDetail={nftDetail} />
                {
                  !providerInitialized ? (
                    <BuyButton onClick={openWalletSelectionModal}>
                      Connect To A Wallet
                    </BuyButton>
                  ) : (
                    !reasonOfUnableToBuy ? (
                      <BuyButton onClick={onClickBuyButton}>
                        Buy Now
                      </BuyButton>
                    ) : (
                      <Popover content={reasonOfUnableToBuy}>
                        <BuyButton onClick={onClickBuyButton} disabled={true}>
                          Buy Now
                        </BuyButton>
                      </Popover>
                    )
                  )
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
          </div>
      }

      {purchaseCheckoutModal}
      {purchaseBlockedModal}
      {authorizingModal}
      {purchaseWaitingConfirmationModal}
      {purchaseTransactionSentModal}
      {sellingModal}
    </CollectiblesDetailContainer>
  )
}

export { CollectibleDetailPage }
