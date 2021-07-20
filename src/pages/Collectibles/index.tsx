import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Pagination, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import '../../styles/override-antd-select-dropdown.scss'
import NFTListItem from '../../components/NFTListItem'
import clsx from 'clsx'
import ListPageLoading from '../../components/ListPageLoading'
import { useNFTsQuery } from '../../hooks/queries/useNFTsQuery'
import { useMediaQuery } from 'react-responsive'

const PageContainer = styled.div`
  padding: 0 16rem;
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #97BCF6;
  overflow-x: hidden;

  @media screen and (min-width : 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: 200vh;
    background-color: #0B111E;
    padding: 0;
  }
`

const Title = styled.div`
  font-size: 4.6rem;
  font-weight: 550;
  background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  line-height: 4.2rem;
  margin-top: 5vh;

  @media screen and (max-width: 1000px) {
    font-size: 8vw;
  }
`

const FilterContainer = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 3rem;
  padding: 2rem 3rem 0.4rem 3rem;
  width: 120.2rem;
  background: #0C152B;
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
      color: #97BCF6;
      font-weight: bolder;
    }

    .values {
      flex: 9;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .value {
        margin-right: 2rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        padding: 0.2rem 0.8rem;
      }

      .value.active {
        border-radius: 10px;
        background-color: #97BCF6;
        color: black;
      }
    }
  }
`

/*const Description = styled.div`
  font-size: 1.4rem;
`

const MyArtworksButton = styled(Button)`
  font-weight: bold;
  width: 17.3rem;
  height: 4rem;
  border-radius: 10px;
  color: white;
  background-color: #7c6deb;

  margin-right: 2rem;
`

const MintArtworksButton = styled(Button)`
  font-weight: bold;
  width: 17.3rem;
  height: 4rem;
  border-radius: 10px;
  border-color: #7c6deb;

  background-color: white;
  color: #7c6deb;
`*/

const SearchInput = styled(Input)`
  height: 4rem;
  border-color: #305099;
  background-color: #305099;
  border-radius: 10px;

  .ant-input {
    background-color: #305099;
    color: white;
    font-weight: bold;
  }

  @media screen and (max-width: 1000px) {
    width: 68vw;
    margin-bottom: 2vh;
  }

`

const MySelect = styled(Select)`
  margin-left: 2.5rem;


  &,
  .ant-select {
    height: 4rem !important;
  }

  .ant-select-selector {
    border-color: #305099 !important;
    border-radius: 10px !important;
    width: fit-content;
    height: 5rem !important;
    background-color: #305099 !important;
    color: white;
    height: 4rem !important;
    display: flex;
    align-items: center
  }

  .ant-select-selection-item {
    font-weight: bold;
    color:white; !important;
    text-align: center !important;
    line-height: 5rem !important;
    margin: 0 0.5rem !important;
  }

  span {
    color: white;
  }

  @media screen and (max-width: 1000px) {
    margin-left: 0;
    .ant-select-selector {
      width: fit-content;
      height: 4rem !important;
      color: white;
      font-size: 1rem;
    }

  }
`

const NFTListContainer = styled.div`
  width: 120.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 1rem;

  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 1rem;
  }
`

const CustomPagination = styled(Pagination)`
  margin-bottom: 50px;

  .ant-pagination-prev .ant-pagination-item-link {
    border: none !important;
    background-color: #305099 !important;
    color: #7C6DEB;
  }

  .ant-pagination-item-active {
    border: 1px solid rgba(124, 109, 235, 0.2) !important;
  }

  .ant-pagination-item-active a {
    color: #7C6DEB !important;
  }

  .ant-pagination-item {
    border: 1px solid rgba(124, 109, 235, 0.2) !important;
  }

  .ant-pagination-item a {
    //color: rgba(124,109,235,0.2) !important;
  }

  .ant-pagination-next .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124, 109, 235, 0.2) !important;
    color: #7C6DEB;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    background-color: rgba(124, 109, 235, 0.2);
  }

  .ant-select {
    color: #305099;
  }

  .ant-select-arrow {
    color: #7C6DEB;
  }
`

const Filter: React.FC = () => {

  const filterItems = [
    {
      key: 'Cross-Platform',
      banksyUnique: true,
      values: [
        'Banksy',
        'OpenSea',
        'Rarible']
    },
    {
      key: 'Chinese-Style Artworks',
      banksyUnique: true,
      values: [
        'Calligraphy-NFT',
        'Landscape-Painting '
      ]
    },
    {
      key: 'Digital Artworks',
      banksyUnique: true,
      values: [
        'AI-NFT',
      ]
    }
  ]

  const [selectedValueByKey, setSelectedValueByKey] = useState(
    new Map(filterItems.map(item => [item.key, '']))
  )

  const onSelect = (key: string, value: string) => {
    setSelectedValueByKey(prev => {
      if (prev.get(key) === value) {
        return new Map(prev).set(key, '')
      } else {
        return new Map(prev).set(key, value)
      }
    })
  }


  useEffect(() => {
    console.log(new Array(selectedValueByKey.entries()).filter(entry => entry))
  }, [selectedValueByKey])


  return (
    <FilterContainer>
      {filterItems.map(item => (
        <div className="filter-item" key={item.key}>
          <div className="key">{item.key}:</div>
          <div className="values">
            {
              item.values.map(value => (
                <div
                  className={clsx('value', selectedValueByKey.get(item.key) === value && 'active')}
                  key={value}
                  onClick={() => {
                    onSelect(item.key, value)
                  }}
                >
                  {value}
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </FilterContainer>
  )
}

const TypeSelector: React.FC<any> = ({ setTypeSelectValue }) => {
  return (
    <MySelect defaultValue="" onChange={(value: any) => setTypeSelectValue(value)}>
      <Select.Option value="">All items</Select.Option>
      <Select.Option value="1">On Sale</Select.Option>
      <Select.Option value="2">On Auction</Select.Option>
      <Select.Option value="3">On Splitting</Select.Option>
      <Select.Option value="4">On Staking</Select.Option>
    </MySelect>
  )
}

const OrderSelector: React.FC = () => {
  return (
    <MySelect defaultValue="1">
      <Select.Option className="customized-option" value="1">
        Recently Listed
      </Select.Option>
      <Select.Option className="customized-option" value="2">
        Recently Created
      </Select.Option>
      <Select.Option className="customized-option" value="3">
        Recently Sold
      </Select.Option>
      <Select.Option className="customized-option" value="4">
        Price: Low to High
      </Select.Option>
      <Select.Option className="customized-option" value="5">
        Price: High to Low
      </Select.Option>
      <Select.Option className="customized-option" value="6">
        Most Favorited
      </Select.Option>
    </MySelect>
  )
}

const NFTList: React.FC<any> = ({ list }) => {
  return (
    <NFTListContainer>
      {list?.map((nft: any, index: number) => (
        <NFTListItem data={nft} key={index} type="nftList" />
      ))}
    </NFTListContainer>
  )
}

const CollectiblesPage: React.FC = () => {
  const [typeSelectValue, setTypeSelectValue] = useState<string>()

  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(20)
  const [searchKey, setSearchKey] = useState<any>()

  const { data: pagingData, isLoading } = useNFTsQuery({ current, size, searchKey, transactionStatus: typeSelectValue })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pagingData])

  const onChangePage = (page: number, pageSize?: number) => {
    setCurrent(page)
    pageSize && setSize(pageSize)
  }

  const onPressEnter = (e: any) => {
    setSearchKey(e.target.attributes[2].value)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  return (
    <PageContainer>
      <Title>NFT Marketplace</Title>
      {
        isMobile ? <div /> : <Filter />

      }
      {
        isMobile ?
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5.5rem', flexDirection:'column' }}>

            <div style={{ display:'flex', justifyContent:'center' }}>
              <SearchInput
                onPressEnter={onPressEnter}
                prefix={<SearchOutlined style={{ color: 'white', width: '1.5rem' }} />}
              />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <TypeSelector typeSelectValue={typeSelectValue} setTypeSelectValue={setTypeSelectValue} />
              <OrderSelector />
            </div>
            <div style={{ border:'solid 0.1rem #305099', marginTop:'3vh' }} />
          </div>
          :
          <div style={{ width: '120.2rem', display: 'flex', justifyContent: 'space-between', marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex' }} />
            <div style={{ display: 'flex' }}>
              <SearchInput
                onPressEnter={onPressEnter}
                prefix={<SearchOutlined style={{ color: 'white', width: '1.5rem' }} />}
                style={{ marginRight:'2.5rem' }}
              />
              <TypeSelector typeSelectValue={typeSelectValue} setTypeSelectValue={setTypeSelectValue}  />
              <OrderSelector />
            </div>
          </div>
      }

      <ListPageLoading loading={isLoading} />
      <NFTList list={pagingData?.records} fetch={fetch} />
      {
        !isLoading && (
          <CustomPagination
            current={current}
            total={pagingData?.total}
            onChange={onChangePage}
            pageSize={size}
            pageSizeOptions={['12', '20', '28', '40']}
          />
        )
      }
    </PageContainer>
  )
}

export default CollectiblesPage
