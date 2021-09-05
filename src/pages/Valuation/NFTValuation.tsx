import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Property } from 'csstype'
import { NFTTransactionHistory, NFTValuationChangeData, NFTValuationHistory } from '../../types/NFTValuation'
import CollapsibleBox from './components/CollasibleBox'

import InfoIcon from '../../assets/images/commons/info.png'
import UserIcon from '../../assets/images/commons/user.png'

import ETHColoredOutlinedIcon from '../../assets/images/commons/eth-colored-outlined.png'
import ETHColoredIcon from '../../assets/images/commons/eth-colored.png'
import MarketDataIcon from '../../assets/images/valuation/market-data.png'
import ChangeIcon from '../../assets/images/valuation/changes.png'
import UpIcon from '../../assets/images/valuation/up.png'
import DownIcon from '../../assets/images/valuation/down.png'
import HistoryIcon from '../../assets/images/valuation/history.png'
import TransactionIcon from '../../assets/images/valuation/transaction.png'
import ThemeTable from '../../styles/ThemeTable'
import { DropdownSelector } from '../../styles/DropdownSelector'
import BigNumber from 'bignumber.js'
import ReactECharts from 'echarts-for-react'
import { SearchInput } from '../../styles/SearchInput'
import {
  NftAttribute,
  NftValuation,
  useNftValuationQuery
} from '../../hooks/queries/insight/token/useNftValuationQuery'
import { formatTime } from '../../utils'

type NFTValuationPageProps = {
  //
}

const NFTValuationPageContainer = styled.div`
  width: 100%;
  user-select: none;
  padding-bottom: 150px;
`

const Wrapper = styled.div`
  max-width: 1096px;
  margin: 100px auto 0 auto;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexColumn = styled.div<{ width: Property.Width }>`
  display: flex;
  flex-direction: column;

  //border: 1px red solid;
  width: ${props => props.width};
`

const TokenImage = styled.img`
  height: 394px;
  border-radius: 10px;
  border: 1px solid #99BDF9;
  padding: 10px;
  margin-bottom: 38px;
`

const OwnerContainer = styled.div`
  display: flex;
  align-items: center;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 15px;
  }

  color: #ddd;
  font-size: 16px;
`

const DetailsContainer = styled.div`

  .text {
    color: white;
    margin-bottom: 23px;
  }

  .label {
    color: #99BDF9;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 25px;
  }

  .properties {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .property {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      width: 102px;
      height: 78px;
      margin-bottom: 10px;
      padding-top: 8px;
      border-radius: 5px;

      background-color: rgba(255, 255, 255, .1);
    }

    .value {
      max-width: 80%;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
    }

    .property.empty {
      height: 0;
      padding: 0;
    }
  }
`

const TitleContainer = styled.div`
  color: #99BDF9;
  display: flex;
  align-items: flex-end;
  margin-bottom: 54px;

  .collection {
    font-size: 50px;
    font-weight: 600;
  }

  .token-id {
    font-size: 24px;
    margin-left: 10px;
    margin-bottom: 6px;
  }
`

const ValuationContainer = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 18px;
  }

  .value {
    font-size: 30px;
    color: white;
    font-weight: 500;
    margin-right: 18px;
  }

  .value-in-usd {
    font-size: 18px;
    color: #b2b2b2;
  }

`

const MarketDataContainer = styled.div`
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }

    .key {
      font-size: 14px;
      color: #99BDF9;
      font-weight: 500;
      margin-right: 17px;
      width: 90px;
    }

    .value-box {
      width: 163px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      padding-left: 14px;
      margin-right: 8px;

      img.icon {
        height: 17px;
        margin-right: 9px;
      }

      .value {
        color: white;
        margin-right: 8px;
      }

      .value-in-usd {
        color: #b2b2b2;
      }
    }

    .compare {
      color: white;
      font-size: 14px;
    }
  }
`

const ValuationChangesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .type {
    width: 300px;
    height: 158px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding-top: 15px;
    font-size: 14px;
    font-weight: 500;

    &-name {
      margin-bottom: 12px;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 70%;
      margin-bottom: 12px;

      .icon > img {
        width: 17px;
        margin-right: 7px;
      }

      .value {
        margin-right: 23px;
        width: 60px;
      }
    }
  }
`

const ValuationHistoryContainer = styled.div`
  .analyze {
    margin-top: 20px;
    color: white;

    .title {
      font-size: 22px;
      font-weight: 600;
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: #979797;
      margin: 13px 0 22px 0;
    }

    .items {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 500;
    }
  }
`

const TransactionsContainer = styled.div`
  .operators {
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;

    .text {
      margin-right: 10px;
    }

    .selector {
      width: 200px;
      margin-right: 40px;
    }

    .page-input {
      width: 60px;
      margin-right: 10px;
    }
  }

`

const Details: React.FC<{ properties?: NftAttribute[] }> = ({
  properties
}) => {
  return (
    <CollapsibleBox
      title="Details"
      collapsible={true}
      titleIcon={<img src={InfoIcon} alt="detail" />}
      style={{ marginBottom: '38px' }}
    >
      <DetailsContainer>
        <div className="text">
          1 of 4501 punks with 3 Properties
        </div>
        <div className="label">
          Properties
        </div>
        <div className="properties">
          {
            properties?.slice(0, 3).map(({ traitType, value }, index) => (
              <div className="property" key={index}>
                <div className="key">{traitType}</div>
                <div className="value">{value}</div>
                <div className="rate">1 of 3840</div>
              </div>
            ))
          }
          {/*{*/}
          {/*  new Array(2).fill({}).map((_, index) => (*/}
          {/*    <div className="property empty" key={index} />*/}
          {/*  ))*/}
          {/*}*/}
        </div>
      </DetailsContainer>
    </CollapsibleBox>
  )
}

const Owner: React.FC = () => {
  return (
    <CollapsibleBox
      title="Owner"
      collapsible={true}
      titleIcon={<img src={UserIcon} alt="owner" />}
      contentPadding="10px 0"
      style={{ marginBottom: '40px' }}
    >
      <OwnerContainer>
        <img src="https://storage.googleapis.com/opensea-static/opensea-profile/20.png" alt="" className="avatar" />
        <div className="address">
          0x7c00...0d5c
        </div>
      </OwnerContainer>
    </CollapsibleBox>
  )
}

const Title: React.FC<{ tokenName?: string }> = ({ tokenName }) => {
  const [, name, tokenId] = tokenName?.match('^(.+) #(\\d+)$') ?? []

  return (
    <TitleContainer>
      <div className="collection">{name}</div>
      <div className="token-id">#{tokenId}</div>
    </TitleContainer>
  )
}

const Valuation: React.FC<{ valuation?: string, valuationInUsd?: string }> = ({ valuation, valuationInUsd }) => {
  return (
    valuation ?
      <CollapsibleBox
        collapsible={false}
        title="NFT Valuation"
        titleIcon={<img src={ETHColoredIcon} alt="NFT valuation" />}
        style={{ marginBottom: '60px' }}
      >
        <ValuationContainer>
          <img src={ETHColoredOutlinedIcon} alt="eth" className="icon" />
          <div className="value">{valuation}</div>
          <div className="value-in-usd">${valuationInUsd}</div>
        </ValuationContainer>
      </CollapsibleBox>
      : <></>
  )
}

const MarketData: React.FC<{ valuation?: NftValuation }> = ({ valuation }) => {
  return (
    <CollapsibleBox
      title="Market Data"
      titleIcon={<img src={MarketDataIcon} alt="market data" />}
      style={{ marginBottom: '60px' }}
    >
      <MarketDataContainer>
        <div className="item">
          <div className="key">
            Asking Price
          </div>
          <div className="value-box">
            <img src={ETHColoredIcon} alt="eth" className="icon" />
            <div className="value">{valuation?.askingPrice}</div>
            <div className="value-in-usd">{valuation?.askingPriceUsd}</div>
          </div>
          <span className="compare">
            {/*{*/}
            {/*  `${valuation.askingPriceOverValuation}ETH($${valuation.askingPriceOverValuationInUsd}) vs NFT Valuation: ${valuation.askingPriceOverValuationRate}%`*/}
            {/*}*/}
          </span>
        </div>
        <div className="item">
          <div className="key">
            Last Sale
          </div>
          <div className="value-box">
            <img src={ETHColoredIcon} alt="eth" className="icon" />
            <div className="value">{valuation?.lastSalePrice}</div>
            <div className="value-in-usd">{valuation?.lastSalePriceUsd}</div>
          </div>
          <span className="compare">
            {valuation?.lastSaleTime && formatTime(new Date(valuation.lastSaleTime * 1000))}
          </span>
        </div>
        <div className="item">
          <div className="key">
            Bids
          </div>
          <div className="value-box">
            <img src={ETHColoredIcon} alt="eth" className="icon" />
            <div className="value">{valuation?.bids}</div>
            <div className="value-in-usd">{valuation?.bidsPriceUsd}</div>
          </div>
          <span className="compare">
            {/*{*/}
            {/*  `${valuation.bidsOverValuation}ETH($${valuation.bidsOverValuationInUsd}) vs NFT Valuation: ${valuation.bidsOverValuationRate}%`*/}
            {/*}*/}
          </span>
        </div>
      </MarketDataContainer>
    </CollapsibleBox>
  )
}

const ValuationChanges: React.FC<{ changes: NFTValuationChangeData[] }> = ({
  changes
}) => {
  const Item: React.FC<{ label: string, value: BigNumber }> = ({ label, value }) => (
    <div className="item" key={label}>
      <div className="icon">
        {
          value.gt(0) ? <img src={UpIcon} alt="up" /> : <img src={DownIcon} alt="down" />
        }
      </div>
      <div className="value">
        {
          value.gt(0) ? '+' : ''
        }
        {value.toString()}
        %
      </div>
      <div className="key">{label}</div>
    </div>
  )

  return (
    <CollapsibleBox
      title="Valuation Change"
      titleIcon={<img src={ChangeIcon} alt="Valuation Change" />}
      style={{ marginBottom: '60px' }}
    >
      <ValuationChangesContainer>
        {
          changes.map(({ type, last30DaysPercent, last7DaysPercent, fromYesterdayPercent }) => (
            <div className="type" key={type}>
              <div className="type-name">{type}</div>
              <Item label={'from yesterday'} value={fromYesterdayPercent} />
              <Item label={'last 7 days'} value={last7DaysPercent} />
              <Item label={'last 30 days'} value={last30DaysPercent} />
            </div>
          ))
        }
      </ValuationChangesContainer>
    </CollapsibleBox>
  )
}

const ValuationHistory: React.FC<{ history: NFTValuationHistory }> = ({ history }) => {
  const options = {
    darkMode: true,
    grid: { top: 32, right: 48, bottom: 24, left: 48 },
    legend: {
      data: ['USD', 'ETH'],
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: {
      type: 'category',
      data: ['24 Aug 2021', '25 Aug 2021', '26 Aug 2021', '27 Aug 2021', '28 Aug 2021', '29 Aug 2021', '30 Aug 2021'],
      axisLabel: {
        color: 'white'
      }
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        name: 'USD($)',
        nameTextStyle: {
          color: 'white'
        },
        axisLabel: {
          formatter: '${value}',
          color: 'white'
        }
      },
      {
        type: 'value',
        show: true,
        name: 'ETH(Ξ)',
        nameTextStyle: {
          color: 'white'
        },
        axisLabel: {
          formatter: 'Ξ{value}',
          color: 'white'
        }

      }
    ],
    series: [
      {
        name: 'USD',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      },
      {
        name: 'ETH',
        data: [1791, 1965, 1885, 1966, 2390, 2430, 2520],
        type: 'line',
        yAxisIndex: 1
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }

  return (
    <CollapsibleBox
      title="Valuation History"
      titleIcon={<img src={HistoryIcon} alt="market data" />}
      style={{ marginBottom: '60px' }}
    >
      <ValuationHistoryContainer>
        <ReactECharts option={options} />
        <div className="analyze">
          <div className="title">Price Analyze</div>
          <div className="divider" />
          <div className="items">
            <div>Price volatility: {history.analyze.priceVolatilityPercent}%</div>
            <div>Heat rank: {history.analyze.heatRank}</div>
            <div>Turnover rate: {history.analyze.turnoverRatePercent}%</div>
          </div>
        </div>
      </ValuationHistoryContainer>
    </CollapsibleBox>
  )
}

const Transactions: React.FC<{ histories: NFTTransactionHistory[] }> = ({ histories }) => {
  const columns = [
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type'
    },
    {
      title: 'From Address',
      key: 'fromAddr',
      dataIndex: 'fromAddr'
    },
    {
      title: 'To Address',
      key: 'toAddr',
      dataIndex: 'toAddr'
    },
    {
      title: 'Values',
      key: 'value',
      dataIndex: 'value'
      // sorter: (a: any, b: any) => a.value - b.value
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date'
    }
  ]

  return (
    <CollapsibleBox
      collapsible={true}
      title="Transactions"
      titleIcon={<img src={TransactionIcon} alt="market data" />}
    >
      <TransactionsContainer>
        <div className="operators">
          <div className="text">Filter by:</div>
          <DropdownSelector backgroundColor={'rgba(69,98,163)'} className="selector" allowClear={true}>
            <DropdownSelector.Option value={'Bid'}>Bid</DropdownSelector.Option>
            <DropdownSelector.Option value={'Withdraw Bid'}>Withdraw Bid</DropdownSelector.Option>
          </DropdownSelector>
          <div className="text">Page</div>
          <SearchInput backgroundColor={'rgb(69,98,163)'} className="page-input" />
          <div className="text"> of 42</div>
        </div>
        <ThemeTable
          pagination={false}
          columns={columns}
          dataSource={histories}
        />
      </TransactionsContainer>
    </CollapsibleBox>
  )
}

const NFTValuationPage: React.FC<NFTValuationPageProps> = () => {
  const { tokenId } = useParams<{
    tokenId: string
  }>()

  const { data } = useNftValuationQuery(tokenId)

  // fixme: mock data
  const changesData = [
    {
      type: 'Ethereum',
      fromYesterdayPercent: new BigNumber('11.40'),
      last7DaysPercent: new BigNumber('49.89'),
      last30DaysPercent: new BigNumber('-49.89')
    },
    {
      type: 'USD',
      fromYesterdayPercent: new BigNumber('11.40'),
      last7DaysPercent: new BigNumber('49.89'),
      last30DaysPercent: new BigNumber('-49.89')
    }
  ]
  const valuationHistory = {
    data: [],
    analyze: {
      priceVolatilityPercent: '25.11',
      heatRank: 2,
      turnoverRatePercent: '49.55'
    }
  }
  const transactionHistories: NFTTransactionHistory[] = new Array(10).fill({}).map((_, index) => ({
    date: `${index} days ago`,
    fromAddr: '0x4977...2355',
    toAddr: '0x1855...ae86',
    type: 'Bid',
    value: (0.48 * index).toString(),
    valueInUsd: '1,231',
    valueUnit: 'ETH'
  }))

  useEffect(() => {
    document.getElementById('main')!.scrollTo(0, 0)
  }, [])

  return (
    <NFTValuationPageContainer>
      <Wrapper>
        <FlexRow>
          <FlexColumn width="358px">
            <TokenImage src={data?.nftImageUrl} />
            <Details properties={data?.nftAttributes} />
            <Owner />
          </FlexColumn>
          <FlexColumn width="660px">
            <Title tokenName={data?.nftName} />
            <Valuation valuation={data?.oracleValuationEth} valuationInUsd={data?.oracleValuationUsd} />
            <MarketData valuation={data} />
            <ValuationChanges changes={changesData} />
          </FlexColumn>
        </FlexRow>

        <ValuationHistory history={valuationHistory} />
        <Transactions histories={transactionHistories} />
      </Wrapper>
    </NFTValuationPageContainer>
  )
}

export default NFTValuationPage
