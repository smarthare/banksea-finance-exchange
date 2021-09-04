import React from 'react'
import styled from 'styled-components'
import FeatureAddedWhitelistCollections from './components/FeatureAddedWhitelistCollections'
import AllWhitelistCollections from './components/AllWhitelistCollections'
import { useValuationOverviewData } from '../../hooks/data/useValuationOverviewData'
import { CollectionsHearTrendChart } from './components/charts/CollectionsHeatTrendChart'
import { AllNFTValuationChart, AllNFTValuationChartData } from './components/charts/AllNFTValuationChart'

type ValuationPageProps = {
  //
}

const ValuationPageContainer = styled.div`
  color: white;
`

const Wrapper = styled.div`
  max-width: 1380px;
  width: 80%;
  margin: 0 auto;
  margin-top: 45px;
`

const PageTitle = styled.div`
  font-size: 30px;
  font-weight: 500;

  &:before {
    content: 'NFT Insight';
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
  font-weight: 500;
  line-height: 36px;
  margin-bottom: 45px;

  .item {
    display: flex;
    align-items: flex-end;

    .value {
      color: #eee;
      font-size: 25px;
    }

    .key {
      color: #b2b2b2;
      font-size: 18px;
      margin-right: 10px;
      height: 32px;
    }
  }

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
  user-select: none;

  div {
    display: inline-block;
  }

  .label {
    font-size: 14px;
    color: #b2b2b2;
    margin-right: 10px;
  }

  .value {
    font-size: 20px;
    color: white;
    font-weight: 600;
    margin-right: 20px;
  }

`

const AllNFTValuation: React.FC<{ data?: AllNFTValuationChartData }> = ({ data }) => {
  return (
    <div style={{ marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
        Valuation of All NFT
      </div>
      {
        data && <AllNFTValuationChart {...data} />
      }
      <ChartTextContainer>
        <div>
          <div className="label">last 7 days</div>
          <div className="value">+68.45%</div>
          <div className="label">last 30 days</div>
          <div className="value"> +202.07%</div>
        </div>
        <div>
          <div className="label">Data was last updated</div>
          <div className="value">8 hours ago</div>
        </div>
      </ChartTextContainer>
    </div>
  )
}

const CollectionsHeatTrend: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
        Heat Trend of Collections
      </div>
      {
        data && (
          <CollectionsHearTrendChart
            chartData={data}
            collections={['CryptoPunks', 'Animetas', 'Meebits', 'Bored Ape Yacht Club']}
          />
        )
      }
    </div>
  )
}

const Summary: React.FC = () => {
  return (
    <SummaryContainer>
      <div className="row">

        <div className="item">
          <div className="key">Total Value:</div>
          <div className="value">
            1,248,837,08 ETH ($4.04B)
          </div>
        </div>
        <div className="item">
          <div className="key">
            BTC:
          </div>
          <div className="value">
            $49,017,99
          </div>
        </div>
      </div>
      <div className="row">
        <div className="item" />

        <div className="item">
          <div className="key">
            Ethereum:
          </div>
          <div className="value">
            $3,241.44
          </div>
        </div>
      </div>
    </SummaryContainer>
  )
}

const ValuationPage: React.FC<ValuationPageProps> = () => {
  const {
    allWhitelistCollections,
    featureAddedWhitelistCollections,
    collectionsHeatTrendData,
    allNftValuationData
  } = useValuationOverviewData()

  return (
    <ValuationPageContainer>
      <Wrapper>
        <PageTitle />
        <TitleDivider />
        <Summary />
        <AllNFTValuation data={allNftValuationData} />
        <CollectionsHeatTrend data={collectionsHeatTrendData} />
        <FeatureAddedWhitelistCollections collections={featureAddedWhitelistCollections} />
        <AllWhitelistCollections collections={allWhitelistCollections} />
      </Wrapper>
    </ValuationPageContainer>
  )
}

export default ValuationPage
