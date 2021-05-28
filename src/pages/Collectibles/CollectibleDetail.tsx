import React from 'react'

import styled from 'styled-components'
import { Button, Carousel, Dropdown, Menu, Table } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import { banksyJsConnector } from '../../BanksyJs/banksyJsConnector'

const BundleDetailContainer = styled.div`
  color: black;
  display: flex;
`

const LeftArea = styled.div`
  height: 500px;
  flex: 3;
  display: flex;
  flex-direction: column;
`

const RightArea = styled.div`
  height: 500px;
  flex: 7;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DescriptionContainer = styled.div`
  width: 22rem;
  padding: 15px 8px;
  box-shadow: 1px 1px 6px 0 rgba(102, 102, 102, 0.8);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

const PriceContainer = styled.div`
  width: 700px;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px 0 rgba(102, 102, 102, 0.8);

  p:nth-of-type(1) {
    font-size: 20px;
    color: #95a5a6;
  }

  p:nth-of-type(2) {
    font-size: 28px;
    font-weight: bold;
  }

  .dropDownButton {
    width: 200px;
    color: #fff;
    border-radius: 8px;
    font-weight: bold;
    background: linear-gradient(to right, #74b9ff, #0984e3);
  }
`

const BundleName = styled.div`
  font-size: 38px;
  font-weight: bold;
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
  width: 700px;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px 0 rgba(102, 102, 102, 0.8);

  .items {
    font-size: 20px;
    font-weight: bold;
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
  banksyJsConnector.banksyJs.OpenSea.uri('13073724248939021555766033205546005650468949582365136648279053434500902027265')
  return (
    <BundleDetailContainer>
      <LeftArea>
        <ImageContainer>
          <Carousel style={{ width: '22rem' }}>
            {[
              require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default,
              require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default,
              require('../../assets/SolibleNfts/assets/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif').default
            ]
              .map((imgUrl, index) => (
                <div
                  style={ {
                    height: '160px',
                    color: '#fff',
                    background: '#364d79'
                  }}
                  key={index}
                >
                  <img src={imgUrl} style={{ height: '22rem', margin: 'auto' }} alt='' />
                </div>
              ))}
          </Carousel>
          <DescriptionContainer>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Bundle Description</p>
            {/*<p className="createBy">{orders && orders.length > 0 && OrderMakerInfo(orders[0], 'Create by')}</p>*/}
            <p className='createBy'>Create by xxx</p>
            <p>bundle.description</p>
          </DescriptionContainer>
        </ImageContainer>
      </LeftArea>
      <RightArea>
        <BundleName>bundle.name</BundleName>
        <PriceContainer>
          <p>Current Price</p>
          <p>Ξ bundleCurrentPrice</p>
          <Dropdown className='dropDownButton' overlay={menu}>
            <Button>
              Buy Bundle <DownOutlined />
            </Button>
          </Dropdown>
        </PriceContainer>
        <ListingsContainer>
          <p>Listings</p>
          <Table dataSource={[{}, {}, {}]} pagination={false} sticky={true} scroll={{ y: 200 }}>
            <Column title='From' dataIndex='from' key='from' />
            <Column title='Price' dataIndex='price' key='price' />
            <Column title='Expiration' dataIndex='expiration' key='expiration' />
          </Table>
        </ListingsContainer>
        <ItemsContainer>
          <p className='items'>xxx Items</p>
          {[{}, {}, {}].map((_, index) => (
            <AssetItemCard key={index} />
          ))}
        </ItemsContainer>
      </RightArea>
    </BundleDetailContainer>
  )
}

export default CollectibleDetailPage
