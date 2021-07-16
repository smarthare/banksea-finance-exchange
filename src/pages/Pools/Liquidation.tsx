import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { Button, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { liquidationList } from '../../utils/banksyNftList'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'

const MortgageMain = styled.div`
  display: none;
  width: 126rem;
  min-height: 100vh;
  margin-left: calc((100% - 126rem) / 2);
  padding-top: 8rem;

  &.active {
    display: block;
  }

  p {
    margin: 0;
  }
`

const MortgagesTitle = styled.div`
  color: #6C48FF;
  font-size: 2.4rem;
  font-weight: bolder;
  padding-left: 2rem;
`

const MortgageMainLeft = styled.div`
  width: 100%;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 1rem;
  float: left;
  margin-bottom: 14rem;
`

const AreaTitle = styled.div`
  padding: 1rem 2rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const SerialsTop = styled.div`
  display: flex;
  align-items: center;
  padding: 4rem 3rem 0 3rem;
  position: relative;

  span {
    color: #fff;
    font-size: 1.8rem;
  }

  .search {
    display: flex;
    position: absolute;
    right: 3rem;

    .searchButton {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      background: #6C48FF;
      margin-left: -0.1rem;
    }
  }
`

const SearchInput = styled(Input)`
  width: 22rem;
  height: 3rem;
  border-color: #3658A7;
  background-color: #3658A7;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  .ant-input {
    background-color: #305099;
    color: white;
    font-weight: bold;
  }
`

const NFTMortgagesContainer = styled.div`
  width: 100%;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 4rem;
  padding-bottom: 3rem;
`

const NFTMortgagesMain = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 0 3rem;

  .mortgages-item {
    width: 18.2rem;
    height: 37rem;
    border-radius: 1rem;
    background: #3658A7;
    margin-left: 1.5rem;
    margin-top: 2rem;

    .mortgages-item-image {
      height: 17rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;

      img {
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

const MortgageMainRightMain = styled.div`
  width: 33.6rem;
  height: 27rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 1rem;
  float: right;
`

const CryptoOperating = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CryptoButton = styled(Button)`
  width: 20.7rem;
  height: 3.7rem;
  background: #6C48FF;
  color: #fff;
  border-radius: 1rem;
  border: none;
  transition: all 0.7s;
  font-size: 1.7rem;
  font-weight: bolder;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const CryptoInput = styled(Input)`
  width: 8rem;
  height: 3.7rem;
  border-color: #3658A7;
  background-color: #3658A7;
  border-radius: 0.5rem;

  .ant-input {
    background-color: #305099;
    color: white;
    font-weight: bold;
  }
`

const CryptoOperatingValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;

  div {
    color: #fff;
    font-size: 1.8rem;
  }
`

const NFTMortgages:React.FC<{ data: any }> = ({ data }) => {

  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <NFTMortgagesMain>
        {
          data?.map((item: any, index: number) => (
            <div key={index}
              className="mortgages-item"
              onClick={() => history.push('liquidation/detail')}
            >
              <div className="mortgages-item-image">
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">{item?.price}</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Mortgage Rate:</p>
                  <p className="message-number">{item?.mortgageRate * 100}%</p>
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

const LiquidationListPage: React.FC = () => {

  const account = useSelector(getAccount)

  const [data, setData] = useState<any>()

  const init = useCallback(async () => {
    liquidationList({ walletAddress: account }).then(res => {
      setData(res.data.data)
    })
  },[])

  useEffect(() => {
    init()
  },[init])

  return (
    <MortgageMain className={clsx('active')}>
      <MortgageMainLeft>
        <AreaTitle>Liquidation list</AreaTitle>
        <Line />
        <SerialsTop>
          <span>Crypto Punks Serials</span>
        </SerialsTop>
        <NFTMortgages data={data} />
      </MortgageMainLeft>
    </MortgageMain>
  )
}

export default LiquidationListPage
