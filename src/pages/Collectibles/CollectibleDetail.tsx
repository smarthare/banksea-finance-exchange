import React from 'react'

import styled from 'styled-components'
import { Button, Carousel, Dropdown, Menu, Table, Descriptions } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import Show from '@/assets/images/show.png'
import Favorite from '@/assets/images/favorite.png'

const BundleDetailContainer = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5rem 10rem;
  font-family: 'PingFang SC';
`

const LeftArea = styled.div`
  height: 42.9rem;
  width: 35.2rem;
  display: flex;
  justify-content: space-between;
  margin-right: 5rem;
`

const RightArea = styled.div`
  height: 42.9rem;
  width: 53.9rem;

  margin-left: 5rem;

  .bundle-info{
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35.2rem;
  height: 42.9rem;
  border-radius: 1rem;
`

const DescriptionContainer = styled(Descriptions)`
  margin-top: 1.2rem;
  height: 17rem;

  .ant-descriptions-item-content {
    display: inline-flex;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
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
  margin-top: 3.5rem;
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
const menu = (
  <Menu>
    <Menu.Item key='1'>Splitting</Menu.Item>
    <Menu.Item key='2'>Lend</Menu.Item>
    <Menu.Item key='3'>mortgage</Menu.Item>
  </Menu>
)

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

  return (
    <BundleDetailContainer>
      <LeftArea>
        <ImageContainer>
          <Carousel style={{ width: '22rem', height:'30rem' }}>
            {[
              require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default,
              require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default,
              require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default
            ]
              .map((imgUrl, index) => (
                <div
                  style={ {
                    height: '42.9rem',
                    color: '#fff',
                    background: '#364d79'
                  }}
                  key={index}
                >
                  <img src={imgUrl} alt='' />
                </div>
              ))}
          </Carousel>
          {/* <DescriptionContainer>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Bundle Description</p>
            <p className="createBy">{orders && orders.length > 0 && OrderMakerInfo(orders[0], 'Create by')}</p>
            <p className='createBy'>Create by xxx</p>
            <p>bundle.description</p>
          </DescriptionContainer>*/}
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
            <img src={ Show } alt='' style={{ width:'2.4rem,', height: '1.4rem', display:'flex', alignSelf:'center', marginRight:'0.4rem' }} />
            <div className="info-name">1.2K views</div>
          </div>
        </div>
        <DescriptionContainer>
          <Descriptions.Item>
            This is an art piece that I renounce as the Doge-A-Lisa. It is inspired by Mona Lisa, created by Leonardo da Vinci. I have created this work of art my self hence, this is a limited edition, one of one on the NFT market. Thank you for viewing this, and have a good day :)
          </Descriptions.Item>
        </DescriptionContainer>
        <PriceContainer >
          <div className="bundle-info">
            <div className="item">
              <div className="info-label">Current price</div>
              <div className="price">0.99999</div>
              <div className="price-in-usd">($297.21)</div>
            </div>
            <div className="item">
              <img src={ Favorite } alt='' style={{ width:'2.4rem,', height: '1.4rem', display:'flex', alignSelf:'center', marginRight:'0.4rem' }} />
              <div className="info-name">29 favorites</div>
            </div>
          </div>
        </PriceContainer>
        <ItemsContainer>
          <div className="items">
            <div className="item-border" >
              <div className="item-name" >NFT Contact ID：</div>
              <div className="item-value">{contactId.substring(0,4)}...{contactId.substring(9,16)}</div>
              <div className="item-name" style={{ marginTop:'1.5rem' }} >Token ID：</div>
              <div className="item-value" style={{ marginTop:'1.5rem' }} >21238</div>
            </div>
          </div>
          <div className="items">
            <div className="item-border" >
              <div className="item-name" >Creator&apos;s Address：</div>
              <div className="item-value">{creatorAddress.substring(0,4)}...{creatorAddress.substring(9,16)}</div>
              <div className="item-name" style={{ marginTop:'1.5rem' }} >Owner&apos;s Address：</div>
              <div className="item-value" style={{ marginTop:'1.5rem' }} >{ownerAddress.substring(0,4)}...{creatorAddress.substring(9,16)}</div>
            </div>
          </div>
        </ItemsContainer>
      </RightArea>
      <LeftArea style={{ marginTop: '2rem' }} />
      <RightArea />
    </BundleDetailContainer>
  )
}

export default CollectibleDetailPage
