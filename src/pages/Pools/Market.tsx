import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
import DepositSize from '../../components/EchartsStatistics/DepositSize'
import { useHistory } from 'react-router-dom'

import { depositPoolsList, depositSize, marketSizeStatistics, mortgagePoolsList, mortgageSize } from '../../apis/pool'

const MarketContainer = styled.div`
  padding-top: 4rem;

  .market {
    display: none;
  }

  .market.active {
    display: block;
  }

  p {
    margin: 0;
  }
`

const MarkeTotal = styled.div`
  width: 130rem;
  margin-left: calc((100% - 130rem) / 2);
  padding-top: 3.3rem;
  display: flex;
  justify-content: space-between;
`

const Tatistics = styled.div`
  width: 64.3rem;
  height: 33rem;
  background: #000c17;
  border-radius: 1.5rem;
`

const PoolContainer = styled.div`
  width: 100%;

  .UsdPool-container {
    width: 130rem;
    margin-left: calc((100% - 130rem) / 2);
  }
`

const TableTop = styled.div`
  display: flex;
  align-items: center;

  div {
    color: #B0B0B1;
    font-size: 1.8rem;
  }

  div:nth-of-type(1) {
    width: 15%;
    padding-left: 3rem;
  }

  div:nth-of-type(2), div:nth-of-type(3), div:nth-of-type(4), div:nth-of-type(5), div:nth-of-type(6) {
    width: 14%;
    text-align: center;

    .variable {
      font-size: 1.4rem;
      color: darkgray;
    }

    .stable {
      font-size: 1.4rem;
      color: darkgray;
    }
  }
`

const TableMain = styled.div`
  margin-bottom: 1rem;

  .table-item {
    width: 100%;
    height: 5.7rem;
    background: #111C3A;
    border-radius: 1.5rem;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    transition: all 0.7s;
    border: none;
    cursor: pointer;

    div:nth-of-type(1) {
      width: 15%;
      color: #fff;
      padding-left: 3rem;
      font-weight: bolder;
      display: flex;
      align-items: center;
    }

    div:nth-of-type(2), div:nth-of-type(3), div:nth-of-type(4), div:nth-of-type(5), div:nth-of-type(6) {
      width: 14%;
      color: #fff;
      font-size: 1.8rem;
      text-align: center;
      font-weight: bolder;
    }
  }

  .table-item:hover {
    border: 1px solid #6845FE;
    background: #182C58;
    box-sizing: border-box;
  }

  .mortgage-table-item {
    width: 100%;
    height: 5.7rem;
    background: #3658A7;
    border-radius: 1.5rem;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    transition: all 0.7s;
    border: none;
    cursor: pointer;

    div:nth-of-type(1) {
      width: 15%;
      color: #fff;
      padding-left: 3rem;

      img {
        width: 4.7rem;
        height: 4.7rem;
      }
    }

    div:nth-of-type(2), div:nth-of-type(3), div:nth-of-type(4), div:nth-of-type(5), div:nth-of-type(6) {
      width: 14%;
      color: #fff;
      font-size: 1.8rem;
      text-align: center;
      font-weight: bolder;
    }
  }

  .mortgage-table-item:hover {
    border: 1px solid #86ABE4;
    background: #4470C1;
    box-sizing: border-box;
  }
`

const AreaTitle = styled.div`
  padding: 2rem 3.5rem;
  color: #AFAEB1;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const MarketSizeStatistics = styled.div`
  padding: 2rem 3rem;

  .market-size {
    color: #fff;
    font-size: 2.4rem;
    font-weight: bolder;
  }
`

const DepositButton = styled.div`
  width: 6rem;
  height: 2rem;
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  background: #234890;
  border-radius: 0.5rem;
  margin-left: 2rem;
`

const DAIIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/mockImg/DAIIcon.png').default}
      alt="ETH"
      style={{ width: '2.5rem', marginRight: '0.8rem' }}
    />
  )
}

const USDIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/mockImg/USDIcon.png').default}
      alt="ETH"
      style={{ width: '2.5rem', marginRight: '0.8rem' }}
    />
  )
}

const MortgagePools: React.FC<{ mortgageList: any }> = ({ mortgageList }) => {

  const history = useHistory()

  const usdTableTop = ['', 'NFT Name', 'Market size', 'Mortgage Number', 'Mortgage rate', 'Borrow Rate']

  return (
    <PoolContainer>
      <div className="UsdPool-container">
        <AreaTitle>Mortgage Pools</AreaTitle>
        <TableTop>
          {
            usdTableTop.map((item: string, index) => (
              <div key={index}>{item}</div>
            ))
          }
        </TableTop>
        <TableMain>
          {
            mortgageList?.map((item: any, index: number) => (
              <div key={index}
                className="mortgage-table-item"
                onClick={() => history.push('')}
              >
                <div>
                  <img src={item?.nftImage} />
                </div>
                <div>{item?.nftName}</div>
                <div>{item?.mortgageValue}</div>
                <div>{item?.mortgageNumber}</div>
                <div>{item?.mortgageRate}</div>
                <div>{item?.borrowRate}</div>
              </div>
            ))
          }
        </TableMain>
      </div>
    </PoolContainer>
  )
}

const USDPool: React.FC<{ depositList: any }> = ({ depositList }) => {
  const history = useHistory()

  const usdTableTop = ['Assets', 'Market size', 'Total borrowed', 'Deposit APY', 'Deposit APY', 'Borrow APY']

  return (
    <PoolContainer>
      <div className="UsdPool-container">
        <AreaTitle>Deposit Pools</AreaTitle>
        <TableTop>
          <div>Assets</div>
          <div>Market size</div>
          <div>Total borrowed</div>
          <div>Deposit APY</div>
          <div>
            <p className="variable">Variable</p>
            <p>Borrow APY</p>
          </div>
          <div>
            <p className="stable">Stable</p>
            <p>Borrow APY</p>
          </div>
        </TableTop>
        <TableMain>
          {
            depositList?.map((item: any, index: number) => (
              <div
                key={index}
                className="table-item"
              >
                <div onClick={() => history.push(`/pools/market/deposit/pool/${item?.id}`)}>
                  <img
                    src={item?.assetsImage}
                    alt=""
                    style={{ width: '2.5rem', marginRight: '0.8rem' }}
                  />
                  {item?.assetsName}
                </div>
                <div onClick={() => history.push(`/pools/market/deposit/pool/${item?.id}`)}>{item?.marketSize}</div>
                <div onClick={() => history.push(`/pools/market/deposit/pool/${item?.id}`)}>{item?.totalBorrowed}</div>
                <div onClick={() => history.push(`/pools/market/deposit/pool/${item?.id}`)}>{item?.depositApy}</div>
                <div onClick={() => history.push(`/pools/market/deposit/pool/${item?.id}`)}>{item?.variableBorrowApy}</div>
                <div onClick={() => history.push(`/pools/market/deposit/pool/${item?.id}`)}>{item?.stableBorrowApy}</div>
                <DepositButton onClick={() => history.push(`/pools/deposit/detail/${item?.id}`)}>deposit</DepositButton>
                <DepositButton onClick={() => history.push(`/pools/borrow/detail/${item?.id}`)}>Borrow</DepositButton>
              </div>
            ))
          }
        </TableMain>
      </div>
    </PoolContainer>
  )
}

const MarketPage: React.FC = () => {

  const [depositList, setDepositList] = useState<any>()

  const [depositSizeNum, setDepositSizeNum] = useState<number>()

  const [mortgageSizeNum, setMortgageSizeNum] = useState<number>()

  const [mortgageList, setMortgageList] = useState<any>()

  const [depositStatistics, setDepositStatistics] = useState<any>()

  const init = useCallback(async () => {
    await depositPoolsList(
      {
        orderKey: 'deposit_apy',
        orderDesc: ''
      }
    ).then(res => {
      setDepositList(res.data.data)
    })

    const t = setInterval(() => {
      depositSize().then((res: any) => {
        setDepositSizeNum(res.data.data.toLocaleString())
      })

      mortgageSize().then(res => {
        setMortgageSizeNum(res.data.data.toLocaleString())
      })
    }, 2000)

    marketSizeStatistics().then(res => {
      setDepositStatistics(res.data.data.depositSize)
    })

    mortgagePoolsList({}).then((res: any) => {
      setMortgageList(res.data.data)
    })

    return () => {
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <MarketContainer>
      <div className={clsx('market', 'active')}>
        <MarkeTotal>
          <Tatistics>
            <AreaTitle>Deposit size</AreaTitle>
            <Line />
            <MarketSizeStatistics>
              <div className="market-size">${depositSizeNum}</div>
              <DepositSize depositStatistics={depositStatistics} />
            </MarketSizeStatistics>
          </Tatistics>
          <Tatistics>
            <AreaTitle>Mortgage NFT value</AreaTitle>
            <Line />
            <MarketSizeStatistics>
              <div className="market-size">${mortgageSizeNum}</div>
              <DepositSize depositStatistics={depositStatistics} />
            </MarketSizeStatistics>
          </Tatistics>
        </MarkeTotal>
        <USDPool depositList={depositList} />
        <MortgagePools mortgageList={mortgageList} />
      </div>
    </MarketContainer>
  )
}

export default MarketPage
