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
  width: 130rem;
  margin-left: calc((100% - 130rem) / 2);
  padding-top: 3.3rem;
`

const MarkeTotalLeft = styled.div`
  width: 58rem;
  height: 30rem;
  background: #000c17;
`

const USDPoolContainer = styled.div`
  width: 100%;
  margin-top: 6rem;

  .UsdPool-container {
    width: 130rem;
    margin-left: calc((100% - 130rem) / 2);
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

const USDPool:React.FC = () => {

  const usdTableTop = ['Assets', 'Market size', 'Total borrowed', 'Deposit APY', 'Borrow APY', 'Borrow APY']

  return (
    <USDPoolContainer>
      <div className="UsdPool-container">
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


  return (
    <MarkeContainer>
      <div className={clsx('marke', current === 0 && 'active')}>
        <MarkeTotal>
          <MarkeTotalLeft>
            11
          </MarkeTotalLeft>
        </MarkeTotal>
        <USDPool />
      </div>
    </MarkeContainer>
  )
}

export default MarkePage
