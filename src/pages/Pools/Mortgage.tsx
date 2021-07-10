import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import mortgage1 from '../../assets/images/mockImg/mortgages1.png'
import mortgage2 from '../../assets/images/mockImg/mortgages2.png'
import mortgage3 from '../../assets/images/mockImg/mortgages3.png'
import mortgage4 from '../../assets/images/mockImg/mortgages4.png'
import mortgage5 from '../../assets/images/mockImg/mortgages5.png'
import mortgage6 from '../../assets/images/mockImg/mortgages6.png'
import mortgage7 from '../../assets/images/mockImg/mortgages7.png'
import mortgage8 from '../../assets/images/mockImg/mortgages8.png'

const MortgageMain = styled.div`
  display: none;
  width: 126rem;
  min-height: 100vh;
  margin-left: calc((100% - 126rem) / 2);
  padding-top: 4rem;

   &.active {
     display: block;
   }

  p {
    margin: 0;
  }
`

const MortgagesTitle = styled.div`
  color: #6C48FF;
  font-size: 2.4rem;
  font-weight: bolder;
  padding-left: 2rem;
`

const MortgageMainLeft = styled.div`
  width: 90rem;
  height: 120rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 1rem;
  float: left;
  margin-bottom: 14rem;
`

const AreaTitle = styled.div`
  padding: 1rem 2rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const SerielsTop = styled.div`
  display: flex;
  align-items: center;
  padding: 4rem 3rem 0 3rem;
  position: relative;

  span {
    color: #fff;
    font-size: 1.8rem;
  }

  .search {
    display: flex;
    position: absolute;
    right: 3rem;

    .searchButton {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      background: #6C48FF;
      margin-left: -0.1rem;
    }
  }
`

const SearchInput = styled(Input)`
  width: 22rem;
  height: 3rem;
  border-color: #3658A7;
  background-color: #3658A7;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  .ant-input {
    background-color: #305099;
    color: white;
    font-weight: bold;
  }
`

const NFTMortgagesContainer = styled.div`
  width: 100%;
  height: 48rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 3rem;
`

const NFTMortgagesMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;

  .mortgages-item {
    width: 18.2rem;
    height: 37rem;
    border-radius: 1rem;
    background: #3658A7;

    .mortgages-item-image {
      height: 17rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }

    .mortgages-item-text {
      padding: 1rem 1rem;

      .mortgages-item-text-name {
        color: #fff;
      }
    }
  }
`

const MortgagesItemText = styled.div`
  margin-top: 0.5rem;

  .message-name {
    color: #85A9E7;
  }

  .message-number {
    font-size: 1.7rem;
    font-weight: bolder;
    color: #fff;
  }
`

const WithdrawButton = styled(Button)`
  width: 12.7rem;
  height: 3.7rem;
  margin-left: calc((100% - 12.7rem) / 2);
  background: #6C48FF;
  color: #fff;
  border-radius: 1rem;
  border: none;
  margin-top: 1rem;
  transition: all 0.7s;
  font-size: 1.7rem;
  font-weight: bolder;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const MortgageMainRightMain = styled.div`
  width: 33.6rem;
  height: 27rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 1rem;
  float: right;
`
const CryptoOperating = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CryptoButton = styled(Button)`
  width: 20.7rem;
  height: 3.7rem;
  background: #6C48FF;
  color: #fff;
  border-radius: 1rem;
  border: none;
  transition: all 0.7s;
  font-size: 1.7rem;
  font-weight: bolder;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const CryptoInput = styled(Input)`
  width: 8rem;
  height: 3.7rem;
  border-color: #3658A7;
  background-color: #3658A7;
  border-radius: 0.5rem;

  .ant-input {
    background-color: #305099;
    color: white;
    font-weight: bold;
  }
`

const CryptoOperatingValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;

  div {
    color: #fff;
    font-size: 1.8rem;
  }
`

const NFTMortgagesKitties:React.FC = () => {

  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <NFTMortgagesMain>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage5} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoKitties #1</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 2.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">38%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage6} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoKitties #2</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 6.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">40%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage7} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoKitties #3</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 6.3M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">37%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage8} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoKitties #4</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 4.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">45%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const NFTMortgages:React.FC = () => {

  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <NFTMortgagesMain>
        <div className="mortgages-item" onClick={ () => history.push('/nftMortgageDetailPage') }>
          <div className="mortgages-item-image">
            <img src={mortgage1} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk #1</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 6.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">38%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage2} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk #2</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 3.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">45%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage3} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk #3</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 6.1M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">42%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
        <div className="mortgages-item">
          <div className="mortgages-item-image">
            <img src={mortgage4} alt="" />
          </div>
          <div className="mortgages-item-text">
            <p className="mortgages-item-text-name">CryptoPunk #4</p>
            <MortgagesItemText>
              <p className="message-name">Values:</p>
              <p className="message-number">$ 5.5M</p>
            </MortgagesItemText>
            <MortgagesItemText>
              <p className="message-name">Mortgage Rate:</p>
              <p className="message-number">41%</p>
            </MortgagesItemText>
            <WithdrawButton>Mortgage</WithdrawButton>
          </div>
        </div>
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const MortgageMainRight:React.FC = () => {
  return (
    <MortgageMainRightMain>
      <AreaTitle>My Mortgage</AreaTitle>
      <Line />
      <CryptoOperating>
        <CryptoButton>Crypto Punks Seriels</CryptoButton>
        <CryptoInput />
      </CryptoOperating>
      <CryptoOperatingValue>
        <div>Total</div>
        <div>$3</div>
      </CryptoOperatingValue>
      <CryptoOperating>
        <CryptoButton>Crypto Kitties Seriels</CryptoButton>
        <CryptoInput />
      </CryptoOperating>
      <CryptoOperatingValue>
        <div>Total</div>
        <div>$3</div>
      </CryptoOperatingValue>
    </MortgageMainRightMain>
  )
}

const MortgagePage:React.FC<{current: number}> = ({ current }) => {
  return (
    <MortgageMain className={clsx(current === 4 && 'active')}>
      <MortgagesTitle>NFT Mortgages</MortgagesTitle>
      <MortgageMainLeft>
        <AreaTitle>Availble to mortgage</AreaTitle>
        <Line />
        <SerielsTop>
          <span>Crypto Punks Seriels</span>
          <div className="search">
            <SearchInput />
            <div className="searchButton">
              <SearchOutlined style={{ color: '#fff' }} />
            </div>
          </div>
        </SerielsTop>
        <NFTMortgages />
        <Line />
        <SerielsTop>
          <span>Crypto Kitties Seriels</span>
        </SerielsTop>
        <NFTMortgagesKitties />
      </MortgageMainLeft>
      <MortgageMainRight />
    </MortgageMain>
  )
}

export default MortgagePage
