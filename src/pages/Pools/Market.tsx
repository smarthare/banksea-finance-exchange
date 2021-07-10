import React, { useState } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
import MarketSize from '../../components/EchartsStatistics/MarketSize'
import { useHistory } from 'react-router-dom'
import mortgagePools1 from '../../assets/images/mockImg/mortgagePools1.png'
import mortgagePools2 from '../../assets/images/mockImg/mortgagePools2.png'
import mortgagePools3 from '../../assets/images/mockImg/mortgagePools3.png'

const MarkeContainer = styled.div`
  padding-top: 4rem;

  .marke {
    display: none;
  }

  .marke.active {
    display: block;
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
  margin-top: 6rem;

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
  }
`

const TableMain = styled.div`
  margin-bottom: 5rem;

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
    height: 10.7rem;
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
        width: 8rem;
        height: 8rem;
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

const MaticIcon: React.FC = () => {
  return (
    <img
      src={require('../../assets/images/mockImg/maticIcon.png').default}
      alt="ETH"
      style={{ width: '2.5rem', marginRight: '0.8rem' }}
    />
  )
}

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

const MortgagePools:React.FC = () => {

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
          <div className="mortgage-table-item">
            <div>
              <img src={mortgagePools1} />
            </div>
            <div>CryptoPunks</div>
            <div>$2,387,98,78</div>
            <div>39</div>
            <div>25.8%</div>
            <div>78.8%</div>
          </div>
          <div className="mortgage-table-item">
            <div>
              <img src={mortgagePools2} />
            </div>
            <div>CryptoKitties</div>
            <div>$1,285,58,68</div>
            <div>125</div>
            <div>18.5%</div>
            <div>60.5%</div>
          </div>
          <div className="mortgage-table-item">
            <div>
              <img src={mortgagePools3} />
            </div>
            <div>Bored Ape Yacht Club</div>
            <div>$3,567,248,28</div>
            <div>24</div>
            <div>31.6%</div>
            <div>67.5%</div>
          </div>
        </TableMain>
      </div>
    </PoolContainer>
  )
}

const USDPool:React.FC<{current: number}> = ({ current }) => {

  const history = useHistory()

  const usdTableTop = ['Assets', 'Market size', 'Total borrowed', 'Deposit APY', 'Borrow APY', 'Borrow APY']

  return (
    <PoolContainer>
      <div className="UsdPool-container">
        <AreaTitle>Deposit Pools</AreaTitle>
        <TableTop>
          {
            usdTableTop.map((item: string, index) => (
              <div key={index}>{item}</div>
            ))
          }
        </TableTop>
        <TableMain>
          <div className="table-item" onClick={() => history.push('/storagePoolDetail')}>
            <div>
              <MaticIcon />
              Matic(MATIC)
            </div>
            <div>$ 189.14M</div>
            <div>$ 54.71M</div>
            <div>1.04%</div>
            <div>4.50%</div>
            <div>--</div>
            <DepositButton>deposit</DepositButton>
            <DepositButton>Withdraw</DepositButton>
          </div>
          <div className="table-item" onClick={() => history.push('/storagePoolDetail')}>
            <div>
              <DAIIcon />
              DAI
            </div>
            <div>$ 940.17M</div>
            <div>$ 720.57M</div>
            <div>2.64%</div>
            <div>3.83%</div>
            <div>--</div>
            <DepositButton>deposit</DepositButton>
            <DepositButton>Withdraw</DepositButton>
          </div>
          <div className="table-item" onClick={() => history.push('/storagePoolDetail')}>
            <div>
              <USDIcon />
              USDC
            </div>
            <div>$ 1.14B</div>
            <div>$ 884.44M</div>
            <div>2.42%</div>
            <div>3.45%</div>
            <div>--</div>
            <DepositButton>deposit</DepositButton>
            <DepositButton>Withdraw</DepositButton>
          </div>
        </TableMain>
      </div>
    </PoolContainer>
  )
}

const MarkePage:React.FC<any> = ({ current }) => {


  return (
    <MarkeContainer>
      <div className={clsx('marke', current === 0 && 'active')}>
        <MarkeTotal>
          <Tatistics>
            <AreaTitle>Deposit size</AreaTitle>
            <Line />
            <MarketSizeStatistics>
              <div className="market-size">$3,987,654,456,00</div>
              <MarketSize />
            </MarketSizeStatistics>
          </Tatistics>
          <Tatistics>
            <AreaTitle>Mortgage NFT value</AreaTitle>
            <Line />
            <MarketSizeStatistics>
              <div className="market-size">$674,666,00</div>
              <MarketSize />
            </MarketSizeStatistics>
          </Tatistics>
        </MarkeTotal>
        <USDPool current={current} />
        <MortgagePools />
      </div>
    </MarkeContainer>
  )
}

export default MarkePage
