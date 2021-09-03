import React, { useEffect } from 'react'
import * as echarts from 'echarts/core'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useCollectionValuationData } from '../../hooks/data/useCollectionValuationData'
import ReactECharts from 'echarts-for-react'
import ThemeTable from '../../styles/ThemeTable'
import { DropdownSelector } from '../../styles/DropdownSelector'
import { Button, Tooltip } from 'antd'
import { QuestionCircleOutlined, RightOutlined } from '@ant-design/icons'
import { SearchInput } from '../../styles/SearchInput'

import {
  CollectionExternalLink,
  CollectionToken,
  CollectionValuationByTypeAndAttribute,
  CollectionValuationChartData,
  CollectionValuationStatisticItem
} from '../../types/CollectionValuation'
import { useMediaQuery } from 'react-responsive'

type CollectionValuationPageProps = {
  //
}

const CollectionValuationPageContainer = styled.div`
  padding: 30px 0;
  color: #9BBFFC;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1380px;
  width: 80%;
`

const Banner = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  padding: 0;
  margin-bottom: 30px;
  border-radius: 10px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .name {
    font-size: 42px;
    font-weight: 700;
    margin-right: 40px;
  }

  .external-links {
    display: flex;
    color: #9BBFFC;

    .item {
      display: flex;
      align-items: center;
      margin-left: 40px;
      font-size: 14px;

      &:nth-of-type(1) {
        margin-left: 0;
      }

      .icon {
        height: 17px;
        margin-right: 10px;
      }

      .text {
        color: #9BBFFC;
      }
    }
  }
`

const DescriptionContainer = styled.div`
  margin-top: 27px;
  margin-bottom: 31px;

  .title {
    font-size: 22px;
    font-weight: 700;
  }

  .content {
    font-size: 14px;
    font-weight: 400;
  }
`

const StatisticContainer = styled.div`
  display: flex;
  max-width: 550px;
  flex-wrap: wrap;
  margin-bottom: 72px;
  justify-content: space-between;
  //border: 1px red solid;

  .item {
    //border: 1px red solid;
    width: 180px;
    margin-bottom: 30px;

    .key {
      margin-bottom: 10px;

      color: rgba(155, 191, 252, 0.8);
      font-size: 13.5px;
    }

    .value {
      font-size: 20px;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 1100px) {
    margin-left: auto;
    margin-right: auto;

    .item {
      width: 45%;
    }
  }
`

const ChartsContainer = styled.div`
  width: 100%;

  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      height: 500px;
      width: calc(50% - 50px);

      .title {
        margin-bottom: 47px;
        display: flex;
        align-items: center;

        .text {
          font-size: 42px;
          margin-right: 10px;
        }

        .icon {
          font-size: 20px;
          position: relative;
          top: 10px;
        }
      }

      .chart {
        height: 465px;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    margin: 0 auto;

    .row {
      margin-left: -10%;
      margin-right: -10%;

      .item {
        width: 100%;
        text-align: center;
      }
    }
  }
`

const ValuationTableContainer = styled.div`

  .title {
    font-size: 30px;
  }

  margin-bottom: 80px;

  @media screen and (max-width: 1100px) {
    margin-left: -10%;
    margin-right: -10%;

    .title {
      font-size: 6vw;
      text-align: center;
    }
  }
`

const CollectionNFTListContainer = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    flex-wrap: wrap;

    .title {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .text {
      font-weight: 600;
    }

    .operators {
      flex-wrap: wrap;

      &, .sort-by, .buttons, .pager {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      button {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #305099;

        margin: 0 11px;

        img {
          width: 22px;
          height: 22px;
          margin: 0 auto;
        }
      }

      .next {
        width: 89px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      cursor: pointer;
      width: 210px;
      height: 278px;
      background-color: #101C3A;
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 10px;

      &-header {
        display: flex;
        justify-content: space-between;
      }

      img {
        width: 190px;
        height: 190px;
        border-radius: 10px;
        margin: 10px 0;
      }

      &-header, &-id {
        color: white;
        font-size: 14px;
        font-weight: 500;
      }

      &-id {
      }
    }
  }
`

const Title: React.FC<{
  name: string,
  externalLinks: CollectionExternalLink[]
}> = ({ name, externalLinks }) => {
  return (
    <TitleContainer>
      <div className="name">{name}</div>
      <div className="external-links">
        {
          externalLinks
            .filter(item => item.url)
            .map(item => (
              <a className="item" href={item.url} key={item.name} target="_blank" rel="noreferrer">
                <img src={item.iconUrl} alt={item.name} className="icon" />
                <div className="text">{item.name}</div>
              </a>
            ))
        }
      </div>
    </TitleContainer>
  )
}

const Description: React.FC<{ description: string }> = ({ description }) => {
  return (
    <DescriptionContainer>
      <div className="title">Description</div>
      <div className="content">{description}</div>
    </DescriptionContainer>
  )
}

const Statistic: React.FC<{ statistic: CollectionValuationStatisticItem[] }> = ({ statistic }) => {
  return (
    <StatisticContainer>
      {
        statistic.map(({ key, value }) => (
          <div key={key} className="item">
            <div className="key">{key}</div>
            <div className="value">{value}</div>
          </div>
        ))
      }
    </StatisticContainer>
  )
}

const TradeFlowChart: React.FC<{ tradeFlowData: any }> = ({ tradeFlowData }) => {
  const { nodes, links } = tradeFlowData

  const options = {
    darkMode: true,
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        data: nodes,
        links: links,
        emphasis: {
          focus: 'adjacency'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        label: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ]
  }

  return <ReactECharts option={options} />
}

const HeatTrendChart: React.FC<{ heatTrendData: any }> = ({ heatTrendData }) => {
  const countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom']
  const datasetWithFilters: any = []
  const seriesList: any = []

  const isMobile = useMediaQuery({ query: '(max-width:1000px)' })

  countries.forEach(country => {
    const datasetId = 'dataset_' + country
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    })
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function(params: any) {
          return params.value[3] + ': ' + params.value[0]
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'Year',
        tooltip: ['Income']
      }
    })
  })

  const option = {
    darkMode: true,
    grid: {
      top: 30,
      bottom: 20,
      right: isMobile ? 4 : 100,
      left: 48
    },
    animationDuration: 6000,
    dataset: [{
      id: 'dataset_raw',
      source: heatTrendData
    }].concat(datasetWithFilters),
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Heat'
    },
    series: seriesList
  }

  return <ReactECharts option={option} />
}

const PriceScatterChart: React.FC<{ priceData: any }> = ({ priceData }) => {
  const option = {
    darkMode: true,
    grid: {
      top: 20, bottom: 20, left: 66, right: 20
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {},
    series: [{
      data: priceData,
      type: 'scatter'
    }],
    tooltip: {
      formatter: '{b0}: {c0}'
    }
  }

  return <ReactECharts option={option} />
}

const TotalMarketValueChart: React.FC<{ heatTrendData: any }> = ({ heatTrendData }) => {
  const option = {
    darkMode: true,
    grid: {
      top: 20, bottom: 20, left: 40, right: 20
    },
    tooltip: {
      trigger: 'axis',
      position: function(pt: any) {
        return [pt[0], '10%']
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: heatTrendData.date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 10
    }],
    series: [
      {
        name: 'Market Value',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(255, 158, 68)'
          }, {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }])
        },
        data: heatTrendData.data
      }
    ]
  }

  return <ReactECharts option={option} />
}

const Charts: React.FC<{ chartData: CollectionValuationChartData }> = ({ chartData }) => {
  const { totalMarketValue, tradeFlow, heatTrend, priceScatter } = chartData

  const items: { title: string, description: string, component: JSX.Element, show: boolean }[] = [
    {
      title: 'Trend of Heat',
      description: 'Here is description',
      component: <HeatTrendChart heatTrendData={heatTrend} />,
      show: !!heatTrend
    },
    {
      title: 'Price Scatter',
      description: 'Here is description',
      component: <PriceScatterChart priceData={priceScatter} />,
      show: !!priceScatter
    },
    {
      title: 'Total Market Value',
      description: 'Here is heat of trend',
      component: <TotalMarketValueChart heatTrendData={totalMarketValue} />,
      show: !!totalMarketValue
    },
    {
      title: 'Trade Flows',
      description: 'Here is heat of trend',
      component: <TradeFlowChart tradeFlowData={tradeFlow} />,
      show: !!tradeFlow
    }
  ]

  return (
    <ChartsContainer>
      <div className="row">
        {
          items.map(({ title, show, component, description }) => (
            <div className="item" key={title}>
              <div className="title">
                <div className="text">
                  {title}
                </div>
                <Tooltip title={description}>
                  <QuestionCircleOutlined className="icon" />
                </Tooltip>
              </div>
              <div className="chart">
                {
                  show && component
                }
              </div>
            </div>
          ))
        }
      </div>
    </ChartsContainer>
  )
}

const ValuationTable: React.FC<{ valuations: CollectionValuationByTypeAndAttribute[] }> = ({ valuations }) => {
  const columns = [
    {
      title: 'Prevailing Trend',
      key: 'prevailingTrend',
      dataIndex: 'prevailingTrend',
      width: '120px'
    },
    {
      title: 'Accessory',
      key: 'accessory',
      dataIndex: 'accessory',
      width: '150px'
    },
    {
      title: 'Number',
      key: 'number',
      dataIndex: 'number',
      width: '90px'
    },
    {
      title: 'Valuation',
      key: 'valuation',
      dataIndex: 'valuation',
      width: '200px'
    },
    {
      title: 'Average',
      key: 'average',
      dataIndex: 'average',
      width: '180px'
    }
  ]

  return (
    <ValuationTableContainer>
      <div className="title">Valuation by Type and Attribute</div>
      <ThemeTable columns={columns} dataSource={valuations} pagination={false} scroll={{ x: 1000 }} />
    </ValuationTableContainer>
  )
}

const CollectionNFTList: React.FC<{ tokens: CollectionToken[] }> = ({ tokens }) => {
  const history = useHistory()
  const { collection } = useParams<{ collection: string }>()


  return (
    <CollectionNFTListContainer>
      <div className="header">
        <div className="title">10,000 Total CryptoPunks</div>
        <div className="operators">
          <div className="sort-by">
            <div className="text" style={{ marginRight: '15px' }}>Sort by</div>
            <DropdownSelector style={{ width: '214px', marginRight: '24px' }} defaultValue="Rarity">
              <DropdownSelector.Option value="Rarity">Rarity</DropdownSelector.Option>
              <DropdownSelector.Option value="Price">Price</DropdownSelector.Option>
            </DropdownSelector>
          </div>
          <div className="buttons">
            <button>IDs</button>
            <button style={{ marginRight: '33px' }}>
              <img
                src={require('../../assets/images/commons/image.png').default}
                alt="image"
              />
            </button>
          </div>
          <div className="pager">
            <div className="text">Page</div>
            <SearchInput style={{ marginRight: '10px', marginLeft: '10px', width: '45px' }} />
            <div className="text" style={{ marginRight: '10px' }}>of 209</div>
            <Button className="next">Next<RightOutlined /></Button>
          </div>
        </div>
      </div>
      <div className="list">
        {
          tokens.map((token, index) => (
            <div className="item"
              key={index}
              onClick={() => history.push(`/valuation/${collection}/${token.tokenId}`)}
            >
              <div className="item-header">
                <div>#{index}</div>
                <div>{token.owner}</div>
              </div>
              <img src={token.imageUrl} alt={token.tokenId.toString()} />
              <div className="item-id">
                CryptoPunks #{token.tokenId}
              </div>
            </div>
          ))
        }
        {
          new Array(5).fill({}).map((_, index) => (
            <div className="item" style={{ height: '0', padding: '0' }} key={index} />
          ))
        }
      </div>
    </CollectionNFTListContainer>
  )
}

const CollectionValuationPage: React.FC<CollectionValuationPageProps> = () => {
  const { collection } = useParams<{ collection: string }>()

  const data = useCollectionValuationData(collection)

  useEffect(() => {
    document.getElementById('main')!.scrollTo(0, 0)
  }, [])

  return (
    <CollectionValuationPageContainer>
      <Wrapper>
        <Banner src={data.bannerImageUrl} />
        <Title {...data} />
        <Description {...data} />
        <Statistic {...data} />
        <Charts {...data} />
        <ValuationTable {...data} />
        <CollectionNFTList {...data} />
      </Wrapper>
    </CollectionValuationPageContainer>
  )
}

export default CollectionValuationPage
