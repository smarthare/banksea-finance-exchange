import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import TitlePen from '@/assets/images/homePageImg/title-pen1.png'
import TitlePencil from '@/assets/images/homePageImg/title-pen2.png'
import DrawPen from '@/assets/images/homePageImg/draw-pen.png'
import DrawPen2 from '@/assets/images/homePageImg/draw-pen2.png'
import Bamboo1 from '@/assets/images/homePageImg/bamboo1.png'
import Bamboo2 from '@/assets/images/homePageImg/bamboo2.png'
import Pencil1 from '@/assets/images/homePageImg/pencil1.png'
import Pencil2 from '@/assets/images/homePageImg/pencil2.png'
import MarkPen1 from '@/assets/images/homePageImg/markpen1.png'
import MarkPen2 from '@/assets/images/homePageImg/markpen2.png'
import Pen1 from '@/assets/images/homePageImg/pen1.png'
import Pen2 from '@/assets/images/homePageImg/pen2.png'
import Pen3 from '@/assets/images/homePageImg/pen3.png'
import Pen4 from '@/assets/images/homePageImg/pen4.png'
import Pen5 from '@/assets/images/homePageImg/pen5.png'
import Pen6 from '@/assets/images/homePageImg/pen6.png'
import { NftHomeCreateData } from '../../utils/banksyNftList'

import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'

const HomePageContainer = styled.div`
  margin: 0 calc((100% - 100.2rem) / 2);
  width: 120.2rem;
  padding: 2rem 0;
  font-family: 'PingFang SC'
`

const HeadLine = styled.div`
  display: flex;
  height: 17rem;
  align-items: center;
  justify-content: space-between;

  .Banksy {
    color: #7c6deb;
    font-size: 6rem;
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const BodyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MainColumnContainer = styled.div`
  position: relative;
  width: 57.9rem;
  height: 45.4rem;
  background: #ffffff;
  border-radius: 2rem;
  margin-top: 6rem;
  display: flex;
`

const SubColumnContainer = styled.div`
  position: relative;
  width: 37.2rem;
  height: 33.1rem;
  background: #ffffff;
  border-radius: 2rem;
  margin-top: 6.5rem;
`

const PositionedImage = styled.img<{
  right: string
  top: string
}>`
  position: absolute;
  height: ${props => props.height};
  width: ${props => props.width};

  right: ${props => props.right};

  top: ${props => props.top};
`

const InfoDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.3rem 3rem;
  font-family: 'PingFang SC';
  font-weight: 500;

  .info-title {
    font-size: 5rem;
    color: #161043;
    line-height: 7rem;
    font-weight: bold;
  }

  .info-title-2 {
    font-size: 3rem;
    color: #161043;
    line-height: 4.2rem;
    margin-bottom: 0.5rem;
  }

  .info {
    margin-top: 0.4rem;

    .info-name {
      font-size: 1.4rem;
      color: #161043;
      line-height: 2rem;
    }

    .info-value {
      font-size: 2rem;
      color: rgb(40, 13, 95);
      line-height: 2.8rem;
    }
  }
`

const Column = styled.div`
  flex: 1;
  margin-top: 3.3rem;
`

const Column2 = styled.div`
  margin-top: 1.3rem;
`

const SubTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: rgb(122, 110, 170);
  line-height: 2.5rem;
`

const InfoValue = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #b2bec3;
  line-height: 3.6rem;
`

const SubmitButton = styled(Button)`
  width: 100%;
  height: 4.5rem;
  background: #7c6deb;
  border-radius: 1.5rem;
  margin-top: 2.4rem;
  color: white;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background: #a29bfe;
    color: #fff;
    border: none;
  }
`

const SubmitButtonSmall = styled(Button)`
  width: 100%;
  height: 4rem;
  background: #7c6deb;
  border-radius: 1rem;
  margin-top: 0.9rem;
  color: white;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background: #a29bfe;
    color: #fff;
    border: none;
  }
`

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

  return (
    <HomePageContainer>
      <HeadLine>
        <img src={TitlePen} alt="title-pen" style={{ width: '17.2rem', height: '17.0rem' }} />
        <div style={{ display: 'flex' }}>
          <div className="Banksy">Banksy</div>
        </div>
        <img
          src={TitlePencil}
          alt="title-pencil"
          style={{ width: '7.8rem', height: '13.8rem', marginLeft: '9.4rem' }}
        />
      </HeadLine>
      <BodyRow>
        <MainColumnContainer>
          <InfoDetail>
            <div className="info-title">Create</div>
            <img src={DrawPen2} alt="draw-pen2" style={{ width: '2.3rem', height: '5.5rem', marginLeft: '3.0rem' }} />
            <Column>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue>{account! && data?.createNftNumber ? data?.createNftNumber : '- - -'}</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>${account! && data?.createTotalValues ? data?.createTotalValues : '- - -'}</InfoValue>
            </Column>
            <SubmitButton onClick={() => history.push('/nft/create')}>CREATE</SubmitButton>
          </InfoDetail>
          <PositionedImage
            src={DrawPen}
            alt="draw-pen"
            width="7.9rem"
            height="19.2rem"
            right="3.9rem"
            top="2rem"
          />
        </MainColumnContainer>
        <MainColumnContainer>
          <InfoDetail>
            <div className="info-title">Buy</div>
            <img src={Bamboo2} alt="bamboo" style={{ width: '1.4rem', height: '4.9rem', marginLeft: '3.0rem' }} />
            <Column2>
              <SubTitle>Selling</SubTitle>
              <InfoValue
                style={{ lineHeight: '3rem' }}
              >{account! && data?.buySelling ? data?.buySelling : '- - -'}
              </InfoValue>
            </Column2>
            <Column2>
              <SubTitle>NFT Values</SubTitle>
              <InfoValue
                style={{ lineHeight: '3rem' }}
              >${account! && data?.buyNftValues ? data?.buyNftValues : '- - -'}
              </InfoValue>
            </Column2>
            <Column2>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue
                style={{ lineHeight: '3rem' }}
              >{account! && data?.buyNftNumber ? data?.buyNftNumber : '- - -'}
              </InfoValue>
            </Column2>
            <SubmitButton onClick={toOnSale}>BUY</SubmitButton>
          </InfoDetail>

          <PositionedImage
            src={Bamboo1}
            alt="draw-pen"
            width="4.8rem"
            height="18.2rem"
            right="4rem"
            top="1.9rem"
          />
        </MainColumnContainer>
      </BodyRow>
      <BodyRow>
        <SubColumnContainer>
          <InfoDetail>
            <div className="info-title-2">Auction</div>
            <img src={Pen2} alt="pen" style={{ width: '2.4rem', height: '3.0rem', marginLeft: '2.1rem' }} />
            <div className="info">
              <div className="info-name">NFT Number</div>
              <div className="info-value">- - -</div>
            </div>
            <div className="info">
              <div className="info-name">Selling</div>
              <div className="info-value">- - -</div>
            </div>
            <div className="info">
              <div className="info-name">NFT Values</div>
              <div className="info-value">$- - -</div>
            </div>
            <SubmitButtonSmall onClick={() => history.push('/pleaseWaiting')}>AUCTION</SubmitButtonSmall>
          </InfoDetail>

          <PositionedImage
            src={Pen1}
            alt="draw-pen"
            width="8.6rem"
            height="11.6rem"
            right="0.8rem"
            top="1.1rem"
          />
        </SubColumnContainer>
        <SubColumnContainer>
          <InfoDetail>
            <div className="info-title-2">Lend</div>
            <img src={Pen4} alt="pen" style={{ width: '1.0rem', height: '3.9rem', marginLeft: '1.5rem' }} />
            <div className="info" style={{ marginTop: '0.2rem' }}>
              <div className="info-name">NFT Number</div>
              <div className="info-value">- - -</div>
            </div>
            <div className="info">
              <div className="info-name">Selling</div>
              <div className="info-value">- - -</div>
            </div>
            <div className="info">
              <div className="info-name">NFT Values</div>
              <div className="info-value">$- - -</div>
            </div>
            <SubmitButtonSmall onClick={() => history.push('/pleaseWaiting')}>LEND</SubmitButtonSmall>
          </InfoDetail>

          <PositionedImage
            src={Pen3}
            alt="draw-pen"
            width="2.7rem"
            height="12.2rem"
            top="1.2rem"
            right="2.5rem"
          />
        </SubColumnContainer>
        <SubColumnContainer>
          <InfoDetail>
            <div className="info-title-2">Splitting</div>
            <img src={Pen6} alt="pen" style={{ width: '3.1rem', height: '3.5rem', marginLeft: '2.1rem' }} />
            <div className="info" style={{ marginTop: '0.5rem' }}>
              <div className="info-name">NFT Number</div>
              <div className="info-value">- - -</div>
            </div>
            <div className="info">
              <div className="info-name">Selling</div>
              <div className="info-value">- - -</div>
            </div>
            <div className="info">
              <div className="info-name">NFT Values</div>
              <div className="info-value">$- - -</div>
            </div>
            <SubmitButtonSmall onClick={() => history.push('/pleaseWaiting')}>SPLITTING</SubmitButtonSmall>
          </InfoDetail>

          <PositionedImage
            src={Pen5}
            alt="draw-pen"
            width="8.8rem"
            height="9.8rem"
            top="1.7rem"
            right="0.8rem"
          />
        </SubColumnContainer>
      </BodyRow>
      <BodyRow>
        <MainColumnContainer>
          <InfoDetail>
            <div className="info-title">Mortgage</div>
            <img src={Pencil2} alt="pencil" style={{ width: '1.9rem', height: '4.7rem', marginLeft: '3.0rem' }} />
            <Column>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue>- - -</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>$- - -</InfoValue>
            </Column>
            <SubmitButton onClick={() => history.push('/pleaseWaiting')}>MORTGAGE</SubmitButton>
          </InfoDetail>

          <PositionedImage
            src={Pencil1}
            alt="draw-pen"
            width="6.3rem"
            height="15.4rem"
            top="1.2rem"
            right="2.3rem"
          />
        </MainColumnContainer>
        <MainColumnContainer>
          <InfoDetail>
            <div className="info-title">Liquidity</div>
            <img src={MarkPen2} alt="mark pen" style={{ width: '3.3rem', height: '4.0rem', marginLeft: '3.0rem' }} />
            <Column>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue>- - -</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>$- - -</InfoValue>
            </Column>
            <SubmitButton onClick={() => history.push('/pleaseWaiting')}>LIQUIDITY</SubmitButton>
          </InfoDetail>

          <PositionedImage
            src={MarkPen1}
            alt="draw-pen"
            width="11.1rem"
            height="13.8rem"
            top="1.9rem"
            right="1.7rem"
          />
        </MainColumnContainer>
      </BodyRow>


    </HomePageContainer>
  )
}

export default HomePage
