import React from 'react'
import styled from 'styled-components'
import ReactECharts from 'echarts-for-react'
import FeatureAddedWhitelistCollections from './components/FeatureAddedWhitelistCollections'
import AllWhitelistCollections from './components/AllWhitelistCollections'
import { useValuationOverviewData } from '../../hooks/data/useValuationOverviewData'

type ValuationPageProps = {
  //
}

const ValuationPageContainer = styled.div`
  color: white;

`

const Wrapper = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  margin-top: 45px;
`

const PageTitle = styled.div`
  font-size: 30px;
  font-weight: 500;

  &:before {
    content: 'NFT Valuation';
  }
`

const TitleDivider = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, #5D00B4, #09F9FD);
  margin-top: 16px;
  margin-bottom: 28px;
  //text-fill-color: transparent;
`

const SummaryContainer = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 36px;
  margin-bottom: 45px;

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
`

const ChartTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  align-items: center;

  div {
    display: inline-block;
  }

  .changes {
    font-size: 25px;
  }

  .update-time {
    font-size: 18px;
  }
`

const ValuationChart: React.FC = () => {
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
      data: ['24 Aug 2021', '25 Aug 2021', '26 Aug 2021', '27 Aug 2021', '28 Aug 2021', '29 Aug 2021', '30 Aug 2021']
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        name: 'USD($)',
        axisLabel: {
          formatter: '${value}'
        }
      },
      {
        type: 'value',
        show: true,
        name: 'ETH(Ξ)',
        axisLabel: {
          formatter: 'Ξ{value}'
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
    <div>
      <ReactECharts option={options} />
      <ChartTextContainer>
        <div className="changes">
          +68.45% last 7 days +202.07% last 30 days
        </div>
        <div className="update-time">
          Data was last updated 8 hours ago
        </div>
      </ChartTextContainer>
    </div>
  )
}

const Summary: React.FC = () => {
  return (
    <SummaryContainer>
      <div className="row">
        <div className="item">
          1,248,837,08 ETH ($4.04B)
        </div>
        <div className="item">
          BTC: $49,017,99
        </div>
      </div>
      <div className="row">
        <div className="item">
          Valuation of All NFT
        </div>
        <div className="item">
          Ethereum: $3,241.44
        </div>
      </div>
    </SummaryContainer>
  )
}

const ValuationPage: React.FC<ValuationPageProps> = () => {
  const { allWhitelistCollections, featureAddedWhitelistCollections } = useValuationOverviewData()

  return (
    <ValuationPageContainer>
      <Wrapper>
        <PageTitle />
        <TitleDivider />
        <Summary />
        <ValuationChart />
        <FeatureAddedWhitelistCollections collections={featureAddedWhitelistCollections} />
        <AllWhitelistCollections collections={allWhitelistCollections} />
      </Wrapper>
    </ValuationPageContainer>
  )
}

export default ValuationPage
