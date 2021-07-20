import React, { CSSProperties } from 'react'
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
import { useMediaQuery } from 'react-responsive'

const HomePageContainer = styled.div`
  font-family: 'PingFang SC';
  width: 100%;
  background-color: #0B111E;
  overflow-x: hidden;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: 200vh;
    background-color: #0B111E;
  }
`

const BodyContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  padding: 6rem 2rem;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
    padding: 6vh 1vw
  }
`

const HeadLine = styled.div`
  height: 30rem;
`

const MyCarousel = styled(Carousel)`
  height: 30rem;
`

const InfoContainer = styled.div`
  width: 100%;

  .row1 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    .nft-mortgage-container:hover {
      box-shadow: rgb(11, 234, 235) -5px 5px 15px;
    }

    .nft-mortgage-container {
      position: relative;
      width: 56.4rem;
      border-radius: 2rem;
      margin-bottom: 3rem;
      background: url(${require('../../assets/images/homePageImg/lend-borrow-bg.svg').default}) no-repeat;
      padding: 2.5rem 4.5rem;
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

  @media screen and (min-width: 300px) and (max-width: 600px) {
    position: relative;
    width: 100% !important;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 0;

    .row1, .row2 {
      position: relative;
      margin: 0 auto;
      justify-content: center;
      flex-direction: column;
      width: fit-content;
    }

    .nft-mortgage-container, .auction-and-splitting > .info-panel {
      width: 80vw!important;
    }

    .nft-mortgage-container {
      position: relative;
      border-radius: 2rem;
      margin-bottom: 3rem;
      background: url(${require('../../assets/images/homePageImg/pen1.png').default}) no-repeat;
      padding: 2.5rem 4.5rem;
      background-size: 100% 50%;
      transition: all 1s;


      .main-title {
        color: black;
        font-size: 5.5vw !important;
        font-weight: 550;
        margin-bottom: 2vh !important;
      }

      .sub-title {
        color: black;
        font-size: 2.6vw !important;
        font-weight: 550;
      }

      .value {
        color: white;
        font-size: 4vw !important;
        font-weight: 550;
      }

    }

    .auction-and-splitting {
      display: flex;
      flex-direction: column;
      width: fit-content;
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
        padding: 1.5rem 2rem !important;
        position: relative;
        height: 15vh !important;
        background: #111C3A;
        border-radius: 2rem;
        margin-bottom: 3rem;


        .main-title2 {
          color: #97BCF9;
          font-size: 5.5vw !important;
          font-weight: 550;
          margin-bottom: 1.2rem;
        }

        .sub-title2 {
          color: #97BCF9;
          font-size: 1.6vw !important;
          font-weight: 400;
          width: fit-content;
          margin-bottom: 0.6vh !important;
        }

        .nft-values {
          display: flex;
          align-items: center;

          .sub-title2 {
            padding-top: 1rem;
            color: #97BCF9;
            font-size: 1vw !important;
            font-weight: 400;
          }

          .value {
            margin-left: 1.2rem;
            color: #01F9FF;
            font-size: 3.5vw !important;
            font-weight: 550;
          }
        }

      }
    }

    .row2 {
      position: relative;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: fit-content;

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
        width: 80vw!important;
        height: 15vh !important;
        background: #111C3A;
        border-radius: 2rem;
        margin-bottom: 3rem;
        transition: all 1s;


        .main-title2 {
          color: #97BCF9;
          font-size: 5.5vw !important;
          font-weight: 550;
          margin-bottom: 1.2rem;
        }

        .sub-title2 {
          color: #97BCF9;
          font-size: 1.6vw !important;
          font-weight: 400;
          width: fit-content;
          margin-bottom: 0.6vh !important;
        }

        .nft-values {
          display: flex;
          align-items: center;

          .sub-title2 {
            padding-top: 1rem;
            color: #97BCF9;
            font-size: 1vw !important;
            font-weight: 400;
          }

          .value {
            margin-left: 1.2rem;
            color: #01F9FF;
            font-size: 3.5vw !important;
            font-weight: 550;
          }
        }
      }
    }
  }
`

const NFTContainer = styled.div`
  margin-top: 4rem;
  width: 100%;

  .title {
    color: #97BCF5;
    font-size: 2.6rem;
    font-weight: 500;
    margin-bottom: 1.6rem
  }

  @media screen and (min-width: 300px) and (max-width: 600px) {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: fit-content;



    .title {
      color: #97BCF5;
      font-size: 2.6rem;
      font-weight: 500;
      margin-bottom: 1.6rem;
      width: fit-content;
    }

  }
`

const NFTListContainer = styled.div`

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

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
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const style: CSSProperties = {
    position: 'absolute',
    height: '12.5rem',
    right: '5rem',
    bottom: '10rem'
  }

  const mobileStyle: CSSProperties = {
    position: 'absolute',
    width: '8vw',
    bottom: '8vh',
    right: '10vw'
  }

  return (
    <div>
      <img
        src={iconName}
        style={isMobile ? mobileStyle : style}
        alt=""
      />
    </div>
  )
}

const PanelIconMobile: React.FC<any> = ({ iconName }) => {

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

const GotoArrow: React.FC<{ path?: string }> = ({ path }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const history = useHistory()

  const style: CSSProperties = {
    position: 'absolute',
    width: '2.5rem',
    left: '51.5rem',
    bottom: '2rem',
    cursor: path ? 'pointer' : 'not-allowed'
  }

  const mobileStyle: CSSProperties = {
    position: 'absolute',
    width: '4vw',
    bottom: '12vh',
    right: '5vw'
  }

  return (
    <img
      alt=""
      src={RightArrow}
      onClick={() => path && history.push(path)}
      style={isMobile ? mobileStyle : style}
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
            <div className="nft-mortgage-container" onClick={() => history.push('/pools/*')}>
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
                  <div className="sub-title2">BPT(KSY/ETH):</div>
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
