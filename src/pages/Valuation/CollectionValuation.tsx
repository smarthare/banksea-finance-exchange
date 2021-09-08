import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ThemeTable from '../../styles/ThemeTable'
import { DropdownSelector } from '../../styles/DropdownSelector'
import { Pagination, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import {
  CollectionExternalLink,
  CollectionToken,
  CollectionValuationStatisticItem
} from '../../types/CollectionValuation'
import { CollectionHeatCompositionChart } from './components/charts/CollectionHeatCompositionChart'
import { PriceScatterChart } from './components/charts/PriceScatterChart'
import { TotalMarketValueChart } from './components/charts/TotalMarketValueChart'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import {
  convertCollectionValuationDetailToCollectionExternalLinks,
  convertCollectionValuationDetailToCollectionValuationStatisticItems
} from '../../converters/insight'
import { useCollectionNftsQuery } from '../../hooks/queries/insight/collection/useCollectionNftsQuery'
import { useCollectionValuationDetailQuery } from '../../hooks/queries/insight/collection/useCollectionValuationDetailQuery'
import { TradeFlowChart } from './components/charts/TradeFlowChart'
import { useMediaQuery } from 'react-responsive'
import { useCollectionValuationAttributeQuery } from '../../hooks/queries/insight/collection/useCollectionValuationAttributeQuery'

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
          font-size: 36px;
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
  position: relative;

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
    //display: flex;
    //justify-content: space-between;
    margin-bottom: 25px;
    //flex-wrap: wrap;

    .sb-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .title {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .text {
      font-weight: 600;
    }

    .sort-by, .buttons, .pager {
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

  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-right: -10px;

    .item {
      cursor: pointer;
      width: 210px;
      height: 278px;
      background-color: #101C3A;
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 10px;
      margin-right: 10px;

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
    }

    .item.empty {
      padding: 0;
      height: 0;
    }

  }
`

const Title: React.FC<{
  name?: string,
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

const Description: React.FC<{ description?: string }> = ({ description }) => {
  return (
    <DescriptionContainer>
      <div className="title">Description</div>
      <div className="content">{description ?? 'No description yet.'}</div>
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

const Charts: React.FC<{ seriesId: string, contractAddress: string, seriesSlug?: string }> = ({ seriesId, contractAddress, seriesSlug }) => {
  const items: { title: string, description: string, component: JSX.Element }[] = [
    {
      title: 'Composition of Collection Heat',
      description: 'Here is description',
      component: <CollectionHeatCompositionChart seriesSlug={seriesSlug} />
    },
    {
      title: 'Price Scatter',
      description: 'Here is description',
      component: <PriceScatterChart contractAddress={contractAddress} />
    },
    {
      title: 'Total Market Value',
      description: 'Here is heat of trend',
      component: <TotalMarketValueChart seriesId={seriesId} />
    },
    {
      title: 'Trade Flows',
      description: 'Here is heat of trend',
      component: <TradeFlowChart />
    }
  ]

  return (
    <ChartsContainer>
      <div className="row">
        {
          items.map(({ title, component, description }) => (
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
                {component}
              </div>
            </div>
          ))
        }
      </div>
    </ChartsContainer>
  )
}

const ValuationTable: React.FC<{ id: string }> = ({ id }) => {
  const [current, setCurrent] = useState(1)

  const { data } = useCollectionValuationAttributeQuery({
    id,
    current
  })

  const columns = [
    {
      title: 'Type',
      key: 'attributeType',
      dataIndex: 'attributeType',
      width: '120px'
    },
    {
      title: 'Value',
      key: 'attributeValue',
      dataIndex: 'attributeValue',
      width: '150px'
    },
    {
      title: 'Number',
      key: 'numNft',
      dataIndex: 'numNft',
      width: '90px'
    },
    {
      title: 'Rarity',
      key: 'rateAttribute',
      render: (text: string, row: any) => `${(row.rateAttribute * 100).toFixed(3)}%`,
      width: '200px'
    },
  ]

  const handlePaginationChange = (current: number) => {
    setCurrent(current)
  }

  return (
    <ValuationTableContainer>
      <div className="title">Valuation by Type and Attribute</div>
      <ThemeTable
        columns={columns}
        dataSource={data?.records}
        scroll={{ x: 1000 }}
        style={{ marginTop: '-40px' }}
        pagination={{
          total: data?.total,
          pageSize: 10,
          showSizeChanger: false,
          onChange: handlePaginationChange,
          showQuickJumper: true,
          position: ['topRight']
        }}
      />
    </ValuationTableContainer>
  )
}

const CollectionNFTList: React.FC<{ tokens?: CollectionToken[] }> = () => {
  const seriesId = useLocationQuery('id')
  const collection = useLocationQuery('name')
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(60)
  const [total, setTotal] = useState(0)

  const { data } = useCollectionNftsQuery({
    nftSeriesId: seriesId!,
    current,
    size
  })

  const handlePaginationChange = (current: number, size?: number) => {
    setCurrent(current)
    size && setSize(size)
  }

  useEffect(() => {
    if (data) {
      setTotal(data.total)
    }
  }, [data])

  return (
    <CollectionNFTListContainer>
      <div className="header">
        <div className="sb-row">
          <div className="title">{data?.total ?? '-'} Total {collection}</div>
          <div className="sort-by">
            <div className="text" style={{ marginRight: '15px' }}>Sort by</div>
            <DropdownSelector style={{ width: '214px', marginRight: '24px' }} defaultValue="Rarity">
              <DropdownSelector.Option value="Rarity">Rarity</DropdownSelector.Option>
              <DropdownSelector.Option value="Price">Price</DropdownSelector.Option>
            </DropdownSelector>
          </div>
        </div>
        {/*<div className="buttons">
          <button>IDs</button>
          <button style={{ marginRight: '33px' }}>
            <img
              src={require('../../assets/images/commons/image.png').default}
              alt="image"
            />
          </button>
        </div>*/}
        <div className="sb-row" style={{ justifyContent: isMobile?'center':'flex-end' }}>
          <Pagination
            showQuickJumper
            showSizeChanger={false}
            total={total}
            onChange={handlePaginationChange}
            pageSize={size}
            current={current}
            className={'pager'}
            pageSizeOptions={['12', '24', '48', '60']}
          />
        </div>

      </div>
      <div className="list">
        {
          data?.records?.map((item, index) => (
            <div className="item"
              key={index}
              onClick={() => window.open(`#/valuation/token/${item.id}`)}
            >
              <div className="item-header">
                <div>#{item.nftNumber}</div>
                <div>{item.nftOwner}</div>
              </div>
              <img src={item.nftImageUrl} alt={item.id} />
              <div className="item-id">
                {item.nftName}
              </div>
            </div>
          ))
        }
        {
          new Array(5).fill({}).map((_, index) => (
            <div className="item empty" key={index} />
          ))
        }
      </div>
    </CollectionNFTListContainer>
  )
}

const CollectionValuationPage: React.FC<CollectionValuationPageProps> = () => {
  const collection = useLocationQuery('name')
  const seriesId = useLocationQuery('id')
  const history = useHistory()

  if (!seriesId || !collection) {
    history.push('/valuation')
    return <></>
  }

  const { data: detail } = useCollectionValuationDetailQuery(seriesId)

  useEffect(() => {
    document.getElementById('main')!.scrollTo(0, 0)
  }, [])

  return (
    <CollectionValuationPageContainer>
      <Wrapper>
        <Banner src={detail?.seriesPoster} />
        <Title name={detail?.seriesName}
          externalLinks={convertCollectionValuationDetailToCollectionExternalLinks(detail)}
        />
        <Description description={detail?.seriesDescription} />
        <Statistic statistic={convertCollectionValuationDetailToCollectionValuationStatisticItems(detail)} />
        <Charts seriesId={seriesId} contractAddress={detail?.assetContractAddress ?? ''} seriesSlug={detail?.seriesSlug} />
        <ValuationTable id={seriesId} />
        <CollectionNFTList />
      </Wrapper>
    </CollectionValuationPageContainer>
  )
}

export default CollectionValuationPage
