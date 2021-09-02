import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ThemeTable from '../../../styles/ThemeTable'

type AllWhitelistCollectionsProps = {
  collections: WhitelistCollection[]
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

  const CollectionIconAndName: React.FC<{ iconUrl: string, name: string }> = ({ iconUrl, name }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={iconUrl}
        alt={name}
        style={{ width: '30px', height: '30px', borderRadius: '15px', marginRight: '10px' }}
      />
      <span>{name}</span>
    </div>
  )

  const columns = [
    // {
    //   title: '#',
    //   key: 'index',
    //   dataIndex: 'index',
    // },
    {
      title: 'Collection',
      key: 'name',
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any) => <CollectionIconAndName {...record} />,
      width: '220px'
    },
    {
      title: 'Volume(7d)',
      dataIndex: 'volumeIn7Days',
      key: 'volumeIn7Days'
    },
    {
      title: 'Sales(7d)',
      dataIndex: 'salesIn7Days',
      key: 'salesIn7Days'
    },
    {
      title: 'Avg Price(7d)',
      dataIndex: 'avgPriceIn7Days',
      key: 'avgPriceIn7Days',
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
      dataIndex: 'owners',
      key: 'owners'
    },
    {
      title: 'Owner%',
      dataIndex: 'ownerProportion',
      key: 'ownerProportion'
    },
    {
      title: 'Estimated Market Cap',
      dataIndex: 'estimatedMarketCap',
      key: 'estimatedMarketCap',
      width: '180px'
    },
    {
      title: 'Volume(All Time)',
      dataIndex: 'volumeAllTime',
      key: 'volumeAllTime',
      width: '150px'
    },
    {
      title: 'Sales(All Time)',
      dataIndex: 'salesAllTime',
      key: 'salesAllTime',
      width: '140px'
    },
    {
      title: 'Added',
      dataIndex: 'added',
      key: 'added'
    }
  ]

  const onRow = (record: any) => {
    return {
      onClick: (event: SyntheticEvent) => {
        const collection = record as WhitelistCollection
        console.log(event, record)
        history.push(`/valuation/${collection.name}`)
      }
    }
  }

  return (
    <AllWhitelistCollectionsContainer>
      <div className="title">
        All Whitelist Collections
      </div>
      <ThemeTable columns={columns} dataSource={collections} onRow={onRow} scroll={{ x: 1500 }} />
    </AllWhitelistCollectionsContainer>
  )
}

export default AllWhitelistCollections
