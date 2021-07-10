import React from 'react'
import styled from 'styled-components'
import { LeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { Progress } from 'antd'
import VariableAPY from '../../components/EchartsStatistics/VariableAPY'
import DepositAPY from '../../components/EchartsStatistics/DepositAPY'
import UtilisationRate from '../../components/EchartsStatistics/UtilisationRate'

const StoragePoolMain = styled.div`
  width: 130rem;
  min-height: 100vh;
  margin-left: calc((100% - 130rem) / 2);
  padding-top: 6rem;

  p {
    margin: 0;
  }
`

const ConfigurationMain = styled.div`
  height: 70rem;
  background: #101D44;
  border-radius: 1.5rem;
`

const AreaTitle = styled.div`
  padding: 2rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
  display: flex;
  align-items: center;

  .configuration-top-title {
    margin-left: 3rem;
  }
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
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

const ConfigurationData = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
`

const ProgressMain = styled.div`
  position: relative;
`

const TotalBorrowed = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 30rem;
  margin-right: 3rem;

  .totalBorrowed-title {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;

    div {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1.5rem;
      background: #FFBB00;
      margin-right: 2rem;
    }

    span {
      font-size: 2rem;
      color: #B5B6B7;
      font-weight: bolder;
    }
  }

  .totalBorrowed-number {
    font-size: 2.8rem;
    color: #fff;
    font-weight: bolder;
    position: absolute;
    top: 6rem;
    right: 0;
  }

  .totalBorrowed-dollar {
    font-size: 1.6rem;
    color: #B5B6B7;
    position: absolute;
    top: 10rem;
    right: 0;
  }
`

const ETHIconImg = styled.img`
  width: 5.2rem;
  position: absolute;
  left: calc((100% - 5.2rem) / 2);
  top: calc((100% - 8.352rem) / 2);
`

const AvailableLiquidity = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 30rem;
  margin-left: 3rem;

  .availableLiquidity-title {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;

    div {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1.5rem;
      background: #6C48FF;
      margin-left: 2rem;
    }

    span {
      font-size: 2rem;
      color: #B5B6B7;
      font-weight: bolder;
    }
  }

  .availableLiquidity-number {
    font-size: 2.8rem;
    color: #fff;
    font-weight: bolder;
    position: absolute;
    top: 6rem;
    left: 0;
  }

  .availableLiquidity-dollar {
    font-size: 1.6rem;
    color: #B5B6B7;
    position: absolute;
    top: 10rem;
    left: 0;
  }
`

const ReserveUtilisation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  .reserveUtilisation-item {
    width: 25rem;
    padding: 0.5rem 1rem;
    border: 2px solid #8D9099;
    color: #8D9099;
    border-radius: 1rem;
    position: relative;
    display: flex;

    &:nth-of-type(2) {
      margin-left: 3rem;
    }

    .reserveUtilisation-item-numer {
      position: absolute;
      right: 1rem;
    }
  }
`

const DepositStableVariableMain = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`

const Deposit = styled.div`
  width: 25rem;
  height: 13rem;
  border-radius: 1rem;
  background: #182C58;

  .deposit-top {
    padding: 0.5rem 2rem;
    background: #6C48FF;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: #fff;
  }
`

const DepositStableText = styled.div`
  padding: 1rem 2rem;
`

const DepositStableTextItem = styled.div`
  position: relative;

  &:nth-of-type(2) {
    margin-top: 1rem;
  }

  span:nth-of-type(1) {
    color: #BBBBBB;
  }

  span:nth-of-type(2) {
    color: #fff;
    position: absolute;
    right: 0;
  }
`

const Stable = styled.div`
  width: 25rem;
  height: 13rem;
  border-radius: 1rem;
  background: #182C58;
  margin-left: 1.4rem;

  .stable-top {
    padding: 0.5rem 2rem;
    background: #FFBB00;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: #fff;
  }
`

const Variable = styled.div`
  width: 25rem;
  height: 13rem;
  border-radius: 1rem;
  background: #182C58;
  margin-left: 1.4rem;

  .variable-top {
    padding: 0.5rem 2rem;
    background: #F172ED;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: #fff;
  }
`

const IndexValueMain = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const IndexValueItem = styled.div`
  text-align: center;

  &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5) {
    margin-left: 9rem;
  }

  .indexValue-item-name {
    color: #BBBBBB;
  }

  .indexValue-item-value {
    color: #fff;
    font-weight: bolder;
    font-size: 1.7rem;
  }

  .indexValue-item-yes {
    color: #85CD2E;
    font-weight: bolder;
    font-size: 1.7rem;
  }
  .indexValue-item-no {
    color: #F571BD;
    font-weight: bolder;
    font-size: 1.7rem;
  }
`

const YourInformationMain = styled.div`
  margin-top: 2rem;
  background: #101D44;
  border-radius: 1.5rem;
`

const YourInformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem 3rem;
`

const InformationValues = styled.div`
  width: 50rem;
`

const DepositsValuesItem = styled.div`
  margin-top: 1rem;
  position: relative;

  .depositValues-item-name {
    color: #9FC4FD;
    font-size: 1.7rem;
  }

  .depositValues-item-value {
    color: #fff;
    font-size: 1.7rem;
    font-weight: bolder;
    position: absolute;
    right: 0;
  }

  .depositValues-item-health {
    color: #88D12E;
    font-size: 1.7rem;
    font-weight: bolder;
    position: absolute;
    right: 0;
  }
`

const ColumnLine = styled.div`
  width: 0.1rem;
  height: 20rem;
  background: #fff;
  margin-top: 3rem;
`

const BorrowsValues = styled.div`
  width: 50rem;
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

    .tatistics-container {
      padding: 0 2rem;
      margin-top: -3rem;
    }
  }
`

const StatisticsTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`

const ETHIcon: React.FC = () => {
  return (
    <ETHIconImg
      src={require('../../assets/images/eth.svg').default}
      alt="ETH"
    />
  )
}

const BackIcon:React.FC = () => {
  const history = useHistory()
  return (
    <BackIconButton onClick={() => history.goBack()}>
      <LeftOutlined style={{ fontSize: '1.6rem', color: '#fff' }} />
    </BackIconButton>
  )
}

const IndexValue:React.FC = () => {
  return (
    <IndexValueMain>
      <IndexValueItem>
        <div className="indexValue-item-name">Maximum LYV</div>
        <div className="indexValue-item-value">75.00%</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Maximum LYV</div>
        <div className="indexValue-item-value">75.00%</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Maximum LYV</div>
        <div className="indexValue-item-value">75.00%</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Maximum LYV</div>
        <div className="indexValue-item-yes">Yes</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Maximum LYV</div>
        <div className="indexValue-item-no">No</div>
      </IndexValueItem>
    </IndexValueMain>
  )
}

const DepositStableVariable:React.FC = () => {
  return (
    <DepositStableVariableMain>
      <Deposit>
        <div className="deposit-top">Deposit</div>
        <DepositStableText>
          <DepositStableTextItem>
            <span>Deposit APY</span>
            <span>2.8%</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>Past 30D Avg</span>
            <span>--</span>
          </DepositStableTextItem>
        </DepositStableText>
      </Deposit>
      <Stable>
        <div className="stable-top">Deposit</div>
        <DepositStableText>
          <DepositStableTextItem>
            <span>BorrowAPY</span>
            <span>2.8%</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>Total</span>
            <span>--</span>
          </DepositStableTextItem>
        </DepositStableText>
      </Stable>
      <Variable>
        <div className="variable-top">Deposit</div>
        <DepositStableText>
          <DepositStableTextItem>
            <span>BorrowAPY</span>
            <span>2.8%</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>Total</span>
            <span>--</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>Total</span>
            <span>--</span>
          </DepositStableTextItem>
        </DepositStableText>
      </Variable>
    </DepositStableVariableMain>
  )
}

const YourInformation:React.FC = () => {
  return (
    <YourInformationMain>
      <AreaTitle>Availble to deposit</AreaTitle>
      <Line />
      <YourInformationContainer>
        <InformationValues>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Deposit</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Your wallet balance</span>
            <span className="depositValues-item-value">0.00DAI</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">You already deposited</span>
            <span className="depositValues-item-value">0.00DAI</span>
          </DepositsValuesItem>
        </InformationValues>
        <ColumnLine />
        <BorrowsValues>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Borrows</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Borrowed</span>
            <span className="depositValues-item-value">0.00DAI</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Health factor</span>
            <span className="depositValues-item-health">4.83</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">loan to value</span>
            <span className="depositValues-item-health">45%</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Available to you</span>
            <span className="depositValues-item-health">3.39DAI</span>
          </DepositsValuesItem>
        </BorrowsValues>
      </YourInformationContainer>
    </YourInformationMain>
  )
}

const IndexValueStatistics:React.FC = () => {
  return (
    <IndexValueStatisticsMain>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Variable APY</StatisticsTitle>
        <Line />
        <div className="tatistics-container">
          <VariableAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Deposit APY</StatisticsTitle>
        <Line />
        <div className="tatistics-container">
          <DepositAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Utilisation Rate</StatisticsTitle>
        <Line />
        <div className="tatistics-container">
          <UtilisationRate />
        </div>
      </div>
    </IndexValueStatisticsMain>
  )
}

const StoragePoolDetailPage:React.FC = () => {
  return (
    <StoragePoolMain>
      <ConfigurationMain>
        <div className="configuration-top">
          <AreaTitle>
            <BackIcon />
            <span className="configuration-top-title">Availble to deposit</span>
          </AreaTitle>
        </div>
        <Line />
        <ConfigurationData>
          <TotalBorrowed>
            <div className="totalBorrowed-title">
              <div />
              <span>Total Borrowed</span>
            </div>
            <p className="totalBorrowed-number">984,332,456,00</p>
            <p className="totalBorrowed-dollar">$874,993</p>
          </TotalBorrowed>
          <ProgressMain>
            <ETHIcon />
            <Progress type="circle" strokeColor={'#6C48FF'} trailColor={'#FFBB00'} width={170} percent={30} format={() => ''} />
          </ProgressMain>
          <AvailableLiquidity>
            <div className="availableLiquidity-title">
              <span>Total Borrowed</span>
              <div />
            </div>
            <p className="availableLiquidity-number">984,332,456,00</p>
            <p className="availableLiquidity-dollar">$874,993</p>
          </AvailableLiquidity>
        </ConfigurationData>
        <ReserveUtilisation>
          <div className="reserveUtilisation-item">
            <div className="reserveUtilisation-item-name">Reserve size</div>
            <div className="reserveUtilisation-item-numer">$994.445.656.24</div>
          </div>
          <div className="reserveUtilisation-item">
            <div className="reserveUtilisation-item-name">Utilisation rate</div>
            <div className="reserveUtilisation-item-numer">77.88%</div>
          </div>
        </ReserveUtilisation>
        <DepositStableVariable />
        <IndexValue />
      </ConfigurationMain>
      <YourInformation />
      <IndexValueStatistics />
    </StoragePoolMain>
  )
}

export default StoragePoolDetailPage
