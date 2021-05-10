import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Carousel, Table } from 'antd'
import openSeaService from '../_services/openSeaService'
import { OpenSeaAsset, OpenSeaAssetBundle } from 'opensea-js/lib/types'
import { useOrdersQuery, useQueryBundleCurrentPrice } from './bundlesPageData'
import Column from 'antd/lib/table/Column'
import { weiToString } from '../web3/utils'
import './BundledDetail.css'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const BundleDetailContainer = styled.div`
  width: calc(100% - 320px);
  height: 100%;
  position: absolute;
  top: 120px;
  left: 320px;
  display: flex;
  overflow: auto;
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

const carouselContentStyle = {
  height: '160px',
  color: '#fff',
  // lineHeight: '160px',
  background: '#364d79'
}

const DescriptionContainer = styled.div`
  width: 22rem;
  padding: 15px 8px;
  box-shadow: 1px 1px 6px 0px rgba(102, 102, 102, 0.8);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

const PriceContainer = styled.div`
  width: 700px;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px 0px rgba(102, 102, 102, 0.8);

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
  box-shadow: 1px 1px 6px 0px rgba(102, 102, 102, 0.8);

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
  box-shadow: 1px 1px 6px 0px rgba(102, 102, 102, 0.8);

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
    <Menu.Item key="1">Splitting</Menu.Item>
    <Menu.Item key="2">Lend</Menu.Item>
    <Menu.Item key="3">mortgage</Menu.Item>
  </Menu>
)

const AssetItemCard: React.FC<{ asset: OpenSeaAsset }> = ({ asset }) => {
  return (
    <ItemCardContainer>
      <img src={asset.imageUrl} style={{ height: 70, width: 70, borderRadius: 8 }} alt={asset.name} />
      <div className="itemCardContainer-text">
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => window.open(`https://opensea.io/collection/${asset.collection.name}`)}
        >
          {asset.collection.name}
        </p>
        <p>{asset.name}</p>
      </div>
    </ItemCardContainer>
  )
}

const BundleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  const [bundle, setBundle] = useState<OpenSeaAssetBundle | null>()

  const { orders } = useOrdersQuery(slug)
  const { bundleCurrentPrice } = useQueryBundleCurrentPrice(slug)

  const getBundle = useCallback(async () => {
    setBundle(await openSeaService.api.getBundle({ slug }))
  }, [])

  useEffect(() => {
    getBundle()
  }, [getBundle])

  const OrderMakerInfo = (order: any, namePrefix?: string) => {
    const { maker } = order
    const { imageUrl } = maker
    const address = maker.user.publicUsername ?? maker.address
    const from = maker.user.publicUsername ?? maker.address(2, 8)

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {namePrefix && <div style={{ marginRight: 8 }}>{namePrefix}</div>}
        <a href={`https://opensea.io/accounts/${address}`} className="createByImg">
          {imageUrl && <MakerAvatar src={imageUrl} alt={from} />}
          {from}
        </a>
      </div>
    )
  }

  const getBundleListings = (ordersOfBundle: any[] | undefined) => {
    return (
      ordersOfBundle?.map(order => {
        return {
          from: OrderMakerInfo(order),
          price: `Ξ ${weiToString(order.takerAssetBundle.assetQuantities.edges[0].node.quantity)}`,
          expiration: order.closedAt,
          key: order.id
        }
      }) ?? []
    )
  }

  return (
    <BundleDetailContainer>
      <LeftArea>
        <ImageContainer>
          <Carousel style={{ width: '22rem' }}>
            {bundle?.assets
              .map(asset => asset.imageUrl)
              .map((imgUrl, index) => (
                <div style={carouselContentStyle} key={index}>
                  <img src={imgUrl} style={{ height: '22rem', margin: 'auto' }} alt="" />
                </div>
              ))}
          </Carousel>
          <DescriptionContainer>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Bundle Description</p>
            <p className="createBy">{orders && orders.length > 0 && OrderMakerInfo(orders[0], 'Create by')}</p>
            <p>{bundle?.description}</p>
          </DescriptionContainer>
        </ImageContainer>
      </LeftArea>
      <RightArea>
        <BundleName>{bundle?.name}</BundleName>
        {bundleCurrentPrice && (
          <PriceContainer>
            <p>Current Price</p>
            <p>Ξ {bundleCurrentPrice}</p>
            <Dropdown className="dropDownButton" overlay={menu}>
              <Button>
                Buy Bundle <DownOutlined />
              </Button>
            </Dropdown>
          </PriceContainer>
        )}
        <ListingsContainer>
          <p>Listings</p>
          <Table dataSource={getBundleListings(orders)} pagination={false} sticky={true} scroll={{ y: 200 }}>
            <Column title="From" dataIndex="from" key="from" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column title="Expiration" dataIndex="expiration" key="expiration" />
          </Table>
        </ListingsContainer>
        <ItemsContainer>
          <p className="items">{bundle?.assets?.length} Items</p>
          {bundle?.assets?.map(asset => (
            <AssetItemCard asset={asset} key={asset.tokenId} />
          ))}
        </ItemsContainer>
      </RightArea>
    </BundleDetailContainer>
  )
}

export default BundleDetailPage
