import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Pagination, Select } from 'antd'
import CopyIcon from '@/assets/images/PersonalPageImg/copy.png'
import { ReactComponent as WalletIcon } from '../../assets/images/PersonalPageImg/wallet.svg'
import {
  ReactComponent as ActivityIcon,
  ReactComponent as OfferIcon
} from '../../assets/images/PersonalPageImg/activity.svg'
import { ReactComponent as HeartIcon } from '../../assets/images/PersonalPageImg/heart.svg'

import { SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { personalNftList } from '../../utils/banksyNftList'
import NFTListItem from '../../components/NFTListItem'
import ListPageLoading from '../../components/ListPageLoading'

const PersonalContainer = styled.div`
  width: 100%;
  font-family: 'PingFang SC';
  padding: 0 20.5rem;
  min-height: calc(100vh - 6.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Avatar = styled.img`
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 100%;
  margin-top: 3.9rem;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .user-name {
    font-size: 3rem;
    font-weight: 500;
    color: #000000;
    line-height: 4.2rem;
  }

  .user-id {
    display: flex;
    font-size: 1.4rem;
    font-weight: 400;
    color: #999999;
    line-height: 2rem;
    margin-top: 0.5rem;

    :hover {
      cursor: pointer;
    }
  }

  .user-sign-border {
    display: flex;
    width: 48.5rem;
    text-align: center;
    margin-top: 0.8rem;

    .user-sign {
      font-size: 1.4rem;
      font-weight: 400;
      color: #999999;
      line-height: 2rem;
    }
  }
`

const UserOptions = styled.div`
  display: flex;
  justify-content: flex-start;

`

const OptionBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
  width: 15rem;
  height: 5rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: #999999;
  background: #FAF9FA;
  line-height: 2.2rem;
  border: 0px;
  border-radius: 1rem;

  .option-name {
    margin-left: 1.3rem;
  }

  :hover, :focus {
    color: #fff !important;
    background: #7C6DEB !important;
    border-color: #7C6DEB !important;
  }
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

const NFTListContainer = styled.div`
  width: 120.2rem;
  padding-left: 4rem;
  display: flex;
  flex-wrap: wrap;
`

const CustomPagination = styled(Pagination)`
  margin-bottom: 5rem;
  margin-top: 3rem;

  .ant-pagination-prev .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124, 109, 235, 0.2) !important;
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
    color: #7C6DEB;
  }

  .ant-select-arrow {
    color: #7C6DEB;
  }
`

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
    <MySelect value="1">
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

const UserNFTList: React.FC<any> = ({ list }) => {
  return (
    <NFTListContainer>
      {list?.map((nft: any, index: number) => (
        <NFTListItem data={nft} key={index} type="own" />
      ))}
    </NFTListContainer>
  )
}

const PersonalHomepage: React.FC = () => {
  const account = useSelector(getAccount)
  const [current, setCurrent] = useState<number>(1)
  const [total, setTotal] = useState<number>()
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)

  const form = {
    addressOwner: account,
    current: current,
    size: 20
  }

  const init = useCallback(async () => {
    setLoading(true)
    personalNftList(form).then((res: any) => {
      const _data = res.data.data.records.map((item: any) => ({
        ...item,
        image: `https://banksy.mypinata.cloud${item?.image.slice(-52)}`
      }))
      setLoading(false)
      setData(_data)
      setTotal(res.data.data.total)
    })
  }, [current])

  useEffect(() => {
    init()
  }, [init])

  const onChangePage = (pageNumber: number) => {
    setCurrent(pageNumber)
    init()
  }

  return (
    <PersonalContainer>
      <UserInfo>
        <Avatar />
        <div className="user-name">Hug me</div>
        <div className="user-id">
          {account?.substring(0, 6)}...{account?.slice(-4)}
          <img src={CopyIcon} alt="" style={{ width: '1.5rem', height: '1.5rem', marginLeft: '0.8rem' }} />
        </div>
        <div className="user-sign-border">
          <div className="user-sign">Hug me strong and don&apos;t let me go. It&apos;s too cold outside and I wanna be
            warm next to you.
          </div>
        </div>
      </UserInfo>
      <UserOptions>
        <OptionBtn icon={<WalletIcon />}>
          <div className="option-name">in Wallet</div>
        </OptionBtn>
        <OptionBtn icon={<ActivityIcon />}>
          <div className="option-name">Activity</div>
        </OptionBtn>
        <OptionBtn icon={<OfferIcon />}>
          <div className="option-name">Offers</div>
        </OptionBtn>
        <OptionBtn icon={<HeartIcon />}>
          <div className="option-name">Favorite</div>
        </OptionBtn>
      </UserOptions>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <SearchInput
          prefix={<SearchOutlined style={{ color: '#7C6DEB', width: '1.5rem' }} />}
        />
        <TypeSelector />
        <OrderSelector />
      </div>
      <ListPageLoading loading={loading} />
      <UserNFTList list={data} />
      <CustomPagination defaultCurrent={current}
        total={total}
        onChange={onChangePage}
        pageSize={20}
        pageSizeOptions={['20']}
      />
    </PersonalContainer>
  )
}

export default PersonalHomepage
