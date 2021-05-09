import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Carousel, Table } from 'antd'
import openSeaService from '../_services/openSeaService'
import { OpenSeaAsset, OpenSeaAssetBundle } from 'opensea-js/lib/types'
import { useOrdersQuery, useQueryBundleCurrentPrice } from './bundlesPageData'
import Column from 'antd/lib/table/Column'
import { weiToString } from '../web3/utils'

const BundleDetailContainer = styled.div`
  width: calc(100% - 320px);
  height: 100%;
  position: absolute;
  top: 110px;
  left: 320px;
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

const carouselContentStyle = {
  height: '160px',
  color: '#fff',
  // lineHeight: '160px',
  background: '#364d79'
}

const DescriptionContainer = styled.div`
  width: 80%;
  border: #000c17 1px;
`

const PriceContainer = styled.div``

const BundleName = styled.div``

const ListingsContainer = styled.div``

const MakerAvatar = styled.img`
  width: 15px;
  height: 15px;
`

const ItemsContainer = styled.div``

const ItemCardContainer = styled.div`
  display: flex;
`

const AssetItemCard: React.FC<{ asset: OpenSeaAsset }> = ({ asset }) => {
  return (
    <ItemCardContainer>
      <img src={asset.imageUrl} style={{ height: 50, width: 50 }} alt={asset.name} />
      <div>
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
      <div style={{ display: 'flex' }}>
        {namePrefix && <div style={{ marginRight: 8 }}>{namePrefix}</div>}
        <a href={`https://opensea.io/accounts/${address}`} style={{ display: 'flex' }}>
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
          <Carousel style={{ height: '15rem', width: '15rem' }}>
            {bundle?.assets
              .map(asset => asset.imageUrl)
              .map((imgUrl, index) => (
                <div style={carouselContentStyle} key={index}>
                  <img src={imgUrl} style={{ height: '15rem' }} alt="" />
                </div>
              ))}
          </Carousel>
          <DescriptionContainer>
            <p>Bundle Description</p>
            <p>{orders && orders.length > 0 && OrderMakerInfo(orders[0], 'Create by')}</p>
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
          <p>{bundle?.assets?.length} Items</p>
          {bundle?.assets?.map(asset => (
            <AssetItemCard asset={asset} key={asset.tokenId} />
          ))}
        </ItemsContainer>
      </RightArea>
    </BundleDetailContainer>
  )
}

export default BundleDetailPage
