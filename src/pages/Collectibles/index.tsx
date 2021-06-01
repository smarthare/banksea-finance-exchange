import React from 'react'
import styled from 'styled-components'
import { Button, Input, Pagination, Select } from 'antd'
import { HeartOutlined, SearchOutlined } from '@ant-design/icons'

import '../../styles/override-antd-select-dropdown.scss'
import { SolibleNFT, USE_ALL_NFTS } from '../../assets/SolibleNfts'
import { useHistory } from 'react-router-dom'

const PageContainer = styled.div`
  padding-top: 5.6rem;
  width: 100%;
  height: fit-content;
  background-image: url(${require('../../assets/images/Banksy-Collectible-BG@2x.png').default});
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #7c6deb;
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: 500;
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

const NFTItemCardContainer = styled.div`
  width: 19.2rem;
  height: 37rem;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2.5rem;
  margin-right: 2rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 17.2rem;
    height: 20.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
  }

  .name {
    margin-bottom: 1.5rem;
  }

  .like {
    display: flex;
    align-items: center;
    .heart {
      margin-right: 0.5rem;
    }
  }

  .button {
    width: 100%;
    height: 4rem;
    border-radius: 1rem;
    background-color: #7c6deb;
    color: white;
    font-weight: 500;
  }
`

const NFTListContainer = styled.div`
  width: 90.8rem;
  padding-left: 4rem;
  display: flex;
  flex-wrap: wrap;
`

const Paginations = styled(Pagination)`
  margin-bottom: 50px;

  .ant-pagination-prev .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124,109,235,0.2) !important;
    color: #7C6DEB;
  }
  .ant-pagination-item-active {
    border: 1px solid rgba(124,109,235,0.2) !important;
  }
  .ant-pagination-item-active a {
    color: #7C6DEB !important;
  }
  .ant-pagination-item {
    border: 1px solid rgba(124,109,235,0.2) !important;
  }
  .ant-pagination-item a {
    //color: rgba(124,109,235,0.2) !important;
  }
  .ant-pagination-next .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124,109,235,0.2) !important;
    color: #7C6DEB;
  }
`

const Search: React.FC = () => {
  return <SearchInput prefix={<SearchOutlined style={{ color: '#7C6DEB', width: '1.5rem' }} />} />
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
        <div className="filter-item" key={item.key}>
          <div className="key">{item.key}:</div>
          <div className="values">
            {item.values.map(value => (
              <div className="value" key={value}>
                {value}
              </div>
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
      <Select.Option className="customized-option" value="1">
        Time
      </Select.Option>
      <Select.Option className="customized-option" value="2">
        Price
      </Select.Option>
      <Select.Option className="customized-option" value="3">
        Love
      </Select.Option>
    </MySelect>
  )
}

type NFTItemCardProps = {
  data: SolibleNFT
}

const NFTItemCard: React.FC<NFTItemCardProps> = ({ data }) => {
  const history = useHistory()

  const CornerFlag: React.FC = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '-1rem',
          left: '-0.45rem',
          color: 'white',
          fontWeight: 500,
          textAlign: 'center',
          lineHeight: '3rem',
          zIndex: 1049,
          width: '8.5rem',
          height: '3.7rem',
          backgroundImage: `url(${require('../../assets/images/collectibles-item-corner-flag-bg.png').default})`,
          backgroundSize: 'cover'
        }}
      >
        on Sale
      </div>
    )
  }

  const ApproveVoteButton: React.FC = () => {
    return (
      <Button
        style={{
          position: 'absolute',
          right: '3.7rem',
          top: '2.4rem',
          width: '10.9rem',
          height: '3rem',
          color: 'white',
          borderRadius: '1rem',
          fontSize: '1.2rem',
          fontWeight: 500,
          border: 'none',
          backgroundColor: '#829FF2'
        }}
      >
        Approve Vote
      </Button>
    )
  }

  const routeToDetailPage = () => history.push(`/collectible/${data.name}`)

  return (
    <div style={{ position: 'relative' }}>
      <CornerFlag />
      <ApproveVoteButton />
      <NFTItemCardContainer>
        <div  style={{ cursor: 'pointer' }} onClick={routeToDetailPage}>
          <img src={data.img.default} alt="" />
          <div className="name">{data.name}</div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
            <div className="like">
              <HeartOutlined className="heart" />5
            </div>
            <div className="price">5 ETH</div>
          </div>
          <Button className="button">Connect Wallet</Button>
        </div>
      </NFTItemCardContainer>
    </div>
  )
}

const NFTList: React.FC = () => {
  return (
    <NFTListContainer>
      {USE_ALL_NFTS.map((nft, index: number) => (
        <NFTItemCard data={nft} key={index} />
      ))}
    </NFTListContainer>
  )
}

const CollectiblesPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>NFT Marketplace</Title>
      <Description>A market made for NFT, where everything is special.</Description>
      <Filter />
      <div style={{ width: '82.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '5.5rem' }}>
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
      <NFTList />
      <Paginations defaultCurrent={1} total={50} />
    </PageContainer>
  )
}

export default CollectiblesPage
