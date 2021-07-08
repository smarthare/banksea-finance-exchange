import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
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

  img, .spin {
    object-fit: cover;
    width: 26.2rem;
    height: 28.5rem;
    margin-bottom: 1.5rem;

  }

  .spin {
    position: relative;
    top: 10rem;
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

const NFTListItem: React.FC<{data: any, type: 'nftList' | 'own'}> = ({ data, type }) => {

  const [clickFavorite, setClickFavorite] = useState<number>(data?.favorite)

  const { providerInitialized } = useWeb3EnvContext()

  const [loading, setLoading] = useState(true)

  const { open: openWalletSelectionModal } = useWalletSelectionModal()

  const [, setImage] = useState<any>()

  const [isHeart, setHeart] = useState<boolean>(false)

  if (data?.image?.slice(28) === 'https://gateway.pinata.cloud') {
    setImage(`https://banksy.mypinata.cloud${data?.image.slice(-52)}`)
  }

  const CornerFlag: React.FC = () => {
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
        on Sale
      </div>
    )
  }

  const url = '/collectible/nftdetail?' + new URLSearchParams({
    id: data.name,
    uri: data.valueUri,
    addressContract: data.addressContract,
    type
  }).toString()


  useEffect(() => {
    setLoading(true)
    // console.log(data.image)
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
          <CornerFlag />:
          <div />
      }
      <NFTItemCardContainer>
        <div style={{ cursor: 'pointer' }}>
          <Link to={url} target={'_blank'}>
            <LazyLoad>
              <img
                style={{ display: loading ? 'none' : '', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                key={data.id}
                src={data?.thumbnail ? data?.thumbnail : data?.image}
                alt=""
                onLoad={() => setTimeout(() => setLoading(false), 1500)}
                onError={() => setLoading(false)}
              />
            </LazyLoad>
            {
              loading && <Spin className="spin" />
            }
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2rem', marginTop:'1.2rem' }}>
              <div className="name">{data?.name}</div>
              <div>
                <div className="like" onClick={favoriteHandle}>
                  {
                    isHeart
                      ?<HeartFilled className="heart" />
                      :<HeartOutlined className="heart" />
                  }
                  {clickFavorite ? clickFavorite : 0}
                </div>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: ' 0 2rem', flexDirection:'row' }}>
              <div className="artist-name"> {data?.nameArtist} </div>

              <div>
                <div className="price">
                  <img src={PriceIcon}
                    style={{
                      width:'1.2rem',
                      height:'1.8rem',

                    }}
                  />
                  <div className="price-value"> {data?.price} </div>
                </div>
              </div>



            </div>



          </Link>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.4rem' }}>

            <div className="price">
              {data?.price ? `${data?.price}ETH` : ''}
            </div>
          </div>
        </div>
      </NFTItemCardContainer>
    </div>
  )
}


export default NFTListItem
