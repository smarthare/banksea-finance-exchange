import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import VariableAPY from '../../../components/EchartsStatistics/VariableAPY'
import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
import UtilisationRate from '../../../components/EchartsStatistics/UtilisationRate'
import myDashboard1 from '../../../assets/images/mockImg/myDashboard1.png'
import myDashboard2 from '../../../assets/images/mockImg/myDashboard2.png'
import myDashboard3 from '../../../assets/images/mockImg/myDashboard3.png'
import { Button } from 'antd'


const MortgagePoolDetailMain = styled.div`
  min-height: 100vh;
  width: 130rem;
  margin-left: calc((100% - 130rem) /2);
  padding-top: 4rem;

  p {
    margin: 0;
  }
`

const MortgageDetailSeriesTop = styled.div`
  width: 130rem;
  margin-left: calc((100% - 130rem) / 2);

  .mainSeries {
    display: flex;
    margin-top: 2rem;

    .mainSeries-Img {
      width: 12rem;
      height: 12rem;
      background: gray;
    }

    .mainSeries-title {
      font-size: 2.4rem;
      margin-left: 2rem;
      color: #fff;
    }
  }
`

const BackIconButton = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #284779;
  transition: all 0.7s;

  &:hover {
    background: #6C48FF;
  }
`

const IndexValueStatisticsMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 4rem;

  .indexValueStatistics-item {
    width: 42rem;
    height: 18rem;
    background: #101D44;
    border-radius: 1.5rem;

    .statistics-container {
      padding: 0 2rem;
      margin-top: -3rem;
    }
  }
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const StatisticsTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`

const NFTMortgagesLiquidation = styled.div`
  width: 100%;
  height: 48rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-bottom: 1.4rem;
`

const NFTLiquidationMortgagesMain = styled.div`
  width: 135.6rem;
  display: flex;
  padding: 3rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  .mortgages-item {
    width: 16.2rem;
    height: 37rem;
    border-radius: 1rem;
    background: #3658A7;
    margin-left: 3.3rem;

    .mortgages-item-image {
      height: 17rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;

      img {
        object-fit: cover;
        width: 18.2rem;
        height: 100%;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }

    .mortgages-item-text {
      padding: 1rem 1rem;

      .mortgages-item-text-name {
        color: #fff;
      }
    }
  }
`

const AreaTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const MortgagesItemText = styled.div`
  margin-top: 0.5rem;

  .message-name {
    color: #85A9E7;
  }

  .message-number {
    font-size: 1.7rem;
    font-weight: bolder;
    color: #fff;
  }
`

const WithdrawButton = styled(Button)`
  width: 12.7rem;
  height: 3.7rem;
  margin-left: calc((100% - 12.7rem) / 2);
  background: #6C48FF;
  color: #fff;
  border-radius: 1rem;
  border: none;
  margin-top: 1rem;
  transition: all 0.7s;
  font-size: 1.7rem;
  font-weight: bolder;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`


const BackIcon:React.FC = () => {
  const history = useHistory()
  return (
    <BackIconButton onClick={() => history.goBack()}>
      <LeftOutlined style={{ fontSize: '1.6rem', color: '#fff' }} />
    </BackIconButton>
  )
}

const IndexValueStatistics:React.FC = () => {
  return (
    <IndexValueStatisticsMain>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Mortgage number</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Mortgage rate</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <DepositAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Borrow Rate</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <UtilisationRate />
        </div>
      </div>
    </IndexValueStatisticsMain>
  )
}

const NFTSeriesList:React.FC = () => {
  return (
    <NFTMortgagesLiquidation>
      <AreaTitle>Liquidation prepayment</AreaTitle>
      <Line />
      <NFTLiquidationMortgagesMain>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={myDashboard1} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk 7804</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 6.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">45.7%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={myDashboard2} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk 2140</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 1.1M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">40.7%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={myDashboard3} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk 4156</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 0.9M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Pinggu time:</p>
              <p className="message-number">37.8%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={myDashboard3} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk 4156</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 0.9M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Pinggu time:</p>
              <p className="message-number">37.8%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
      </NFTLiquidationMortgagesMain>
    </NFTMortgagesLiquidation>
  )
}


const MortgagePoolDetailPage:React.FC = () => {
  return (
    <MortgagePoolDetailMain>
      <MortgageDetailSeriesTop>
        <BackIcon />
        <div className="mainSeries">
          <div className="mainSeries-Img">
            <img alt="" />
          </div>
          <div className="mainSeries-title">CryptoPunks</div>
        </div>
      </MortgageDetailSeriesTop>
      <IndexValueStatistics />
      <NFTSeriesList />
    </MortgagePoolDetailMain>
  )
}

export default MortgagePoolDetailPage
