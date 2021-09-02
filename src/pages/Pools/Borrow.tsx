import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { depositPoolsList } from '../../apis/pool'
import PageLoading from '../../components/PageLoding'

const BorrowMain = styled.div`
  width: 113.6rem;
  margin-left: calc((100% - 113.6rem) / 2);
  display: none;
  padding-top: 8rem;

  &.active {
    display: block;
  }
`

const DepositAreaLeft = styled.div`
  width: 78.1rem;
  background: #101D44;
  border-radius: 1.5rem;
  float: left;
`

const AreaTitle = styled.div`
  padding: 2rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const DepositAreaRight = styled.div`
  width: 34.1rem;
  float: left;

  .MyTotal {
    width: 100%;
    padding: 0 2.5rem;
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 3.2rem;
    color: #fff;

    .MyTotal-name {
      display: flex;
      align-items: center;

      span {
        font-size: 1.7rem;
        margin-left: 1.4rem;
      }
    }

    .MyTotalNum {
      position: absolute;
      right: 3.5rem;
      font-size: 2.5rem;
      font-weight: bolder;
    }
  }
`

/*const MyBorrows = styled.div`
  height: 23rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-left: 1.4rem;
  margin-top: 2rem;
`*/

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const AllCoinTable = styled.div`
  width: 72.4rem;
  margin: 2.9rem auto;
  padding-bottom: 2rem;
`

const AllCoinTableTop = styled.div`
  width: 100%;
  display: flex;

  div {
    color: #B3B3B3;
    font-size: 1.7rem;
  }

  div:nth-of-type(1) {
    width: 30%;
    padding-left: 3rem;
  }

  div:nth-of-type(2), div:nth-of-type(3) {
    width: 30%;
    text-align: center;
  }
`

const AllCoinTableMain = styled.div`

  .allCoin-table-item {
    width: 100%;
    height: 5.7rem;
    background: #182C58;
    border: none;
    border-radius: 1.5rem;
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
      width: 30%;
      text-align: center;
    }

    .assets {
      font-size: 1.8rem;
      padding-left: 3rem;
      display: flex;
      align-items: center;
    }

    .walletBalance {
      text-align: center;

      p{
        margin: 0;
      }

      p:nth-of-type(1) {
        font-size: 1.6rem;
      }
      p:nth-of-type(2) {
        font-size: 1.4rem;
      }
    }

    .apy {
      text-align: center;

      p{
        margin: 0;
      }

      p:nth-of-type(1) {
        font-size: 1.6rem;
      }
      p:nth-of-type(2) {
        font-size: 1.4rem;
      }
    }
  }

  .allCoin-table-item:hover {
    border: 1px solid #6845FE;
    background: #182C58;
    box-sizing: border-box;
  }
`

const MyNFTMortgage = styled.div`
  height: 23rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-left: 1.4rem;
`

const AllCoinContainer:React.FC<{ data: any }> = ({ data }) => {
  const history = useHistory()

  return (
    <AllCoinTable>
      <AllCoinTableTop>
        <div>Assets</div>
        <div>Available to borrow</div>
        <div>Stable APY</div>
      </AllCoinTableTop>
      <AllCoinTableMain>
        {
          data?.map((item: any, index: number) => (
            <div className="allCoin-table-item"
              onClick={() => history.push(`/pools/borrow/detail/${item.id}`)}
              key={index}
            >
              <div className="assets">
                <img
                  src={item?.assetsImage}
                  alt=""
                  style={{ width: '2.2rem', marginRight: '0.8rem' }}
                />
                <span>{item?.assetsName}</span>
              </div>
              <div className="walletBalance">
                <p>{item?.variableBorrowed}</p>
              </div>
              <div className="apy">
                <p>{item?.stableBorrowApy}</p>
              </div>
            </div>
          ))
        }
      </AllCoinTableMain>
    </AllCoinTable>
  )
}

const BorrowPage:React.FC = () => {

  const [data, setData] = useState<any>()

  const [isLoading, setLoading] = useState<boolean>(true)

  const init = useCallback(async () => {
    await depositPoolsList({
      orderKey: 'deposit_apy',
      orderDesc: ''
    }).then(res => {
      setData(res.data.data)
    })
    setLoading(false)
  },[])

  useEffect(() => {
    init()
  },[init])

  return (
    <BorrowMain className={clsx('active')}>
      {
        !isLoading ?
          <div>
            <DepositAreaLeft>
              <AreaTitle>Available to Borrow</AreaTitle>
              <Line />
              <AllCoinContainer data={data} />
            </DepositAreaLeft>
            <DepositAreaRight>
              <MyNFTMortgage>
                <AreaTitle>My Borrow</AreaTitle>
                <Line />
                <div className="MyTotal">
                  <div className="MyTotal-name">
                    <span>Total value</span>
                  </div>
                  <div className="MyTotalNum">3</div>
                </div>
                <div className="MyTotal">
                  <div className="MyTotal-name">
                    <span>Number of currencies</span>
                  </div>
                  <div className="MyTotalNum">7</div>
                </div>
              </MyNFTMortgage>
            </DepositAreaRight>
          </div> :
          <PageLoading />
      }
    </BorrowMain>
  )
}

export default BorrowPage
