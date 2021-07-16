import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
import { useHistory } from 'react-router-dom'
import { borrowConfirm, depositPoolsDetail, mortgageOpinion } from '../../../utils/banksyNftList'
import { useSelector } from 'react-redux'
import { getAccount } from '../../../store/wallet'
import { Button, Form, Input, message, Select } from 'antd'

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

  span:nth-of-type(2), span:nth-of-type(3) {
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

const OptionMain = styled.div`
  text-align: center;
  padding-top: 5rem;

  .title {
    color: #F172ED;
    font-size: 2rem;
    font-weight: bolder;
  }

  .main-text {
    font-size: 1.7rem;
    color: #fff;
  }
`

const DepositNowButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const ScheduleMain = styled.div`
  margin-top: 3rem;
`

const ScheduleFirst = styled.div`
  text-align: center;
  width: 80rem;
  margin-left: calc((100% - 80rem) / 2);
  .title {
    color: #F172ED;
    font-size: 2rem;
    font-weight: bolder;
  }

  .main-text {
    font-size: 1.7rem;
    color: #fff;
    margin-bottom: 2rem;
  }

  .ant-input-group.ant-input-group-compact > *:first-child, .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  .ant-input {
    width: 70% !important;
    height: 5rem;
    color: white;
    font-size: 1.6rem;
    font-weight: 550;
    background: #305099 !important;
    border-radius: 1rem;
    border: none;
  }
`

const ConfirmButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const Option:React.FC = () => {

  const history = useHistory()

  return (
    <OptionMain>
      <div className="title">No deposits yet</div>
      <div className="main-text">You need to deposit some collateral first to unlock your borrowing power.</div>
      <DepositNowButton onClick={() => history.push('/pools/deposit/detail/${item.id}')}>Deposit now</DepositNowButton>
    </OptionMain>
  )
}

const Schedule:React.FC<{ data: any }> = ({ data }) => {

  const history = useHistory()

  const account = useSelector(getAccount)

  const formInitialValues = {
    price: ''
  }

  const [form] = Form.useForm<typeof formInitialValues>()

  const confirm = () => {
    form.validateFields().then(values => {

      const formData = {
        poolName: data?.assetsName,
        walletAddress: account,
        unit: data?.unit,
        borrowValue: values?.price,
        variableBorrowApy: data?.variableBorrowApy.slice(0,-1) / 100,
        stableBorrowApy: data?.stableBorrowApy.slice(0,-1) / 100,
        borrowType: 'variable'
      }
      borrowConfirm(formData).then(() => {
        message.success('You successfully borrowed！')
        history.push('pools/borrow')
      })
    })

  }

  return (
    <ScheduleMain>
      <ScheduleFirst>
        <div className="title">Mortgage overview</div>
        <div className="main-text">
          There are your transaction details. Make sure to check if this is correct before submiiting.
        </div>
        <Form form={form} initialValues={formInitialValues}>
          <div className="fixedPrice">
            <Form.Item name="price">
              <Input style={{ width: '50%' }} defaultValue="" />
            </Form.Item>
          </div>
        </Form>
        <ConfirmButton onClick={confirm}>Confirm</ConfirmButton>
      </ScheduleFirst>
    </ScheduleMain>
  )
}


const BorrowItemDetailPage:React.FC = () => {

  const history = useHistory()

  const account = useSelector(getAccount)

  const id = history.location.pathname.slice(21)

  const [data, setData] = useState<any>()

  const [isOption, setOption] = useState<boolean>(false)

  const init = useCallback(async () => {
    await depositPoolsDetail({ id: id }).then(res => {
      setData(res.data.data)
    })

    await mortgageOpinion({ walletAddress: account }).then(res => {
      setOption(res.data.data)
    })
  },[])

  useEffect(() => {
    init()
  },[init])


  return (
    <ItemDetailMain>
      <DetailTop>
        <span>You borrowed -</span>
        <span>Total collateral -</span>
        <span>Loan to value</span>
      </DetailTop>
      <ItemDetailData>
        <div className="detailData-top">
          <div className="detailData-top-name">Borrow {data?.assetsName}</div>
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
              <div>Asset price</div>
              <div>64.71</div>
            </div>
          </DetailDataMainItem>
          <DetailDataMainItem>
            <div className="item-line">
              <div>Stable borrow APY</div>
              <div>{data?.stableBorrowApy}</div>
            </div>
            <div className="item-line">
              <div>Variable borrow APY</div>
              <div>{data?.variableBorrowApy}</div>
            </div>
          </DetailDataMainItem>
          <DetailDataMainStatistics>
            <DepositAPY />
          </DetailDataMainStatistics>
        </ItemDetailDataMain>
      </ItemDetailData>
      {
        !isOption ?
          <Option /> :
          <Schedule data={data} />
      }
    </ItemDetailMain>
  )
}

export default BorrowItemDetailPage
