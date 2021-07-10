import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { Button, Progress, Switch } from 'antd'
import { useHistory } from 'react-router-dom'
import myDashboard1 from '../../assets/images/mockImg/myDashboard1.png'
import myDashboard2 from '../../assets/images/mockImg/myDashboard2.png'
import myDashboard3 from '../../assets/images/mockImg/myDashboard3.png'
import myDashboard4 from '../../assets/images/mockImg/myDashboard4.png'
import myDashboard5 from '../../assets/images/mockImg/myDashboard5.png'
import myDashboard6 from '../../assets/images/mockImg/myDashboard6.png'

const MyDashboardContainer = styled.div`
  width: 133.6rem;
  margin-left: calc((100% - 133.6rem) / 2);
  display: none;
  padding-top: 8.8rem;

  &.active {
    display: block;
  }

  p {
    margin: 0;
  }
`

const MyDashboardData = styled.div`
  display: flex;
`

const MyDeposits = styled.div`
  width: 61.1rem;
  height: 48rem;
  background: #101D44;
  border-radius: 1.5rem;
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

const BorrowInformation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
`

const BorrowInformationLeft = styled.div`
  padding: 1.5rem 3.5rem;

  .left-text-main {
    display: flex;
    align-items: center;

    .left-text-column {

      .left-text-line-item {
        margin-right: 5rem;
        margin-top: 1.5rem;

        p {
          color: #fff;
        }

        p:nth-of-type(2) {
          font-size: 1.7rem;
          font-weight: bolder;
        }
      }

      .left-text-line-item-health {
        margin-top: 1.5rem;
        p {
          color: #88D12E;
        }

        p:nth-of-type(2) {
          font-size: 1.7rem;
          font-weight: bolder;
        }
      }

      .details {
        width: 6rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        color: #fff;
        font-size: 1.4rem;
        border: 1px solid #fff;
        border-radius: 0.5rem;
        margin-top: 1.5rem;
      }
    }

    .ant-progress-circle .ant-progress-text {
      font-size: 1.4rem;
      color: #fff;
    }
  }
`

const LeftTitle = styled.div`
  color: #6644F9;
`

const DepositInformation = styled.div`
  padding: 1.5rem 3.5rem;

  p {
    color: #fff;
    margin-top: 1rem;
  }
`

const MyAccess = styled.div`
  width: 71.1rem;
  margin-left: 1.4rem;
`

const MyAccessTable = styled.div`

  &:nth-of-type(2) {
    margin-top: 3rem;
  }

`

const MyAccessTableYop = styled.div`
  width: 100%;
  display: flex;

  div {
    color: #B3B3B3;
    font-size: 1.4rem;
  }
  div:nth-of-type(1) {
    width: 24%;
    padding-left: 3rem;
  }

  div:nth-of-type(2), div:nth-of-type(3) {
    width: 17%;
    text-align: center;
  }
`

const MyAccessTableMain = styled.div`

  .allCoin-table-item {
    width: 100%;
    height: 4rem;
    background: #3658A7;
    border: none;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    margin-top: 1.5rem;

    div {
      width: 22%;
      color: #ffffff;
    }

    div:nth-of-type(1) {
      width: 24%;
    }

    div:nth-of-type(2), div:nth-of-type(3) {
      width: 17%;
    }

    div:nth-of-type(4) {
      width: 15%;
    }

    div:nth-of-type(5) {
      width: 8%;
    }
    div:nth-of-type(6) {
      width: 9%;
      margin-left: 3rem;
    }

    .assets {
      font-size: 1.4rem;
      padding-left: 3rem;
      display: flex;
    }

    .universal-item-text {
      text-align: center;

      p{
        margin: 0;
      }

      p:nth-of-type(1) {
        font-size: 1.4rem;
      }
      p:nth-of-type(2) {
        font-size: 1.2rem;
      }
    }

    .collateral {

      .checked {
        margin-right: 0.5rem;
        color: #fff;
      }

      .ant-switch-checked {
        background-color: #88D12E;
      }
    }
  }

  .allCoin-table-item:hover {
    border: 1px solid #6845FE;
    background: #182C58;
    box-sizing: border-box;
  }
`

const DepositButton = styled.div`
  width: 3rem;
  height: 2rem;
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  background: #234890;
  border-radius: 0.5rem;
`

const NFTMortgagesContainer = styled.div`
  width: 100%;
  height: 48rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 3rem;
`

const NFTMortgagesMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem;

  .mortgages-item {
    width: 18.2rem;
    height: 37rem;
    border-radius: 1rem;
    background: #3658A7;

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

const ETHIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/eth.svg').default}
      alt="ETH"
      style={{ width: '1.2rem', marginRight: '0.8rem' }}
    />
  )
}

const NFTMortgages:React.FC = () => {

  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <AreaTitle>NFT Mortgages</AreaTitle>
      <Line />
      <NFTMortgagesMain>
        <div className="mortgages-item" onClick={ () => history.push('/nftMortgageDetailPage') }>
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
            <img src={myDashboard4} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">Gaga Daintylink</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 1.2k</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">27.8%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={myDashboard5} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">Vol - 2xCheeky </p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 0.9k</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">125.8%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={myDashboard6} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">Vol - 2xCheeky</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 0.9k </p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">25.8%</p>
            </MortgagesItemText>
            <WithdrawButton>Withdraw</WithdrawButton>
          </div>
        </div>
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const MyDashboardPage:React.FC<{ current: number, providerInitialized: any }> = ({ current, providerInitialized }) => {

  console.log(providerInitialized)
  return (
    <MyDashboardContainer className={clsx(current === 1 && 'active')}>
      {
        !providerInitialized ?
          <div /> :
          <div>
            <MyDashboardData>
              <MyDeposits>
                <AreaTitle>My deposits</AreaTitle>
                <Line />
                <BorrowInformation>
                  <BorrowInformationLeft>
                    <LeftTitle>Borrow Information</LeftTitle>
                    <div className="left-text-main">
                      <div className="left-text-column">
                        <div className="left-text-line-item">
                          <p>Your borrowed</p>
                          <p>$10.333 ETH</p>
                        </div>
                        <div className="left-text-line-item">
                          <p>Your collateral</p>
                          <p>$110.500 ETH</p>
                        </div>
                        <div className="left-text-line-item">
                          <p>Current LTV</p>
                          <p>15%</p>
                        </div>
                      </div>
                      <div className="left-text-column">
                        <div className="left-text-line-item-health">
                          <p>Health factor</p>
                          <p>6.43</p>
                        </div>
                        <div className="left-text-line-item">
                          <p>Borrowing Power Used</p>
                          <p>45.65%</p>
                        </div>
                        <div className="details">
                          details
                        </div>
                      </div>
                      <Progress type="circle" width={130} strokeColor={'#88D12E'} percent={30} format={() => 'Borrow Composition'} />
                    </div>
                  </BorrowInformationLeft>
                </BorrowInformation>
                <Line />
                <DepositInformation>
                  <LeftTitle>Deposit Information</LeftTitle>
                  <p>Approximate balance</p>
                  <p>$10.333 ETH</p>
                </DepositInformation>
              </MyDeposits>
              <MyAccess>
                <MyAccessTable>
                  <MyAccessTableYop>
                    <div>Your deposits</div>
                    <div>Current balance</div>
                    <div>APY</div>
                    <div>Collateral</div>
                  </MyAccessTableYop>
                  <MyAccessTableMain>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                  </MyAccessTableMain>
                </MyAccessTable>
                <MyAccessTable>
                  <MyAccessTableYop>
                    <div>Your deposits</div>
                    <div>Current balance</div>
                    <div>APY</div>
                    <div>Collateral</div>
                  </MyAccessTableYop>
                  <MyAccessTableMain>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                    <div className="allCoin-table-item">
                      <div className="assets">
                        <ETHIcon />
                        Ethereum（ETH)
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="universal-item-text">
                        <p>12.000</p>
                        <p>$11.3445</p>
                      </div>
                      <div className="collateral">
                        <span className="checked">Variable</span>
                        <Switch />
                      </div>
                      <DepositButton>deposit</DepositButton>
                      <DepositButton>Withdraw</DepositButton>
                    </div>
                  </MyAccessTableMain>
                </MyAccessTable>
              </MyAccess>
            </MyDashboardData>
            <NFTMortgages />
          </div>
      }
    </MyDashboardContainer>
  )
}

export default MyDashboardPage
