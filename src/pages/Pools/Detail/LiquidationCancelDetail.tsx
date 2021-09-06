import React from 'react'
import styled from 'styled-components'
import { CopyOutlined } from '@ant-design/icons'
import { Button, Statistic } from 'antd'
import myDashboard1 from '../../../assets/images/mockImg/myDashboard1.png'
import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
import { useRequestingModal } from '../../../hooks/modals/stateModals/useRequestingModal'

const NFTMortgageDetailContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 30rem;
`

const Row = styled.div`
  display: flex;
  justify-content: center;

  .time {
    width: 100%;
    position: relative;

    .ant-statistic-content-value {
      position: absolute;
      right: 1rem ;
      color: #fff;
      font-weight: bolder;
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
  width: 22.2rem;
  height: 28.4rem;
  padding: 0.5rem;
  position: relative;
  border: 1px solid #98BDF9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const RightArea = styled.div`
  width: 30.9rem;
  margin-left: 1.3rem;
  position: relative;
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
    margin-top: 2rem;
    padding: 1rem 0;

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

const StatisticsContainer = styled.div`
  width: 100%;
  height: 26rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-bottom: 1.4rem;
  margin-top: 2rem;
`

const AreaTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00D4D7, #5D00B3);
`

const StatisticsMain = styled.div`

`

const ScheduleFirst = styled.div`
  text-align: center;
  width: 60rem;
  margin-top: 2rem;
  margin-left: calc((100% - 60rem) / 2);

  .title {
    color: #F172ED;
    font-size: 2rem;
    font-weight: bolder;
    margin-bottom: 2rem;
  }

  .main-title {
    font-weight: bolder;
    font-size: 1.7rem;
    color: #fff;
    margin-bottom: 2rem;
  }
`

const ConfirmButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 1rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const Statistics:React.FC = () => {

  const { requestingModal, openRequestingModal } = useRequestingModal()

  const prepay = () => {
    openRequestingModal()
  }

  return (
    <StatisticsContainer>
      <AreaTitle>Historical price</AreaTitle>
      <Line />
      <StatisticsMain>
        <DepositAPY />
      </StatisticsMain>
      <ScheduleFirst>
        <div className="title">Cancel overview</div>
        <div className="main-title">
          Are you sure you want to cancel this NFT prepaid ?
        </div>
        <ConfirmButton onClick={prepay}>Cancel</ConfirmButton>
      </ScheduleFirst>
      {requestingModal}
    </StatisticsContainer>
  )
}

const NFTBaseInfo:React.FC = () => {

  return (
    <NFTBaseInfoContainer>
      <div className="nft-name">
        CryptoPunk #8761
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

const LiquidationCancelDetailPage:React.FC = () => {

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

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
        <div className="time">
          <Countdown value={deadline} />
        </div>
      </Row>
      <Statistics />
    </NFTMortgageDetailContainer>
  )
}

export default LiquidationCancelDetailPage
