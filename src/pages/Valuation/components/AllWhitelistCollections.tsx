import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ThemeTable from '../../../styles/ThemeTable'
import { RankingCollection } from '../../../hooks/queries/insight/overview/useRankingCollectionsQuery'

type AllWhitelistCollectionsProps = {
  collections: RankingCollection[]
}

export type WhitelistCollection = {
  iconUrl: string
  name: string
  volumeIn7Days: string
  salesIn7Days: number
  avgPriceIn7Days: string
  totalSupply: number
  owners: number
  ownerProportion: number
  estimatedMarketCap: string
  volumeAllTime: string
  salesAllTime: number
  added: string
}

const AllWhitelistCollectionsContainer = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 1680px) {
    margin-left: -10%;
    margin-right: -10%;
  }

  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 45px;
    margin-top: 88px;
  }
`


const AllWhitelistCollections: React.FC<AllWhitelistCollectionsProps> = ({ collections }) => {
  const history = useHistory()

  const query = (id: string, name: string) => new URLSearchParams([
    ['id', id],
    ['name', name]
  ]).toString()

  const CollectionIconAndName: React.FC<{ seriesLogo: string, seriesName: string }> = ({ seriesLogo, seriesName }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={seriesLogo}
        alt={seriesName}
        style={{ width: '30px', height: '30px', borderRadius: '15px', marginRight: '10px' }}
      />
      <span>{seriesName}</span>
    </div>
  )

  const columns = [
    // {
    //   title: '#',
    //   key: 'index',
    //   dataIndex: 'index',
    // },
    // {
    //   title: 'Owner%',
    //   dataIndex: 'ownerProportion',
    //   key: 'ownerProportion'
    // },
    {
      title: 'Collection',
      // eslint-disable-next-line react/display-name
      render: (text: string, record: any) => <CollectionIconAndName {...record} />,
      width: '220px'
    },
    {
      title: 'Volume(7d)',
      dataIndex: 'sevenDayVolume',
      key: 'sevenDayVolume',
      width: '120px'
    },
    {
      title: 'Transactions(7d)',
      dataIndex: 'sevenDayTransaction',
      key: 'sevenDayTransaction',
      width: '120px'
    },
    {
      title: 'Avg Price(7d)',
      dataIndex: 'sevenDayAvgPrice',
      key: 'sevenDayAvgPrice',
      width: '120px'
    },
    {
      title: 'Total supply',
      dataIndex: 'totalSupply',
      key: 'totalSupply',
      width: '120px'
    },
    {
      title: 'Owners',
      dataIndex: 'numOwners',
      key: 'numOwners',
      width: '110px'
    },
    {
      title: 'Estimated Market Cap',
      dataIndex: 'marketCap',
      key: 'marketCap',
      width: '180px'
    },
    {
      title: 'Volume(All Time)',
      dataIndex: 'totalVolume',
      key: 'totalVolume',
      width: '150px'
    },
    {
      title: 'Transactions(All Time)',
      dataIndex: 'allTransaction',
      key: 'allTransaction',
      width: '180px'
    },
  ]

  const onRow = (record: any) => {
    return {
      onClick: () => {
        const collection = record as RankingCollection
        history.push(`/valuation/collection?${query(collection.id, collection.seriesName)}`)
      }
    }
  }

  return (
    <AllWhitelistCollectionsContainer>
      <div className="title">
        All Whitelist Collections
      </div>
      <ThemeTable
        columns={columns}
        dataSource={collections}
        onRow={onRow}
        scroll={{ x: 1500 }}
        rowCursor={'pointer'}
      />
    </AllWhitelistCollectionsContainer>
  )
}

export default AllWhitelistCollections
