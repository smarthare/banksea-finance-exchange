import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocationQuery } from '../../utils'
import { NftDetailFavorite } from '../../utils/banksyNftList'
import { CopyOutlined } from '@ant-design/icons'
import Show from '@/assets/images/show.png'
import Favorite from '@/assets/images/favorite.png'
import { Button } from 'antd'
import Page from '../../components/coinEcharts'

const NFTMortgageDetailContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 10rem;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const LeftArea = styled.div`
  width: 35.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 1.3rem;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 31.2rem;
  height: 34.4rem;
  border-radius: 2rem;
  justify-content: center;
  position: relative;
  border: 1px solid #98BDF9;

  img {
    max-height: 34.4rem;
    border-radius: 2rem;
  }
`

const RightArea = styled.div`
  width: 53.9rem;
  margin-left: 1.3rem;
  position: relative;
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

const NFTBaseInfoContainer = styled.div`
  .nft-name {
    font-size: 4.5rem;
    font-weight: 550;
    color: #98BDF9;
  }

  .description {
    margin-top: 1.2rem;
    height: 12.5rem;
    overflow-y: scroll;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
  }

  .info-row {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-label {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        user-select: none;
      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #98BDF9;
        cursor: pointer;
      }


    }
  }

  .info-row-favorite {
    display: flex;
    justify-content: flex-end;
    margin-top: 6rem;

    .info-row-item-value {
      display: flex;
      justify-content: flex-end;
    }

    .icon-favorite {
      width: 2rem;
      height: 1.2rem;
      display: flex;
      align-self: center;
      margin-right: 0.4rem;
    }


  }

  .price-favorite-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    div {
      display: flex;
      color: #98BDF9;
      font-weight: 550;
    }

    .price {
      align-items: flex-end;
      line-height: 2.1rem;

      .price-label {
        font-size: 1.6rem;
        font-weight: bold;
        color: #98BDF9;
        margin-right: 0.8rem;
      }

      .price-value {
        font-size: 1.6rem;
      }
    }

    .info-name {
      display: flex;
      justify-content: flex-end;
      font-size: 1.6rem;
    }

  }
`

const ItemsContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  .item {
    width: 25.9rem;
    height: 9.2rem;
    background: #305099;
    border-radius: 1rem;

    padding: 2rem 1.1rem;
    flex-wrap: wrap;

    .row {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 1.2rem;
        font-weight: 500;
        color: #B3B3B3;
        line-height: 1.7rem;

      }

      .value {
        font-size: 1.2rem;
        font-weight: 550;
        color: white;
        line-height: 17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
`

const EvaluateMain = styled.div`
  width: 92.2rem;
  height: 60rem;
  margin-left: calc((100% - 92.2rem) / 2);
  background: #101D44;
  border-radius: 2rem;
  margin-top: 3rem;
`

const EvaluateButton = styled(Button)`
  width: 16.9rem;
  height: 5.2rem;
  margin-left: calc((100% - 19.1rem) / 2);
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const EvaluateStatistics = styled.div`
  width: 86rem;
  padding: 1rem 3rem;
  border: 1px solid #fff;
  margin-left: 3.1rem;
  margin-top: 7rem;
`

const ComfirmButton = styled(Button)`
  width: 16.9rem;
  height: 5.2rem;
  margin-left: calc((100% - 19.1rem) / 2);
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`


const ETHIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/eth.svg').default}
      alt="ETH"
      style={{ width: '1.2rem', marginRight: '0.8rem' }}
    />
  )
}

const NFTMetadata: React.FC = () => {

  return (
    <ItemsContainer>
      <div className="item">
        <div className="row">
          <div className="label">NFT Contract ID：</div>
          <div className="value">
            0x312....3123
          </div>
        </div>
        <div className="row">
          <div className="label" style={{ marginTop: '1.5rem' }}>Token &nbsp;ID：</div>
          <div className="value" style={{ marginTop: '1.5rem' }}>
            0x312....3123
          </div>
        </div>
      </div>
      <div className="item">
        <div className="row">
          <div className="label">Creator&apos;s Address：</div>
          <div className="value">
            0x312....3123
          </div>
        </div>
        <div className="row">
          <div className="label" style={{ marginTop: '1.5rem' }}>Owner&apos;s Address：</div>
          <div className="value" style={{ marginTop: '1.5rem' }}>
            0x312....3123
          </div>
        </div>
      </div>
    </ItemsContainer>
  )
}

const NFTBaseInfo: React.FC = () => {
  const uri = useLocationQuery('uri')

  const [likeNum, setLikeNum] = useState<any>()

  const fetchLikeCount = useCallback(async () => {
    NftDetailFavorite(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  return (
    <NFTBaseInfoContainer>
      <div className="nft-name">
        Scottlin
      </div>
      <div className="info-row">
        <div className="info-row-item">
          <div className="info-row-item-label">Artist</div>
          <div className="info-row-item-value">
            0x211....3123
          </div>
          <CopyOutlined className="icon-copy" />
        </div>
        <div className="info-row-item">
          <div className="info-row-item-label">Owner</div>
          <div className="info-row-item-value">
            0x211....3123
          </div>
          <CopyOutlined className="icon-copy" />
        </div>
      </div>
      <div className="info-row-favorite">
        <img
          src={Show}
          alt=""
          className="icon-favorite"
        />
        <div className="info-row-item-value" >0</div>
      </div>

      {/*<div className="description">
        {nftDetail?.description}
      </div>*/}
      <PriceContainer>
        <div className="price-favorite-row">
          <div className="price">
            <span className="price-label">Current Price</span>
            <ETHIcon />
            <span className="price-value">
              - - -
            </span>
            {/*<div className="price-in-usd">($297.21)</div>*/}
          </div>
          <div>
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
            <div className="info-name">{likeNum?.favorite}</div>
          </div>
        </div>
      </PriceContainer>
    </NFTBaseInfoContainer>)
}

const EvaluateContainer:React.FC = () => {
  return (
    <EvaluateMain>
      <EvaluateButton>Evaluate</EvaluateButton>
      <EvaluateStatistics>
        <Page />
      </EvaluateStatistics>
      <ComfirmButton>Comfirm</ComfirmButton>
    </EvaluateMain>
  )
}

const NFTMortgageDetailPage:React.FC = () => {
  return (
    <NFTMortgageDetailContainer>
      <Row>
        <LeftArea>
          <ImageContainer>
            <img />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <NFTBaseInfo />
          <NFTMetadata />
        </RightArea>
      </Row>
      <EvaluateContainer />
    </NFTMortgageDetailContainer>
  )
}

export default NFTMortgageDetailPage
