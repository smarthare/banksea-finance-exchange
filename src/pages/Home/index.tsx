import React from 'react'
import styled from 'styled-components'

import Auction from '@/assets/images/homePageImg/auction-bg.svg'
import Splitting from '@/assets/images/homePageImg/splitting-bg.svg'
import Mortgage from '@/assets/images/homePageImg/mortgage-bg.svg'
import Liquidity from '@/assets/images/homePageImg/liquidity-bg.svg'
import RightArrow from '@/assets/images/homePageImg/right-arrow.svg'
import CornerFlag from '@/assets/images/homePageImg/corner-flag-ai.svg'
import voteBanner from '@/assets/images/VoteImg/VoteBanner.png'

import { Carousel } from 'antd'
import { useHistory } from 'react-router-dom'
import NFTListItem from '../../components/NFTListItem'
import { useNFTsQuery } from '../../hooks/queries/useNFTsQuery'

const HomePageContainer = styled.div`
  font-family: 'PingFang SC';
  width: 100%;
  background-color: #0B111E;

  @media screen and (min-width : 300px) and (max-width: 600px) {
    width: fit-content;
    background-color: #0B111E;
  }
`

const BodyContainer = styled.div`
  margin: 0 auto;
  width: 120.2rem;
  padding: 6rem 2rem;
`

const HeadLine = styled.div`
  height: 30rem;
`

const MyCarousel = styled(Carousel)`
  height: 30rem;
`

const InfoContainer = styled.div`


  .row1 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    .lend-and-borrow:hover {
      box-shadow: rgb(11, 234, 235) -5px 5px 15px;
    }

    .lend-and-borrow {
      position: relative;
      width: 56.4rem;
      border-radius: 2rem;
      margin-bottom: 3rem;
      padding: 2.5rem 4.5rem;
      background: url(${require('../../assets/images/homePageImg/lend-borrow-bg.svg').default}) no-repeat;
      background-size: 100%;
      transition: all 1s;


      .main-title {
        color: black;
        font-size: 4.5rem;
        font-weight: 550;
        margin-bottom: 7.6rem;
      }

      .sub-title {
        margin-top: 2rem;
        color: black;
        font-size: 2.5rem;
        font-weight: 550;
      }

      .value {
        color: white;
        font-size: 4.8rem;
        font-weight: 550;
      }
    }

    .auction-and-splitting {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      .info-panel:hover {
        background: #18284C;
        transition: all 1s;

      }

      .info-panel:active {
        background: #111C3A;
        border: solid 0.1rem #4E46EC;
      }


      .info-panel {
        padding: 2.5rem 4.5rem;
        position: relative;
        width: 56.4rem;
        height: 23.8rem;
        background: #111C3A;
        border-radius: 2rem;
        margin-bottom: 3rem;


        .main-title2 {
          color: #97BCF9;
          font-size: 3.8rem;
          font-weight: 550;
          margin-bottom: 1.2rem;
        }

        .sub-title2 {
          color: #97BCF9;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 1.2rem;
        }

        .nft-values {
          display: flex;
          align-items: center;

          .sub-title2 {
            padding-top: 1rem;
            color: #97BCF9;
            font-size: 1.8rem;
            font-weight: 400;
          }

          .value {
            margin-left: 1.2rem;
            color: #01F9FF;
            font-size: 2.8rem;
            font-weight: 550;
          }
        }

      }
    }
  }

  .row2 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    .info-panel:hover {
      background: #18284C;
    }

    .info-panel:active {
      background: #111C3A;
      border: solid 0.1rem #4E46EC;
    }

    .info-panel {
      padding: 2.5rem;
      position: relative;
      width: 56.4rem;
      height: 23.8rem;
      background: #111C3A;
      border-radius: 2rem;
      margin-bottom: 3rem;
      transition: all 1s;


      .main-title2 {
        color: #97BCF9;
        font-size: 3.8rem;
        margin-bottom: 1.2rem;
        font-weight: 550;
        margin-bottom: 1.2rem;
      }

      .sub-title2 {
        color: #97BCF9;
        font-size: 1.8rem;
        font-weight: 400;
        margin-bottom: 1.2rem;
      }

      .nft-values {
        display: flex;
        align-items: center;

        .sub-title2 {
          padding-top: 1rem;
          color: #97BCF9;
          font-size: 1.8rem;
          font-weight: 400;
        }

        .value {
          margin-left: 1.2rem;
          color: #01F9FF;
          font-size: 2.8rem;
          font-weight: 550;
        }
      }
    }
  }
`

const NFTContainer = styled.div`
  margin-top: 4rem;

  .title {
    color: #97BCF5;
    font-size: 2.6rem;
    font-weight: 500;
    margin-bottom: 1.6rem
  }
`

const NFTListContainer = styled.div`
  width: 120.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

`

const NFTList: React.FC<any> = ({ list }) => {
  return (
    <NFTListContainer>
      {list?.map((nft: any, index: number) => (
        <NFTListItem data={nft} key={index} type="nftList" />
      ))}
    </NFTListContainer>
  )
}

const PanelIcon: React.FC<any> = ({ iconName }) => {
  return (
    <div>
      <img
        src={iconName}
        style={{
          position: 'absolute',
          height: '12.5rem',
          right: '5rem',
          bottom: '10rem'
        }}
        alt=""
      />
    </div>
  )
}

const AIFlag: React.FC<any> = () => {
  // @ts-ignore
  return (
    <div>
      <img
        src={CornerFlag}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '16rem',
          left: '41.3rem',
          bottom: '36rem'
        }}
        alt=""
      />
    </div>
  )
}

const GotoArrow: React.FC<{path?: string}> = ({ path }) => {
  const history = useHistory()

  return (
    <img
      alt=""
      src={RightArrow}
      onClick={() => path && history.push(path)}
      style={{
        position: 'absolute',
        width: '2.5rem',
        left: '51.5rem',
        bottom: '2rem',
        cursor: path ? 'pointer' : 'not-allowed'
      }}
    />
  )
}

const HomePage: React.FC = () => {
  const { data } = useNFTsQuery({ size: 8 })
  const history = useHistory()

  return (
    <HomePageContainer>
      {/*<HeadLine>
         <MyCarousel autoplay>
          <div>
            <img src={voteBanner} alt="logo" style={{ height: '30rem', margin: '0 auto' }} />
          </div>
        </MyCarousel>
      </HeadLine>*/}
      <BodyContainer>
        <InfoContainer>

          <div className="row1">
            <div className="lend-and-borrow" onClick={() => history.push('/pools/*')}>
              <AIFlag />
              <div className="main-title">NFT Mortgage</div>
              <div className="sub-title">Market size</div>
              <div className="value">$125,300,00</div>
              <div className="sub-title">Transaction Volumn</div>
              <div className="value">$34,324,00</div>
              <GotoArrow />
            </div>

            <div className="auction-and-splitting">
              <div className="info-panel" onClick={() => history.push('/pools/*')}>
                <div className="main-title2">Safety pool
                  <PanelIcon iconName={Auction} />
                </div>
                <div className="sub-title2">KSY pool : $89,294,879.98</div>
                <div className="nft-values">
                  <div className="sub-title2">BPT(KSY/ETH) :</div>
                  <div className="value">$982,987,374.93</div>
                </div>
                <GotoArrow />
              </div>

              <div className="info-panel" onClick={() => history.push('/pools/*')}>
                <div className="main-title2">Deposit
                  <PanelIcon iconName={Splitting} />
                </div>
                <div className="nft-values">
                  <div className="sub-title2">Pool size :</div>
                  <div className="value">$92,983,485.09</div>
                </div>
                <div className="nft-values">
                  <div className="sub-title2">Earn up to :</div>
                  <div className="value">303.75%</div>
                </div>
                <div className="nft-values">
                  <div className="sub-title2" />
                  <div className="value" />
                </div>
                <GotoArrow />
              </div>
            </div>
          </div>

          <div className="row2">
            <div className="info-panel">
              <div className="main-title2">Create
                <PanelIcon iconName={Mortgage} />
              </div>
              <div className="sub-title2">NFT Number : 3220</div>
              <div className="nft-values">
                <div className="sub-title2">NFT Values :</div>
                <div className="value">$3,210,00</div>
              </div>
              <GotoArrow path="/nft/create" />
            </div>

            <div className="info-panel" onClick={() => history.push('/pools/*')}>
              <div className="main-title2">Borrow
                <PanelIcon iconName={Liquidity} />
              </div>
              <div className="nft-values">
                <div className="sub-title2">Borrow size :</div>
                <div className="value">$8,093,233.07</div>
              </div>
              <div className="nft-values">
                <div className="sub-title2" />
                <div className="value" />
              </div>
              <GotoArrow />
            </div>

          </div>
        </InfoContainer>

        <NFTContainer>
          <div className="title">New NFTs</div>
          <NFTList list={data?.records} fetch={fetch} />
        </NFTContainer>

      </BodyContainer>
    </HomePageContainer>
  )
}

export default HomePage
