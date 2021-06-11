import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import styled from 'styled-components'
// @ts-ignore
import LazyLoad from 'react-lazyload'

const NFTItemCardContainer = styled.div`
  color: #7c6deb;
  width: 26.2rem;
  height: 40rem;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2.5rem;
  margin-right: 2.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img, .spin {
    object-fit: cover;
    width: 24.2rem;
    height: 28.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
  }

  .spin {
    position: relative;
    top: 10rem;
  }

  .name {
    margin-bottom: 1.5rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .like {
    display: flex;
    align-items: center;

    .heart {
      margin-right: 0.5rem;
    }
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
  const [loading, setLoading] = useState(true)

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

  const ApproveVoteButton: React.FC = () => {
    return (
      <Button
        style={{
          position: 'absolute',
          right: '3.7rem',
          top: '2.4rem',
          width: '10.9rem',
          height: '3rem',
          color: 'white',
          borderRadius: '1rem',
          fontSize: '1.2rem',
          fontWeight: 500,
          border: 'none',
          backgroundColor: '#829FF2'
        }}
      >
        Approve Vote
      </Button>
    )
  }

  const routeToDetailPage = () => {
    const url = `/collectible/${data.name}?` + new URLSearchParams({
      uri: data.valueUri,
      addressContract: data.addressContract,
      type
    }).toString()
    window.open(url)
  }

  useEffect(() => {
    setLoading(true)
  }, [data])

  return (
    <div style={{ position: 'relative' }}>
      <CornerFlag />
      <ApproveVoteButton />
      <NFTItemCardContainer>
        <div style={{ cursor: 'pointer' }} onClick={routeToDetailPage}>
          <LazyLoad>
            <img
              style={{ display: loading ? 'none' : '' }}
              key={data.id}
              src={data.image}
              alt=""
              onLoad={() => setTimeout(() => setLoading(false), 1500)}
              onError={() => setLoading(false)}
            />
          </LazyLoad>
          {
            loading && <Spin className="spin" />
          }
          <div className="name">{data?.name}</div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
            <div className="like">
              <HeartOutlined className="heart" />5
            </div>
            <div className="price">5 ETH</div>
          </div>
        </div>
      </NFTItemCardContainer>
    </div>
  )
}


export default NFTListItem
