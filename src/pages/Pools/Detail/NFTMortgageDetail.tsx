import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocationQuery } from '../../../utils'
import { CopyOutlined } from '@ant-design/icons'
import { Statistic } from 'antd'
import HistoricalRates from '../../../components/EchartsStatistics/HistoricalRates'
import myDashboard1 from '../../../assets/images/mockImg/myDashboard1.png'
import { banksyNftDetail, getNftFavoriteCount } from '../../../apis/nft'
import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
import { useHistory, useParams } from 'react-router-dom'

const NFTMortgageDetailContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 10rem;
`

const Row = styled.div`
  display: flex;
  justify-content: center;

  .statistics {
    width: 50rem;
    position: relative;

    .ant-statistic-content-value {
      position: absolute;
      right: 10rem;
      color: #fff;
    }
  }
`

const LeftArea = styled.div`
  width: 26.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 1.3rem;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22.2rem;
  height: 28.4rem;
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
  width: 30.9rem;
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

const NeuralNetworks = styled.div`
  position: relative;

  .NeuralNetworksMain {

    .networksValue-name {
      color: #98BAF2;
      font-size: 2rem;
      margin-top: 1rem;
    }

    .networksValue-value {
      color: #fff;
      font-size: 2.4rem;
      font-weight: bolder;
    }
  }
`

const NFTBaseInfo: React.FC = () => {
  const uri = useLocationQuery('uri')

  const [likeNum, setLikeNum] = useState<any>()

  const fetchLikeCount = useCallback(async () => {
    getNftFavoriteCount(uri).then(res => {
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
      </div>
      <NeuralNetworks>
        <div className="NeuralNetworksMain">
          <div className="networksValue-name">Evaluation Value</div>
          <div className="networksValue-value">$ 78,983</div>
          <div className="networksValue-name">Mortgage Rate</div>
          <div className="networksValue-value">43.7%</div>
        </div>
      </NeuralNetworks>
    </NFTBaseInfoContainer>
  )
}
const { Countdown } = Statistic
const NFTMortgageDetailPage:React.FC = () => {

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

  const history = useHistory()

  const { uri } = useParams<any>()

  const [data, setData] = useState<any>()

  const init = useCallback(async () => {
    banksyNftDetail({
      uri: uri,
    }).then(res => {
      setData(res.data.data)
    })
  },[])

  useEffect(() => {
    init()
  },[init])

  return (
    <NFTMortgageDetailContainer>
      <Row>
        <LeftArea>
          <ImageContainer>
            <img src={myDashboard1} alt="" />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <NFTBaseInfo />
        </RightArea>
        <div className="statistics">
          <Countdown value={deadline} />
        </div>
      </Row>
    </NFTMortgageDetailContainer>
  )
}

export default NFTMortgageDetailPage
