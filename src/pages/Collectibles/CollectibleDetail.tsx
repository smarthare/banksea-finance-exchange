import React from 'react'

import styled from 'styled-components'
import { Button, Carousel, Dropdown, Menu, Table, Descriptions } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import Show from '@/assets/images/show.png'
import Favorite from '@/assets/images/favorite.png'
import Heart from '@/assets/images/like.png'


const Row = styled.div`
  display: flex;
`

const BundleDetailContainer = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5rem 10rem;
  font-family: 'PingFang SC';
  background-image: url(${require('../../assets/images/Banksy-Collectible-BG@2x.png').default});
  background-size: 100%;

`

// @ts-ignore
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

  .history-title {
    font-size: 1.6rem;
    font-weight: 500;
    color: #7C6DEB;
    line-height: 2.2rem;
  }

  .bundle-info {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .item {
      display: flex;
      flex-direction: row;

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
    }

  }

`
const PropertiesArea = styled.div`
  height: 28.8rem;
  width: 36 .rem;
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
  font-width : 500;
  text-align: center;
  line-height: 3rem;
  z-index: 1049;
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
`

const DescriptionContainer = styled.div`
  margin-top: 1.2rem;
  height: 17rem;
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
      font-size: 32px;
      font-weight: 400;
      color: #7C6DEB;
      line-height: 25px;
    }

    .price-in-usd {
      font-size: 16px;
      font-weight: 400;
      color: #A196EF;
      line-height: 22px;
    }
  }

`

const BundleName = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  color: #7C6DEB;
`

const ListingsContainer = styled.div`
  width: 700px;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px 0 rgba(102, 102, 102, 0.8);

  p {
    font-size: 20px;
    font-weight: bold;
  }
`

const MakerAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
`

const ItemsContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  .items {
    width: 25.9rem;
    height: 8.9rem;
    background: #E0DDF6;
    border-radius: 1rem;
    border: 1px solid #7C6DEB;

    .item-border {
      padding: 2rem 1.1rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item-name {
        font-size: 1.2rem;
        font-weight: 500;
        color: #A196EF;
        line-height: 1.7rem;

      }

      .item-value {
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

const ItemCardContainer = styled.div`
  display: flex;

  .itemCardContainer-text {
    margin-left: 20px;

    p:nth-of-type(1) {
      font-size: 17px;
      color: #3498db;
    }

    p:nth-of-type(2) {
      font-size: 17px;
    }
  }
`
const SubTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
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
const OtherArtworksContainer=styled.div`
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

    .artwork-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .artwork-img {
        width: 172px;
        height: 205px;
        background: #F5F5F5;
        border-radius: 10px;
        justify-content: center;
      }
      .artwork-describe {
        font-size: 14px;
        font-weight: 550;
        color: #7C6DEB;
        line-height: 20px;
        padding: 1.5rem 1rem;
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

const ConnectButton = styled(Button) `
  width: 100%;
  height: 40px;
  background: #7C6DEB;
  border-radius: 10px;
`

const AssetItemCard: React.FC = () => {
  return (
    <ItemCardContainer>
      <img style={{ height: 70, width: 70, borderRadius: 8 }} />
      <div className='itemCardContainer-text'>
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => window.open('https://opensea.io/collection/')}
        >
          asset.collection.name
        </p>
        <p>asset.name</p>
      </div>
    </ItemCardContainer>
  )
}

const CollectibleDetailPage: React.FC = () => {
  const contactId = 'Ox58c94e5656824eef6704e44f'
  const creatorAddress = 'Ox58c94e5656824eef6704e44f'
  const ownerAddress = 'Ox58c94e5656824eef6704e44f'

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 20,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 20,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 20,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 20,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }
  ]

  const historyDataSource = [
    {
      key: '1',
      event: 'Bid',
      price: 20,
      from: 'Ox3bB....5b8B3',
      to: 'Ox3bB....5b8B3',
      date: '2 weeks ago'
    },
    {
      key: '2',
      event: 'Bid',
      price: 20,
      from: 'Ox3bB....5b8B3',
      to: 'Ox3bB....5b8B3',
      date: '2 weeks ago'
    },
    {
      key: '3',
      event: 'Bid',
      price: 20,
      from: 'Ox3bB....5b8B3',
      to: 'Ox3bB....5b8B3',
      date: '2 weeks ago'
    },
    {
      key: '4',
      event: 'Bid',
      price: 20,
      from: 'Ox3bB....5b8B3',
      to: 'Ox3bB....5b8B3',
      date: '2 weeks ago'
    },
    {
      key: '5',
      event: 'Bid',
      price: 20,
      from: 'Ox3bB....5b8B3',
      to: 'Ox3bB....5b8B3',
      date: '2 weeks ago'
    },
  ]

  return (
    <BundleDetailContainer>
      <Row>
        <LeftArea>
          <ImageContainer>
            <CornerFlag>on Auction</CornerFlag>
            <img
              src={require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default}
              alt=''
            />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <BundleName>bundle.name</BundleName>
          <div className="bundle-info">
            <div className="item">
              <div className="info-label">Artist</div>
              <div className="info-name">DrBurry</div>
            </div>
            <div className="item">
              <div className="info-label">Owner</div>
              <div className="info-name">DrBurry</div>
            </div>
            <div className="item">
              <img src={Show}
                alt=''
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
            This is an art piece that I renounce as the Doge-A-Lisa. I
            t is inspired by Mona Lisa, created by Leonardo da Vinci. I have created
            this work of art my self hence, this is a limited edition, one of one on the NFT market.
            Thank you for viewing this, and have a good day :)
          </DescriptionContainer>
          <PriceContainer>
            <div className="bundle-info">
              <div className="item">
                <div className="info-label">Current price</div>
                <div className="price">0.99999</div>
                <div className="price-in-usd">($297.21)</div>
              </div>
              <div className="item">
                <img src={Favorite}
                  alt=''
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
          </PriceContainer>
          <ItemsContainer>
            <div className="items">
              <div className="item-border">
                <div className="item-name">NFT Contract ID：</div>
                <div className="item-value">{contactId.substring(0, 4)}...{contactId.substring(9, 16)}</div>
                <div className="item-name" style={{ marginTop: '1.5rem' }}>Token ID：</div>
                <div className="item-value" style={{ marginTop: '1.5rem' }}>21238</div>
              </div>
            </div>
            <div className="items">
              <div className="item-border">
                <div className="item-name">Creator&apos;s Address：</div>
                <div className="item-value">{creatorAddress.substring(0, 4)}...{creatorAddress.substring(9, 16)}</div>
                <div className="item-name" style={{ marginTop: '1.5rem' }}>Owner&apos;s Address：</div>
                <div className="item-value"
                  style={{ marginTop: '1.5rem' }}
                >{ownerAddress.substring(0, 4)}...{creatorAddress.substring(9, 16)}
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
          <div className="history-title">Trading History</div>
          <TradingHistoryTable
            columns={columns}
            dataSource={historyDataSource}
            scroll={{ x: 100 }}
            pagination={false}
          />
        </RightArea>
      </Row>
      <Row>
        <OtherArtworksArea >
          <SubTitle>More Artworks</SubTitle>
          <OtherArtworksContainer>
            <div className="artwork-group" >
              <div className="artwork-info" >
                <div className="artwork-img" />
                <VoteIcon >Approve Vote</VoteIcon>
                <div className="artwork-describe">Chinese zodiac wait to the moon——Kaitong</div>
              </div>
              <div className="artwork-like" >
                <img src={Heart}
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
                <div className="liked" style={{ marginLeft:'8.6rem' }}> 5BAKE</div>
              </div>
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
            <div className="artwork-group" >
              <div className="artwork-info" >
                <div className="artwork-img" />
                <VoteIcon >Approve Vote</VoteIcon>
                <div className="artwork-describe">Chinese zodiac wait to the moon——Kaitong</div>
              </div>
              <div className="artwork-like" >
                <img src={Heart}
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
                <div className="liked" style={{ marginLeft:'8.6rem' }}> 5BAKE</div>
              </div>
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
            <div className="artwork-group" >
              <div className="artwork-info" >
                <div className="artwork-img" />
                <VoteIcon >Approve Vote</VoteIcon>
                <div className="artwork-describe">Chinese zodiac wait to the moon——Kaitong</div>
              </div>
              <div className="artwork-like" >
                <img src={Heart}
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
                <div className="liked" style={{ marginLeft:'8.6rem' }}> 5BAKE</div>
              </div>
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
            <div className="artwork-group" >
              <div className="artwork-info" >
                <div className="artwork-img" />
                <VoteIcon >Approve Vote</VoteIcon>
                <div className="artwork-describe">Chinese zodiac wait to the moon——Kaitong</div>
              </div>
              <div className="artwork-like" >
                <img src={Heart}
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
                <div className="liked" style={{ marginLeft:'8.6rem' }}> 5BAKE</div>
              </div>
              <ConnectButton>Connect wallet</ConnectButton>
            </div>
          </OtherArtworksContainer>
        </OtherArtworksArea>
      </Row>

    </BundleDetailContainer>
  )

}

export default CollectibleDetailPage
