import React, { useState } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'

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
  height: 17rem;
  background: #0F192F;
  padding-top: 3.3rem;

  .markeTotal-title {
    margin-left: calc((100% - 130rem) / 2);
    color: #fff;
    font-weight: bolder;
    font-size: 3rem;
  }

  .markeTotal-text {
    font-size: 4.6rem;
    color: #554BFF;
    font-weight: bolder;
    margin-left: calc((100% - 130rem) / 2);
    margin-top: -3rem;
  }
`

const CurrencyTabs = styled.div`
  width: 12.3rem;
  height: 2.7rem;
  background: #111C3A;
  color: #fff;
  border-radius: 1rem;
  display: flex;
  margin-top: 5.1rem;
  margin-left: calc((100% - 130rem) / 2);

  .currency {
    width: 6.15rem;
    height: 2.7rem;
    text-align: center;
    line-height: 2.7rem;
    cursor: pointer;
  }

  .tabs__link {
    background: #554BFF;
    border-radius: 1rem;
  }
`

const USDPoolContainer = styled.div`
  width: 100%;
  margin-top: 6rem;

  .UsdPool-container {
    width: 130rem;
    margin-left: calc((100% - 130rem) / 2);
    display: none;
  }

  .UsdPool-container.active {
    display: block;
  }
`

const USDPoolTableTop = styled.div`
  display: flex;
  align-items: center;

  div {
    color: #B3B3B3;
    font-size: 1.8rem;
  }

  div:nth-of-type(1) {
    width: 25%;
    margin-left: 2rem;
  }

  div:nth-of-type(2), div:nth-of-type(3), div:nth-of-type(4), div:nth-of-type(5), div:nth-of-type(6) {
    width: 15%;
    text-align: center;
  }
`

const USDPollTableMain = styled.div`

  .usdTable-item {
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
      width: 25%;
      color: #fff;
      padding-left: 3rem;
    }

    div:nth-of-type(2), div:nth-of-type(3), div:nth-of-type(4), div:nth-of-type(5), div:nth-of-type(6) {
      width: 15%;
      color: #fff;
      font-size: 1.8rem;
      text-align: center;
    }
  }

  .usdTable-item:hover {
    border: 1px solid #6845FE;
    background: #182C58;
    box-sizing: border-box;
  }
`

const USDPool:React.FC<{ currencyCurrent: number }> = ({ currencyCurrent }) => {

  const usdTableTop = ['Assets', 'Market size', 'Total borrowed', 'Deposit APY', 'Borrow APY', 'Borrow APY']

  return (
    <USDPoolContainer>
      <div className={clsx('UsdPool-container', currencyCurrent === 0 && 'active')}>
        <USDPoolTableTop>
          {
            usdTableTop.map((item: string, index) => (
              <div key={index}>{item}</div>
            ))
          }
        </USDPoolTableTop>
        <USDPollTableMain>
          <div className="usdTable-item">
            <div>Ethereum（ETH）</div>
            <div>6.66M</div>
            <div>7.56M</div>
            <div>2.775%</div>
            <div>2.775%</div>
            <div>--</div>
          </div>
        </USDPollTableMain>
      </div>
    </USDPoolContainer>
  )
}

const MarkePage:React.FC<any> = ({ current }) => {

  const tabs = ['USD', 'KSY']

  const [currencyCurrent, setCurrencyCurrent] = useState<number>(0)

  return (
    <MarkeContainer>
      <div className={clsx('marke', current === 0 && 'active')}>
        <MarkeTotal>
          <p className="markeTotal-title">Total market size</p>
          <p className="markeTotal-text">$665, 550, 000 </p>
        </MarkeTotal>
        <CurrencyTabs>
          {
            tabs?.map((item: any, index) => (
              <div
                className={clsx('currency', currencyCurrent === index && 'tabs__link')}
                onClick={() => setCurrencyCurrent(index)}
                key="index"
              >
                {item}
              </div>
            ))
          }
        </CurrencyTabs>
        <USDPool currencyCurrent={currencyCurrent} />
      </div>
    </MarkeContainer>
  )
}

export default MarkePage
