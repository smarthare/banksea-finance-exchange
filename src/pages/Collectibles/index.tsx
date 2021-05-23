import React from 'react'
import styled from 'styled-components'
import { Button, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const PageContainer = styled.div`
  padding-top: 5.6rem;
  width: 100%;
  height: 100vh;
  background-image: url(${require('../../assets/images/Banksy-Collectible-BG@2x.png').default});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #7c6deb;
`

const Title = styled.div`
  font-size: 3rem;
`

const Description = styled.div`
  font-size: 1.4rem;
`

const FilterContainer = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 3rem;
  padding: 2rem 3rem 0.4rem 3rem;
  width: 82.8rem;
  background: #ffffff;
  border-radius: 10px;

  .filter-item {
    font-size: 1.6rem;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.4rem;

    .key {
      flex: 2;
      margin-right: 2rem;
    }

    .values {
      flex: 9;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .value {
        margin-right: 2rem;
        margin-bottom: 1.5rem;
      }
    }
  }
`

const MyArtworksButton = styled(Button)`
  font-weight: bold;
  width: 17.3rem;
  height: 5rem;
  border-radius: 10px;
  color: white;
  background-color: #7c6deb;

  margin-right: 2rem;
`

const MintArtworksButton = styled(Button)`
  font-weight: bold;
  width: 17.3rem;
  height: 5rem;
  border-radius: 10px;
  border-color: #7c6deb;

  background-color: white;
  color: #7c6deb;
`

const SearchInput = styled(Input)`
  width: 22rem;
  border-color: #7c6deb;
  background-color: #e5e2fb;
  border-radius: 10px;

  .ant-input {
    background-color: #e5e2fb;
    color: #7c6deb;
    font-weight: bold;
  }
`

const MySelect = styled(Select)`
  margin-left: 2rem;

  &,
  .ant-select-selector {
    border-color: #7c6deb !important;
    border-radius: 10px !important;
    width: fit-content;
    height: 5rem !important;
    background-color: #e5e2fb !important;
    color: #7c6deb;
  }

  .ant-select-selection-item {
    font-weight: bold;
    text-align: center !important;
    line-height: 5rem !important;
    margin: 0 0.5rem !important;
  }
`

const Search: React.FC = () => {
  return <SearchInput prefix={<SearchOutlined style={{ color: '#7C6DEB', width: '1.5rem' }} />}></SearchInput>
}

const Filter: React.FC = () => {
  const filterItems = [
    {
      key: 'Featured Artists',
      values: [
        'SWOG',
        'CoralCorp',
        'Cookie Munster',
        'srnArtGallery',
        'Muwasha iProjects',
        'Irene Cerezo',
        'Mr Anderson',
        'Hamid',
        'Chiara Magni Copy'
      ]
    },
    {
      key: 'Digital Artworks',
      values: [
        'BSC Artists',
        'LoveNFT',
        'SafeNFT',
        'Musk&Doge',
        '1inch&BAKE',
        'BTC Artworks',
        'Seascape',
        'Binance NFT',
        'TKO NFT',
        'BAKE&Banana'
      ]
    },
    {
      key: 'Gamification NFT',
      values: ['DOGGY NFT', 'Rare Car', 'BakerySoccer', 'Battle Pets', 'Weapons', 'Pet Eggs']
    }
  ]

  return (
    <FilterContainer>
      {filterItems.map(item => (
        <div className="filter-item">
          <div className="key">{item.key}:</div>
          <div className="values">
            {item.values.map(value => (
              <div className="value">{value}</div>
            ))}
          </div>
        </div>
      ))}
    </FilterContainer>
  )
}

const TypeSelector: React.FC = () => {
  return (
    <MySelect defaultValue="1">
      <Select.Option value="1">All</Select.Option>
      <Select.Option value="2">Picture</Select.Option>
      <Select.Option value="3">Lucy</Select.Option>
    </MySelect>
  )
}

const OrderSelector: React.FC = () => {
  return (
    <MySelect defaultValue="1">
      <Select.Option value="1">Time</Select.Option>
      <Select.Option value="2">Price</Select.Option>
      <Select.Option value="3">Love</Select.Option>
    </MySelect>
  )
}

type CollectiblesPageProps = {}

const CollectiblesPage: React.FC<CollectiblesPageProps> = ({}) => {
  return (
    <PageContainer>
      <Title>NFT Marketplace</Title>
      <Description>A market made for NFT, where everything is special.</Description>
      <Filter />
      <div style={{ width: '82.8rem', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <MyArtworksButton>My Artworks</MyArtworksButton>
          <MintArtworksButton>Mint Artworks</MintArtworksButton>
        </div>
        <div style={{ display: 'flex' }}>
          <Search />
          <TypeSelector />
          <OrderSelector />
        </div>
      </div>
    </PageContainer>
  )
}

export default CollectiblesPage
