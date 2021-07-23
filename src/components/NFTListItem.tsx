import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import styled from 'styled-components'
// @ts-ignore
// import LazyLoad from 'react-lazyload'
import { useWalletSelectionModal } from '../contexts/WalletSelectionModal'
import { useWeb3EnvContext } from '../contexts/Web3EnvProvider'
import PriceIcon from '@/assets/images/homePageImg/price-icon.svg'
import { ChainType, setNftFavorite } from '../apis/nft'

const NFTItemCardContainer = styled.div`
  color: #7c6deb;
  width: 26rem;
  height: 37rem;
  background-color: #111C3A;
  border-radius: 1rem;
  margin-bottom: 3rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img-container {
    width: 26.2rem;
    height: 28.5rem;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  img {
    object-fit: cover;
    width: 25.9rem;
    margin-bottom: 1.5rem;
    transition: all 1s;
    z-index: 0;

    :hover {
      transform: scale(1.1);
    }
  }

  .spin {
    position: relative;
    top: 10rem;
    height: 18.5rem;
  }

  .name {
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

  @media screen and (max-width: 1000px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
`

const ChainFlag = styled.span`
  display: flex;
  align-items: center;
  color: #7c6deb;
  border: 1px #7c6deb solid;
  height: 2rem;
  padding: 0.1rem 0.2rem;
  margin-right: 0.4rem;
  border-radius: 0.4rem;
`

// eslint-disable-next-line no-unused-vars
const TypeChainThumbnailMapper: { [key in ChainType]?: string } = {
  'Ethereum': 'Eth',
  'Solana': 'Sol'
}

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

  useEffect(() => {
    if (!loading) {
      return
    }
    const img = new Image(imageUrl())
    if (img.complete) {
      setLoading(false)
    }
  }, [loading])

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
          backgroundSize: 'cover',
          zIndex: 9,

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
        setNftFavorite(data?.valueUri)
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
        <Link to={detailUrl}
          target={'_blank'}
        >
          <div className="img-container">
            {/*<LazyLoad>*/}
            <img
              style={{
                display: loading || error ? 'none' : '',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
                height: '100%'
              }}
              alt={data.name}
              onLoad={() => {
                setLoading(false)
              }}
              onError={() => {
                setLoading(false)
                setError(true)
              }}
              src={imageUrl()}
            />
            {/*</LazyLoad>*/}
            {
              loading && <Spin className="spin" />
            }
            {
              error && <Spin className="spin" />
            }
          </div>
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 2rem',
          }}
        >
          {
            data && <ChainFlag>{TypeChainThumbnailMapper[data.typeChain as ChainType]}</ChainFlag>
          }
          <div className="name">{data?.name}</div>
          <div>
            <div className="like"
              onClick={favoriteHandle}
            >
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
