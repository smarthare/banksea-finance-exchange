import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import Auction from '@/assets/images/homePageImg/auction-bg.svg'
import Splitting from '@/assets/images/homePageImg/splitting-bg.svg'
import Mortgage from '@/assets/images/homePageImg/mortgage-bg.svg'
import Liquidity from '@/assets/images/homePageImg/liquidity-bg.svg'
import RightArrow from '@/assets/images/homePageImg/right-arrow.svg'
import CornerFlag from '@/assets/images/homePageImg/corner-flag-ai.svg'


import { banksyNftList, NftHomeCreateData } from '../../utils/banksyNftList'

import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import NFTListItem from '../../components/NFTListItem'

const HomePageContainer = styled.div`

  font-family: 'PingFang SC'
`

const BodyContainer = styled.div`
  margin: 0 calc((100% - 100.2rem) / 2);
  width: 120.2rem;
  padding: 6rem 2rem;
`

const HeadLine = styled.div`
  height: 30rem;
  background-color: #7c6deb;

`

const InfoContainer = styled.div`


  .row1{
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    .lend-and-borrow:hover
    {
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
      .value{
        color: white;
        font-size: 4.8rem;
        font-weight: 550;
      }
    }

    .auction-and-splitting{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      .info-panel:hover {
        background: #18284C;
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

        .nft-values{
          display: flex;
          align-items: center;
          .sub-title2 {
            padding-top: 1rem;
            color: #97BCF9;
            font-size: 1.8rem;
            font-weight: 400;
          }
          .value{
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

      .nft-values{
        display: flex;
        align-items: center;
        .sub-title2 {
          padding-top: 1rem;
          color: #97BCF9;
          font-size: 1.8rem;
          font-weight: 400;
        }
        .value{
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
  .title{
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

const NFTList:React.FC<any> = ({ list })=> {
  return (
    <NFTListContainer>
      {list?.map((nft: any, index: number) => (
        <NFTListItem data={nft} key={index} type="nftList" />
      ))}
    </NFTListContainer>
  )
}

const PanelIcon:React.FC<any>=({ iconName })=>{
  return (
    <div>
      <img src = {iconName}
        style = {{
          position: 'absolute',
          width: '12rem',
          left: '42rem',
          bottom: '10rem'
        }}
      />
    </div>
  )
}

const AIFlag:React.FC<any> = () => {
  // @ts-ignore
  return (
    <div>
      <img src = {CornerFlag}
        style={{
          position:'absolute',
          zIndex: 1,
          width: '16rem',
          left: '41.3rem',
          bottom:'36rem'
        }}
      />
    </div>
  )
}

const GotoArrow:React.FC<any> = () => {
  return (
    <div>
      <img src = {RightArrow}
        style = {{
          position: 'absolute',
          width: '2.5rem',
          left:'51.5rem',
          cursor:'pointer'
        }}
      />
    </div>
  )
}

const HomePage: React.FC = () => {
  const history = useHistory()
  const account = useSelector(getAccount)

  const [data, setData] = useState<any>()
  const init = useCallback(async () => {
    NftHomeCreateData().then(res => {
      setData(res.data.data)
    }).catch(err => err)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const toOnSale = () => {
    history.push('/collectibles', { code: 'buy' })
  }

  const [list, setList] = useState<any>()

  const [typeSelectValue, setTypeSelectValue] = useState<any>()

  const [current, setCurrent] = useState<number>(1)

  const [total, setTotal] = useState<number>()

  const [searchKey, setSearchKey] = useState<any>()

  const [loading, setLoading] = useState<boolean>(true)

  const fetch = useCallback( (searchKey: any, current: any) => {
    setList([])
    setLoading(true)

    banksyNftList({
      current: current,
      size: 20,
      searchKey: searchKey,
      transactionStatus: typeSelectValue
    })
      .then(res => {
        const _data = res.data.data.records.map((item: any) => ({
          ...item,
          image: item?.image?.slice(6)==='ipfs:/' ? `https://banksy.mypinata.cloud${item?.image?.slice(6)}` : `https://banksy.mypinata.cloud${item?.image?.slice(-52)}`
        }))
        setList(_data)
        setTotal(res.data.data.total)
        setLoading(false)
      })
  }, [current, searchKey, typeSelectValue])

  useEffect(() => {
    fetch(searchKey, current)
  }, [fetch])


  return (
    <HomePageContainer>
      <HeadLine>
        <div>Banksy</div>
      </HeadLine>
      <BodyContainer>
        <InfoContainer >

          <div className="row1">
            <div className="lend-and-borrow" >
              <AIFlag />
              <div className="main-title">Lend/Borrow</div>
              <div className="sub-title">Mowketsize</div>
              <div className="value">$125,300,00</div>
              <div className="sub-title">Earn up to</div>
              <div className="value">303.75%</div>
            </div>

            <div className="auction-and-splitting">
              <div className="info-panel" >
                <div className="main-title2" >Auction
                  <PanelIcon iconName={Auction} />
                </div>
                <div className="sub-title2">NFT Number : 3220</div>
                <div className="nft-values">
                  <div className="sub-title2">NFT Values :</div>
                  <div className="value">$65,280,00</div>
                </div>
                <GotoArrow />
              </div>

              <div className="info-panel" >
                <div className="main-title2" >Splitting
                  <PanelIcon iconName={Splitting} />
                </div>
                <div className="sub-title2">NFT Number : 3220</div>
                <div className="nft-values">
                  <div className="sub-title2">NFT Values :</div>
                  <div className="value">$65,280,00</div>
                </div>
                <GotoArrow />
              </div>
            </div>
          </div>

          <div className="row2">
            <div className="info-panel" >
              <div className="main-title2" >Create
                <PanelIcon iconName={Mortgage} />
              </div>
              <div className="sub-title2">NFT Number : 3220</div>
              <div className="nft-values">
                <div className="sub-title2">NFT Values :</div>
                <div className="value">$65,280,00</div>
              </div>
              <GotoArrow />
            </div>

            <div className="info-panel" >
              <div className="main-title2" >Liquidity
                <PanelIcon iconName={Liquidity} />
              </div>
              <div className="sub-title2">NFT Number : 3220</div>
              <div className="nft-values">
                <div className="sub-title2">NFT Values :</div>
                <div className="value">$65,280,00</div>
              </div>
              <GotoArrow />
            </div>

          </div>
        </InfoContainer>

        <NFTContainer>
          <div className="title">New NFTs</div>
          <NFTList list={list} fetch={fetch} />
        </NFTContainer>





      </BodyContainer>



    </HomePageContainer>
  )
}

export default HomePage
