import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import styled from 'styled-components'
import { Button, Divider, Table, Modal, Input, Select, Checkbox } from 'antd'
import Show from '@/assets/images/show.png'
import Favorite from '@/assets/images/favorite.png'
import Heart from '@/assets/images/like.png'
import { banksyNftDetail } from '../../utils/banksyNftList'
import moment from 'moment'
import 'moment/locale/pt-br'
import copy from 'copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import more1 from '@/assets/images/detailMoreImg/more1.jpg'
import more2 from '@/assets/images/detailMoreImg/more2.png'
import more3 from '@/assets/images/detailMoreImg/more3.jpg'
import more4 from '@/assets/images/detailMoreImg/more4.png'
import { useLocationQuery } from '../../utils'
import { banksyJsConnector } from '../../BanksyJs/banksyJsConnector'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { sellOrder } from '../../utils/banksyNftList'
import SellModal from './SellModal'

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
  padding: 5rem 10rem;
  background: url(${require('../../assets/images/Banksy-Collectible-BG@2x.png').default}) no-repeat;
  background-size: 100%;
  position: relative;

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


  .bundle-info {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .item {
      display: flex;
      flex-direction: row;
      align-items: center;

      .info-label {
        font-size: 1.6rem;
        font-weight: 400;
        color: #A196EF;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      .info-name {
        font-size: 1.6rem;
        font-weight: 500;
        color: #7C6DEB;
        line-height: 2.2rem;
      }

      .copy {
        margin-left: 0.5rem;
      }
    }

  }

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

const DescriptionContainer = styled.div`
  margin-top: 1.2rem;
  height: 12.5rem;
  overflow-y: scroll;
  font-size: 16px;
  font-weight: 400;
  color: #7C6DEB;
  line-height: 22px;
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

const BundleName = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  color: #7C6DEB;
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

const VoteIcon = styled.div`
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
`

const ConnectButton = styled(Button)`
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
`

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


type MessageHintProps = {
  message: string,
  type?: 'error' | 'hint' | 'success'
}

const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': 'red',
    'success': 'rgb(82,196,26)',
    'hint': '#7c6deb'
  }[type] : ''

  return (
    <p style={{ fontSize: '1.2rem', color }}>
      {message}
    </p>
  )
}


const CollectibleDetailPage: React.FC = () => {
  moment.locale('en')
  const account = useSelector(getAccount)
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState<any>()
  const uri = useLocationQuery('uri')
  const type = useLocationQuery('type')
  const contractAddress = useLocationQuery('contractAddress')

  const init = useCallback(async () => {
    banksyNftDetail({ uri, contractAddress })
      .then(res => {
        setData(res.data.data)
      })
  }, [type, uri, contractAddress])

  useEffect(() => {
    init()
    window.scrollTo(0, 0)
  }, [init])

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

  const historyDataSource = data?.logTransferSingleVos?.map((item: any, index: number) => ({
    key: index,
    event: item?.tokenId,
    price: 20,
    from: `${item?.addressFrom.substring(0, 4)}...${item?.addressFrom.slice(-4)}`,
    to: `${item?.addressTo.substring(0, 4)}...${item?.addressTo.slice(-4)}`,
    date: moment(item.updateTime).fromNow()
  })
  )

  const handleCopy = (addressCreate: any) => {
    copy(addressCreate)
  }

  const sellModalOpen = () => {
    setVisible(true)
  }

  return (
    <BundleDetailContainer>
      <Row>
        <LeftArea>
          <ImageContainer>
            <CornerFlag>on Auction</CornerFlag>
            <img
              src={data?.image}
              alt=""
            />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          {
            type === 'own'?
              <Operating>
                <Button className="edit">Edit</Button>
                <Button className="sell" onClick={sellModalOpen}>Sell</Button>
              </Operating>:
              <div />
          }
          <BundleName>{data?.name}</BundleName>
          <div className="bundle-info">
            <div className="item">
              <div className="info-label">Artist</div>
              <div className="info-name"
                onClick={() => handleCopy(data?.addressCreate)}
              >{data?.addressCreate?.substring(0, 4)}...{data?.addressCreate?.slice(-4)}
              </div>
              <CopyOutlined className="copy" style={{ color: '#7C6DEB' }} />
            </div>
            <div className="item">
              <div className="info-label">Owner</div>
              <div className="info-name">{data?.addressCreate?.substring(0, 4)}...{data?.addressCreate?.slice(-4)}</div>
            </div>
            <div className="item">
              <img
                src={Show}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.4rem'
                }}
              />
              <div className="info-name">1.2K views</div>
            </div>
          </div>
          <DescriptionContainer>
            {data?.description}
          </DescriptionContainer>
          <PriceContainer>
            <div className="bundle-info">
              <div className="item">
                <div className="info-label">Current price</div>
                <div className="price">0.99999</div>
                <div className="price-in-usd">($297.21)</div>
              </div>
              <div className="item">
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
                <div className="info-name">29 favorites</div>
              </div>
            </div>
            {
              type === 'nftList'?
                <BuyOperating>
                  <Button className="buyNow">Buy Now</Button>
                </BuyOperating>:
                <div />
            }
          </PriceContainer>
          <ItemsContainer>
            <div className="item">
              <div className="row">
                <div className="label">NFT Contract ID：</div>
                <div className="value">
                  {
                    type === 'own' ?
                      <div className="item-value">---</div> :
                      <div className="item-value">
                        {data?.addressContract?.substring(0, 4)}...{data?.addressContract?.slice(-4)}
                      </div>
                  }
                </div>
              </div>
              <div className="row">
                <div className="label" style={{ marginTop: '1.5rem' }}>Token &nbsp;ID：</div>
                <div className="value" style={{ marginTop: '1.5rem' }}>
                  {data?.addressOwner?.substring(0, 4)}...{data?.addressOwner?.substring(9, 16)}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="row">
                <div className="label">Creator&apos;s Address：</div>
                <div className="value">
                  {data?.addressCreate?.substring(0, 4)}...{data?.addressCreate?.slice(-4)}
                </div>
              </div>
              <div className="row">
                <div className="label" style={{ marginTop: '1.5rem' }}>Owner&apos;s Address：</div>
                <div className="value" style={{ marginTop: '1.5rem' }}>
                  {data?.addressOwner?.substring(0, 4)}...{data?.addressOwner?.substring(9, 16)}
                </div>
              </div>
            </div>
          </ItemsContainer>
        </RightArea>
      </Row>
      <Row>
        <LeftArea style={{ marginTop: '5rem' }}>
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
        </LeftArea>
        <RightArea style={{ marginTop: '5rem', height: '34rem' }}>
          <SubTitle>Trading History</SubTitle>
          <TradingHistoryTable
            columns={columns}
            dataSource={historyDataSource}
            scroll={{ x: 100 }}
            pagination={false}
          />
        </RightArea>
      </Row>
      <Row>
        <OtherArtworksArea>
          <SubTitle>More Artworks</SubTitle>
          <OtherArtworksContainer>
            <div className="artwork-group">
              <div className="artwork-info">
                <div className="artwork-img">
                  <img src={more1} style={{ height: '205px' }} />
                </div>
                <VoteIcon>Approve Vote</VoteIcon>
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
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
            <div className="artwork-group">
              <div className="artwork-info">
                <div className="artwork-img">
                  <img src={more2} style={{ height: '205px' }} alt="'" />
                </div>
                <VoteIcon>Approve Vote</VoteIcon>
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
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
            <div className="artwork-group">
              <div className="artwork-info">
                <div className="artwork-img">
                  <img src={more3} style={{ height: '205px' }} />
                </div>
                <VoteIcon>Approve Vote</VoteIcon>
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
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
            <div className="artwork-group">
              <div className="artwork-info">
                <div className="artwork-img">
                  <img src={more4} style={{ height: '205px' }} />
                </div>
                <VoteIcon>Approve Vote</VoteIcon>
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
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
          </OtherArtworksContainer>
        </OtherArtworksArea>
      </Row>
      <SellModal visible={visible} onCancel={() => setVisible(false)} data={data} account={account} />
    </BundleDetailContainer>
  )

}

export default CollectibleDetailPage
