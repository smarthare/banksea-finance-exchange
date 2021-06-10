import React from 'react'
import styled from 'styled-components'
import { Button, Input, Select, Spin } from 'antd'
import CopyIcon from '@/assets/images/PersonalPageImg/copy.png'
import { ReactComponent as WalletIcon } from '../../assets/images/PersonalPageImg/wallet.svg'
import { ReactComponent as ActivityIcon } from '../../assets/images/PersonalPageImg/activity.svg'
import { ReactComponent as OfferIcon } from '../../assets/images/PersonalPageImg/activity.svg'
import { ReactComponent as HeartIcon } from '../../assets/images/PersonalPageImg/heart.svg'
import { ReactComponent as ColoredHeartIcon } from '../../assets/images/PersonalPageImg/colored-heart.svg'

import { SearchOutlined } from '@ant-design/icons'


const PersonalContainer = styled.div`
  font-family: 'PingFang SC';
  padding: 0 20.5rem

`
const Avatar = styled.div`
  width: 9.6rem;
  height: 9.6rem;
  background: #d8d8d8;
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
    text-align:center;
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

  img, .spin {
    width: 17.2rem;
    height: 20.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
  }

  .spin {
    position: relative;
    top: 10rem;
  }

  .nft-img {
    width: 17.2rem;
    height: 20.5rem;
    background: #F5F5F5;
    border-radius: 1rem;
  }
  .ntf-name {
    width: 17.2rem;
    height: 4rem;
    font-size: 1.4rem;
    font-weight: 550;
    color: #7C6DEB;
    line-height: 2rem;
  }

  .like {
    display: flex;
    align-items: center;
    margin-right: 0.7rem;
    font-size: 1.4rem;
    font-weight: 550;
    color: #7C6DEB;
    line-height: 2rem;

  }

  .button {
    width: 100%;
    height: 4rem;
    border-radius: 1rem;
    background-color: #7c6deb;
    color: white;
    font-weight: 500;
  }

  .price {
    font-size: 1.4rem;
    font-weight: 550;
    color: #7C6DEB;
    line-height: 2rem;
  }
`

const NFTListContainer = styled.div`
  width: 90.8rem;
  padding-left: 4rem;
  display: flex;
  flex-wrap: wrap;
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

const NFTItemCard: React.FC = () => {

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
  return (
    <div style={{ position: 'relative' }}>
      <CornerFlag />
      <ApproveVoteButton />
      <NFTItemCardContainer>
        <div style={{ cursor: 'pointer' }}>
          <div className="nft-img" />
          <div className="ntf-name">Chinese zodiac wait to the moon——Kaitong</div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
            <div className="like">
              <ColoredHeartIcon className="heart" style={{ marginRight:'0.7rem' }} />5
            </div>
            <div className="price">5 BAKE</div>
          </div>
          <Button className="button">Connect Wallet</Button>
        </div>
      </NFTItemCardContainer>
    </div>
  )
}

const UserNFTList: React.FC = () => {
  return (
    <NFTListContainer>
      <NFTItemCard />
    </NFTListContainer>
  )
}


const PersonalHomepage : React.FC = () => {
  const userId = 'e34fs545fwefwet466e3'
  return (
    <PersonalContainer >
      <UserInfo>
        <Avatar />
        <div className="user-name">Hug me</div>
        <div className="user-id">
          {userId.substring(0, 6)}...{userId.slice(-4)}
          <img src={CopyIcon} alt="" style={{ width:'1.5rem', height:'1.5rem',marginLeft:'0.8rem' }} />
        </div>
        <div className="user-sign-border">
          <div className="user-sign">Hug me strong and don&apos;t let me go. It&apos;s too cold outside and I wanna be warm next to you.
          </div>
        </div>
      </UserInfo>
      <UserOptions >
        <OptionBtn icon={<WalletIcon />} >
          <div className="option-name">in Wallet</div>
        </OptionBtn>
        <OptionBtn icon={<ActivityIcon />} >
          <div className="option-name">Activity</div>
        </OptionBtn>
        <OptionBtn icon={<OfferIcon />} >
          <div className="option-name">Offers</div>
        </OptionBtn>
        <OptionBtn icon={<HeartIcon />} >
          <div className="option-name">Favorite</div>
        </OptionBtn>
      </UserOptions>
      <div style={{ display: 'flex', justifyContent:'flex-end', marginTop:'3.5rem' }}>
        <SearchInput
          prefix={<SearchOutlined style={{ color: '#7C6DEB', width: '1.5rem' }} />}
        />
        <TypeSelector />
        <OrderSelector />
      </div>
      <UserNFTList />
    </PersonalContainer>
  )
}

export default PersonalHomepage
