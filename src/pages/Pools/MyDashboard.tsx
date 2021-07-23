import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { Button, Progress, Switch } from 'antd'
import { useHistory } from 'react-router-dom'
import { useWeb3EnvContext } from '../../contexts/Web3EnvProvider'
import {
  dashboardMortgageAvailable,
  dashboardMortgageMortgaged,
  dashboardMortgagePreorder,
  dashboardUser
} from '../../apis/pool'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import PageLoading from '../../components/PageLoding'

const MyDashboardContainer = styled.div`
  width: 135.6rem;
  margin-left: calc((100% - 135.6rem) / 2);
  display: none;
  padding-top: 8rem;

  &.active {
    display: block;
  }

  p {
    margin: 0;
  }
`

const MyDashboardData = styled.div`
  display: flex;
  justify-content: space-between;
`

const Deposits = styled.div`
  width: 67.1rem;

  .depositArea {
    height: 28rem;
    background: #101D44;
    border-radius: 1.5rem;
    position: relative;
  }
`

const Borrow = styled.div`
  width: 67.1rem;

  .borrowArea {
    height: 28rem;
    background: #101D44;
    border-radius: 1.5rem;
    position: relative;
  }
`

const ProgressArea = styled(Progress)`
  position: absolute;
  right: 3rem;
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
  height: 21.9rem;
  display: flex;
  align-items: center;
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
    margin-top: 1rem;
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
    width: 30%;
    padding-left: 1rem;
  }

  div:nth-of-type(2), div:nth-of-type(3) {
    width: 25%;
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
      color: #ffffff;
    }

    div:nth-of-type(1) {
      width: 30%;
    }

    div:nth-of-type(2), div:nth-of-type(3) {
      width: 25%;
    }

    div:nth-of-type(4) {
      width: 7%;
      cursor: pointer;
    }

    div:nth-of-type(5) {
      width: 8%;
      margin-left: 1rem;
      cursor: pointer;
    }

    .assets {
      font-size: 1.4rem;
      padding-left: 1rem;
      display: flex;
    }

    .universal-item-text {
      text-align: center;

      p {
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
  width: 67.1rem;
  height: 48rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-bottom: 1.4rem;
`

const NFTMortgagesMain = styled.div`
  width: 67.1rem;
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

const NFTBorrowMortgage = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
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

const ETHIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/eth.svg').default}
      alt="ETH"
      style={{ width: '1.2rem', marginRight: '0.8rem' }}
    />
  )
}

const DepositInformationArea: React.FC<{ userInfo: any, depositList: any }> = ({ userInfo, depositList }) => {
  console.log(userInfo)
  return (
    <Deposits>
      <div className="depositArea">
        <AreaTitle>Deposit information</AreaTitle>
        <Line />
        <BorrowInformation>
          <BorrowInformationLeft>
            <div className="left-text-main">
              <div className="left-text-column">
                <div className="left-text-line-item">
                  <p>Approximate balance</p>
                  <p>$ { userInfo?.approximateBalance } USD</p>
                </div>
              </div>
              <ProgressArea type="circle"
                width={130}
                strokeColor={'#88D12E'}
                percent={30}
                format={() => 'Borrow Composition'}
              />
            </div>
          </BorrowInformationLeft>
        </BorrowInformation>
      </div>
      <MyAccessTable>
        <MyAccessTableYop>
          <div>Your deposits</div>
          <div>Current balance</div>
          <div>APY</div>
        </MyAccessTableYop>
        <MyAccessTableMain>
          {
            depositList?.map((item: any, index: number) => (
              <div key={index} className="allCoin-table-item">
                <div className="assets">
                  <img
                    src={item?.assetsImage}
                    alt="ETH"
                    style={{ width: '1.2rem', marginRight: '0.8rem' }}
                  />
                  {item?.poolName}
                </div>
                <div className="universal-item-text">
                  <p>{item?.deposited}</p>
                  <p>{item?.depositedUSD}</p>
                </div>
                <div className="universal-item-text">
                  <p>{item?.depositApy}</p>
                </div>
                <DepositButton>deposit</DepositButton>
                <DepositButton>Withdraw</DepositButton>
              </div>
            ))
          }
        </MyAccessTableMain>
      </MyAccessTable>
    </Deposits>
  )
}

const BorrowInformationArea: React.FC<{ userInfo: any, borrowList: any }> = ({ userInfo, borrowList }) => {
  return (
    <Borrow>
      <div className="borrowArea">
        <AreaTitle>Borrow information</AreaTitle>
        <Line />
        <BorrowInformation>
          <BorrowInformationLeft>
            <div className="left-text-main">
              <div className="left-text-column">
                <div className="left-text-line-item">
                  <p>Your borrowed</p>
                  <p>$ {userInfo?.borrowed} ETH</p>
                </div>
                <div className="left-text-line-item">
                  <p>Your collateral</p>
                  <p>$110.500 ETH</p>
                </div>
                <div className="left-text-line-item">
                  <p>Current LTV</p>
                  <p>{userInfo?.currentLtv ? userInfo?.currentLtv : '---'}</p>
                </div>
              </div>
              <div className="left-text-column">
                <div className="left-text-line-item-health">
                  <p>Health factor</p>
                  <p>{userInfo?.healthFactor ? userInfo?.healthFactor : '---'}</p>
                </div>
                <div className="left-text-line-item">
                  <p>Borrowing Power Used</p>
                  <p>{userInfo?.borrowUsed ? userInfo?.borrowUsed : '---'}</p>
                </div>
                <div className="details">
                  details
                </div>
              </div>
              <ProgressArea type="circle"
                width={130}
                strokeColor={'#88D12E'}
                percent={30}
                format={() => 'Borrow Composition'}
              />
            </div>
          </BorrowInformationLeft>
        </BorrowInformation>
      </div>
      <MyAccessTable>
        <MyAccessTableYop>
          <div>Your borrows</div>
          <div>Borrowed</div>
          <div>APY</div>
        </MyAccessTableYop>
        <MyAccessTableMain>
          {
            borrowList?.map((item: any, index: number) => (
              <div key={index} className="allCoin-table-item">
                <div className="assets">
                  <img
                    src={item?.assetsImage}
                    alt="ETH"
                    style={{ width: '2.4rem', height: '2.4rem', marginRight: '0.8rem' }}
                  />
                  {item?.poolName}
                </div>
                <div className="universal-item-text">
                  <p>{item?.borrowed}</p>
                  <p>{item?.borrowedUSD}</p>
                </div>
                <div className="universal-item-text">
                  <p>{item?.variableBorrowApy * 100}%</p>
                </div>
                <DepositButton>Borrow</DepositButton>
                <DepositButton>Repay</DepositButton>
              </div>
            ))
          }
        </MyAccessTableMain>
      </MyAccessTable>
    </Borrow>
  )
}

const NFTAvailableMortgages:React.FC<{ mortgageAvailable: any }> = ({ mortgageAvailable }) => {
  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <AreaTitle>Available to Mortgages</AreaTitle>
      <Line />
      <NFTMortgagesMain>
        {
          mortgageAvailable?.map((item: any, index: number) => (
            <div key={index}
              className="mortgages-item"
              onClick={() => history.push(`available/detail/${item?.valueUri}`)}
            >
              <div className="mortgages-item-image">
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ {item?.price}</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Mortgage Rate:</p>
                  <p className="message-number">{item?.mortgageRate}</p>
                </MortgagesItemText>
                <WithdrawButton>Mortgage</WithdrawButton>
              </div>
            </div>
          ))
        }
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const NFTYourMortgage: React.FC<{ mortgageMortgaged: any }> = ({ mortgageMortgaged }) => {
  return (
    <NFTMortgagesContainer>
      <AreaTitle>My Mortgages</AreaTitle>
      <Line />
      <NFTMortgagesMain>
        {
          mortgageMortgaged?.map((item: any, index: number) => (
            <div key={index} className="mortgages-item">
              <div className="mortgages-item-image">
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ {item?.price}</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Mortgage Rate:</p>
                  <p className="message-number">{item?.mortgageRate}</p>
                </MortgagesItemText>
                <WithdrawButton>redemption</WithdrawButton>
              </div>
            </div>
          ))
        }
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const NFTLiquidation: React.FC<{ mortgagePreorder: any }> = ({ mortgagePreorder }) => {
  return (
    <NFTMortgagesLiquidation>
      <AreaTitle>Liquidation prepayment</AreaTitle>
      <Line />
      <NFTLiquidationMortgagesMain>
        {
          mortgagePreorder?.map((item: any, index: number) => (
            <div key={index} className="mortgages-item">
              <div className="mortgages-item-image">
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ {item?.price}</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Mortgage Rate:</p>
                  <p className="message-number">{item?.mortgageRate}</p>
                </MortgagesItemText>
                <WithdrawButton>Cancel pre-purchase</WithdrawButton>
              </div>
            </div>
          ))
        }
      </NFTLiquidationMortgagesMain>
    </NFTMortgagesLiquidation>
  )
}

const MyDashboardPage: React.FC = () => {
  const { providerInitialized } = useWeb3EnvContext()
  const account = useSelector(getAccount)

  const [userInfo, setUserInfo] = useState()

  const [mortgageAvailable, setMortgageAvailable] = useState()

  const [mortgageMortgaged, setMortgageMortgaged] = useState()

  const [mortgagePreorder, setMortgagePreorder] = useState()

  const [depositList, setDepositList] = useState<any>()

  const [borrowList, setBorrowList] = useState<any>()

  const [isLoading, setLoading] = useState<boolean>(true)


  const init = useCallback(async () => {
    await dashboardUser({ walletAddress: account }).then(res => {
      console.log('user'+res)
      setUserInfo(res.data.data.userInfo)
      setDepositList(res.data.data.userDepositList)
      setBorrowList(res.data.data.userBorrowList)
    })

    await dashboardMortgageAvailable({ walletAddress: account }).then(res => {
      setMortgageAvailable(res.data.data)
    })

    await dashboardMortgageMortgaged({ walletAddress: account }).then(res => {
      setMortgageMortgaged(res.data.data)
    })

    await dashboardMortgagePreorder({ walletAddress: account }).then(res => {
      setMortgagePreorder(res.data.data)
    })

    setLoading(false)
  },[])

  useEffect(() => {
    init()
  },[init])

  return (
    <MyDashboardContainer className={clsx('active')}>
      {
        providerInitialized &&(
          <div>
            {
              !isLoading ?
                <div>
                  <MyDashboardData>
                    <DepositInformationArea userInfo={userInfo} depositList={depositList} />
                    <BorrowInformationArea userInfo={userInfo} borrowList={borrowList} />
                  </MyDashboardData>
                  <NFTBorrowMortgage>
                    <NFTAvailableMortgages mortgageAvailable={mortgageAvailable} />
                    <NFTYourMortgage mortgageMortgaged={mortgageMortgaged} />
                  </NFTBorrowMortgage>
                  <NFTLiquidation mortgagePreorder={mortgagePreorder} />
                </div> :
                <PageLoading />
            }
          </div>
        )
      }
    </MyDashboardContainer>
  )
}

export default MyDashboardPage
