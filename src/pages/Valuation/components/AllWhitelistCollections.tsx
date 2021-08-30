import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'

type AllWhitelistCollectionsProps = {
  collections: WhitelistCollection[]
}

export type WhitelistCollection = {
  index: number
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

  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 45px;
    margin-top: 88px;
  }
`

const StyledTable = styled(Table)`
  width: 100%;
  margin-top: 1.5rem;

  .ant-table-thead > tr > th {
    background-color: #0B111E !important;
  }

  .ant-table-thead .ant-table-cell {
    font-size: 14px;
    font-weight: 550;
    line-height: 20px;
    color: rgb(244, 244, 244);
  }

  .ant-table-tbody .ant-table-cell {
    font-size: 1.4rem;
    color: rgb(244, 244, 244);
    line-height: 20px;
  }

  .ant-table-tbody .ant-table-cell :first-child {
    border-radius: 5rem;
  }

  .ant-table-row {
    background-color: #18284C;
    user-select: none;
  }

  .ant-table-tbody {
    > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-row-hover, .ant-table-row-hover > td {
      background: #354d86 !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: 4px solid #0B111E;
    border-top: 4px solid #0B111E;
  }

  .ant-table-empty {
    background-color: transparent;
  }

  .ant-table-pagination {
    li .ant-select-selector, li, li > button, li > a, li svg {
      background: #354d86 !important;
      color: white !important;
    }

    li button span svg {
      position: relative;
      bottom: 2.5px!important;
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 0 8vw;
    width: 100vw !important;
    overflow-x: scroll;
    position: relative;
  }
`


const AllWhitelistCollections: React.FC<AllWhitelistCollectionsProps> = ({ collections }) => {
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
    {
      title: '#',
      key: 'index',
      dataIndex: 'index',
    },
    {
      title: 'Collection',
      key: 'name',
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any) => <CollectionIconAndName {...record} />
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
      key: 'avgPriceIn7Days'
    },
    {
      title: 'Total supply',
      dataIndex: 'totalSupply',
      key: 'totalSupply'
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
      title: 'Volume(All Time)',
      dataIndex: 'estimatedMarketCap',
      key: 'estimatedMarketCap'
    },
    {
      title: 'Volume(All Time)',
      dataIndex: 'volumeAllTime',
      key: 'volumeAllTime'
    },
    {
      title: 'Sales(All Time)',
      dataIndex: 'salesAllTime',
      key: 'salesAllTime'
    },
    {
      title: 'Added',
      dataIndex: 'added',
      key: 'added'
    }
  ]

  return (
    <AllWhitelistCollectionsContainer>
      <div className="title">
        All Whitelist Collections
      </div>
      <StyledTable columns={columns} dataSource={collections} />
    </AllWhitelistCollectionsContainer>
  )
}

export default AllWhitelistCollections
