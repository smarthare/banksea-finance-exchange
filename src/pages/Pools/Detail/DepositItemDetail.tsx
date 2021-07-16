import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
import { depositPoolsDetail } from '../../../utils/banksyNftList'
import { useHistory } from 'react-router-dom'

const ItemDetailMain = styled.div`
  min-height: 100vh;
  width: 130rem;
  margin-left: calc((100% - 130rem) / 2);
  padding-top: 2rem;
`

const DetailTop = styled.div`
  height: 5rem;
  background: #000D17;
  border-radius: 1.5rem;
  line-height: 5rem;
  padding-left: 3rem;

  span {
    color: #fff;
    font-size: 1.7rem;
  }

  span:nth-of-type(2) {
    margin-left: 7rem;
  }
`

const ItemDetailData = styled.div`
  border-radius: 1.5rem;
  margin-top: 2rem;
  background: #101D44;

  .detailData-top {
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3rem;
    color: #fff;
    position: relative;

    .detailData-top-name {
      font-size: 1.4rem;
      position: absolute;
      left: 3rem;
    }

    .detailData-top-overview {
      display: flex;
      align-items: center;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 3rem;
        background: gray;
      }

      div {
        margin-left: 1rem;
      }
    }
  }
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const ItemDetailDataMain = styled.div`
  display: flex;
  padding: 2rem 3rem;
`

const DetailDataMainItem = styled.div`
  padding-right: 3rem;
  width: 28%;

  .item-line {
    display: flex;
    padding: 1rem 0;
    justify-content: space-between;
    color: #fff;

    div:nth-of-type(2) {
      font-weight: bolder;
      font-size: 1.7rem;
    }
  }
`

const DetailDataMainStatistics = styled.div`
  width: 45%;
  padding: 1rem;
`

const DepositItemDetailPage:React.FC = () => {

  const history = useHistory()

  const id = history.location.pathname.slice(22)

  const [data, setData] = useState<any>()

  const init = useCallback(async () => {
    depositPoolsDetail({ id: id }).then(res => {
      setData(res.data.data)
    })
  },[])

  useEffect(() => {
    init()
  },[init])

  return (
    <ItemDetailMain>
      <DetailTop>
        <span>Your balance in Aave -</span>
        <span>Your wallet balance -</span>
      </DetailTop>
      <ItemDetailData>
        <div className="detailData-top">
          <div className="detailData-top-name">Deposit {data?.assetsName}</div>
          <div className="detailData-top-overview">
            <img src={data?.assetsImage} />
            <div>{data?.assetsName} Reserve Overview</div>
          </div>
        </div>
        <Line />
        <ItemDetailDataMain>
          <DetailDataMainItem>
            <div className="item-line">
              <div>Utilization rate</div>
              <div>{data?.utilizationRate}</div>
            </div>
            <div className="item-line">
              <div>Available liquidity</div>
              <div>{data?.availableLiquidity}</div>
            </div>
            <div className="item-line">
              <div>Deposit APY</div>
              <div>{data?.depositApy}</div>
            </div>
            <div className="item-line">
              <div>Can be used as collateral</div>
              <div>64.71</div>
            </div>
          </DetailDataMainItem>
          <DetailDataMainItem>
            <div className="item-line">
              <div>Asset price</div>
              <div>64.71</div>
            </div>
            <div className="item-line">
              <div>Maximum LTV</div>
              <div>{data?.maximumLtv}</div>
            </div>
            <div className="item-line">
              <div>Liquidation threshold</div>
              <div>{data?.liquidationThreshold}</div>
            </div>
            <div className="item-line">
              <div>Liquidation penalty</div>
              <div>{data?.liquidationPenalty}</div>
            </div>
          </DetailDataMainItem>
          <DetailDataMainStatistics>
            <DepositAPY />
          </DetailDataMainStatistics>
        </ItemDetailDataMain>
      </ItemDetailData>
    </ItemDetailMain>
  )
}

export default DepositItemDetailPage
