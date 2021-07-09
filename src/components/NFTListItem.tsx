import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import styled from 'styled-components'
// @ts-ignore
import LazyLoad from 'react-lazyload'
import { useWalletSelectionModal } from '../contexts/WalletSelectionModal'
import { useWeb3EnvContext } from '../contexts/Web3EnvProvider'
import { NftFavorite } from '../utils/banksyNftList'
import PriceIcon from '@/assets/images/homePageImg/price-icon.svg'

const NFTItemCardContainer = styled.div`
  color: #7c6deb;
  width: 26.2rem;
  height: 40rem;
  background-color: #111C3A;
  border-radius: 10px;
  margin-bottom: 2.5rem;
  margin-right: 2.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img-container {
    width: 26.2rem;
    height: 28.5rem;
    display: flex;
    justify-content: center;
  }

  img {
    object-fit: cover;
    width: 26.2rem;
    height: 28.5rem;
    margin-bottom: 1.5rem;
  }

  .spin {
    position: relative;
    top: 10rem;
    height: 18.5rem;
  }

  .name {
    margin-bottom: 1.5rem;
    width: 100%;
    overflow: hidden;
    color: white;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .artist-name {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    overflow: hidden;
    color: #999999;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .like {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;

    .heart {
      margin-right: 0.5rem;
      color: white;
    }
  }

  .price {
    display: flex;
    align-items: center;
    align-self: center;
    color: white;
  }

  .price-value {
    margin-bottom: 1.2rem;
    margin-left: 0.7rem;
  }

  .button {
    width: 100%;
    height: 4rem;
    border-radius: 1rem;
    background-color: #7c6deb;
    color: white;
    font-weight: 500;
  }
`

const NFTListItem: React.FC<{ data: any, type: 'nftList' | 'own' }> = ({ data, type }) => {
  const [clickFavorite, setClickFavorite] = useState<number>(data?.favorite)

  const { providerInitialized } = useWeb3EnvContext()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isHeart, setHeart] = useState<boolean>(false)

  const { open: openWalletSelectionModal } = useWalletSelectionModal()

  const imageUrl = useCallback(() => {
    const url = data?.image ?? data?.thumbnail

    if (url?.startsWith('https://gateway.pinata.cloud')) {
      return `https://banksy.mypinata.cloud${data?.image.slice(-52)}`
    }

    return url
  }, [data])

  const CornerFlag: React.FC<{ status: 'On Sale' | 'On Auction' }> = ({ status }) => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '-1rem',
          left: '-0.45rem',
          color: 'white',
          fontWeight: 500,
          textAlign: 'center',
          lineHeight: '3rem',
          width: '8.5rem',
          height: '3.7rem',
          backgroundImage: `url(${require('../assets/images/collectibles-item-corner-flag-bg.png').default})`,
          backgroundSize: 'cover'
        }}
      >
        {status}
      </div>
    )
  }

  const detailUrl = '/collectible/nftdetail?' + new URLSearchParams({
    id: data.name,
    uri: data.valueUri,
    addressContract: data.addressContract,
    type
  }).toString()

  useEffect(() => {
    setLoading(true)
  }, [data])

  const favoriteHandle = () => {
    if (!providerInitialized) {
      openWalletSelectionModal()
    } else {
      if (isHeart) {
        setClickFavorite(clickFavorite)
      } else {
        NftFavorite(data?.valueUri)
        setClickFavorite(clickFavorite + 1)
        setHeart(true)
      }
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {
        data.onSale ?
          <CornerFlag status="On Sale" /> :
          <div />
      }
      <NFTItemCardContainer>
        <Link to={detailUrl} target={'_blank'}>
          <div className="img-container">
            <LazyLoad>
              <img
                style={{ display: loading || error ? 'none' : '', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                key={data.id}
                src={imageUrl()}
                alt=""
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false)
                  setError(true)
                }}
              />
            </LazyLoad>
            {
              loading && <Spin className="spin" />
            }
            {
              error && <Spin className="spin" />
            }
          </div>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2rem', marginTop: '1.2rem' }}>
          <div className="name">{data?.name}</div>
          <div>
            <div className="like" onClick={favoriteHandle}>
              {
                isHeart
                  ? <HeartFilled className="heart" />
                  : <HeartOutlined className="heart" />
              }
              {clickFavorite ? clickFavorite : 0}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: ' 0 2rem', flexDirection: 'row' }}>
          <div className="artist-name"> {data?.nameArtist} </div>
          <div>
            <div className="price">
              <img
                src={PriceIcon}
                style={{
                  width: '1.2rem',
                  height: '1.8rem'
                }}
                alt=""
              />
              <div className="price-value"> {data?.price} </div>
            </div>
          </div>
        </div>
        {/*<div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
            <div className="price">
              {data?.price ? `${data?.price}ETH` : ''}
            </div>
          </div>
        </div>*/}
      </NFTItemCardContainer>
    </div>
  )
}

export default NFTListItem
