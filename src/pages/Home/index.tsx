import React from 'react'
import styled from 'styled-components'
import TitlePen from '@/assets/images/title-pen1.png'
import TitlePencil from '@/assets/images/title-pen2.png'
import DrawPen from '@/assets/images/draw-pen.png'
import DrawPen2 from '@/assets/images/draw-pen2.png'
import Bamboo1 from '@/assets/images/bamboo1.png'
import Bamboo2 from '@/assets/images/bamboo2.png'
import Pencil1 from '@/assets/images/pencil1.png'
import Pencil2 from '@/assets/images/pencil2.png'
import Markpen1 from '@/assets/images/markpen1.png'
import Markpen2 from '@/assets/images/markpen2.png'
import Pen1 from '@/assets/images/pen1.png'
import Pen2 from '@/assets/images/pen2.png'
import Pen3 from '@/assets/images/pen3.png'
import Pen4 from '@/assets/images/pen4.png'
import Pen5 from '@/assets/images/pen5.png'
import Pen6 from '@/assets/images/pen6.png'

import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const HeadLine = styled.div`
  display: flex;
  height: 17rem;
  align-items: center;
  justify-content: space-between;
  font-family: 'PingFang SC'
`

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'PingFang SC'
`

const HomePageContainer = styled.div`
  padding: 2rem 18rem;
  font-family: 'PingFang SC'
`

const Row = styled.div`
  display: flex;

  .Banksy {
    color: #7c6deb;
    font-size: 6rem;
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const MainColumn = styled.div`
  width: 38.9rem;
  height: 45.4rem;
  background: #ffffff;
  border-radius: 2rem;
  margin-top: 6rem;
  display: flex;
`

const SubColumn = styled.div`
  width: 24.2rem;
  height: 33.1rem;
  background: #ffffff;
  border-radius: 2rem;
  margin-top: 6.5rem;
  .image-2 {
    position: absolute;
    padding-left: 14.8rem;
    padding-top: 1.1rem;
  }
`

const Image = styled.div`
  position: absolute;
  padding-left: 27.1rem;
  padding-top: 1.4rem;
`
const InfoDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
  //font-family: Arial;
  font-family: 'PingFang SC';

  .info-title {
    font-size: 5rem;
    color: #161043;
    font-weight: 550;
    line-height: 7rem;
  }
  .info-title-2 {
    font-size: 3rem;
    font-weight: 550;
    color: #161043;
    line-height: 4.2rem;
  }
  .info {
    margin-top: 1.1rem;

    .info-name {
      font-size: 1.4rem;
      font-weight: 500;
      color: #161043;
      line-height: 2rem;
    }
    .info-value {
      font-size: 2rem;
      font-weight: 500;
      color: #161043;
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
  color: #161043;
  line-height: 2.5rem;
`

const InfoValue = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  color: #161043;
  line-height: 3.6rem;
`
const SubmitButton = styled(Button)`
  width: 100%;
  height: 6rem;
  background: #7c6deb;
  border-radius: 0.5rem;
  margin-top: 2.4rem;
  color: white;
  font-size: 16px;
  font-weight: 500;
`

const SubmitButtonSmall = styled(Button)`
  width: 100%;
  height: 4rem;
  background: #7c6deb;
  border-radius: 0.5rem;
  margin-top: 0.9rem;
  color: white;
  font-size: 16px;
  font-weight: 500;
`


const HomePage: React.FC = () => {
  const history = useHistory()
  const toCreat = () => {
    history.push('/creatPage')
  }
  return (
    <HomePageContainer>
      <HeadLine>
        <img src={TitlePen} alt="title-pen" style={{ width: '17.2rem', height: '17.0rem' }} />
        <Row className="row">
          <div className="Banksy">Banksy</div>
        </Row>
        <img
          src={TitlePencil}
          alt="title-pencil"
          style={{ width: '7.8rem', height: '13.8rem', marginLeft: '9.4rem' }}
        />
      </HeadLine>
      <Body>
        <MainColumn>
          <Image>
            <img src={DrawPen} alt="draw-pen" style={{ width: '7.9rem', height: '19.2rem' }} />
          </Image>
          <InfoDetail>
            <div className="info-title">Create</div>
            <img src={DrawPen2} alt="draw-pen2" style={{ width: '2.3rem', height: '5.5rem', marginLeft: '3.0rem' }} />
            <Column>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue>12622</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>$123215.36</InfoValue>
            </Column>
            <SubmitButton onClick={toCreat}>CREATE</SubmitButton>
          </InfoDetail>
        </MainColumn>
        <MainColumn>
          <Image>
            <img src={Bamboo1} alt="bamboo" style={{ width: '4.8rem', height: '18.2rem' }} />
          </Image>
          <InfoDetail>
            <div className="info-title">Buy</div>
            <img src={Bamboo2} alt="bamboo" style={{ width: '1.4rem', height: '4.9rem', marginLeft: '3.0rem' }} />
            <Column2>
              <SubTitle>Selling</SubTitle>
              <InfoValue style={{ lineHeight: '3rem' }}>555666</InfoValue>
            </Column2>
            <Column2>
              <SubTitle>NFT Values</SubTitle>
              <InfoValue style={{ lineHeight: '3rem' }}>12622</InfoValue>
            </Column2>
            <Column2>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue style={{ lineHeight: '3rem' }}>12622</InfoValue>
            </Column2>
            <SubmitButton>BUY</SubmitButton>
          </InfoDetail>
        </MainColumn>
      </Body>
      <Body>
        <SubColumn>
          <div className="image-2">
            <img src={Pen1} alt="pen" style={{ width: '8.6rem', height: '11.6rem' }} />
          </div>
          <InfoDetail>
            <div className="info-title-2">Auction</div>
            <img src={Pen2} alt="pen" style={{ width: '2.4rem', height: '3.0rem', marginLeft: '2.1rem' }} />

            <div className="info">
              <div className="info-name">NFT Number</div>
              <div className="info-value">12622</div>
            </div>
            <div className="info">
              <div className="info-name">Selling</div>
              <div className="info-value">555666</div>
            </div>
            <div className="info">
              <div className="info-name">NFT Values</div>
              <div className="info-value">$123215.36</div>
            </div>
            <SubmitButtonSmall>AUCTION</SubmitButtonSmall>
          </InfoDetail>
        </SubColumn>
        <SubColumn>
          <div className="image-2">
            <img src={Pen3} alt="pen" style={{ width: '2.7rem', height: '12.2rem', marginLeft: '4rem' }} />
          </div>
          <InfoDetail>
            <div className="info-title-2">Lend </div>
            <img src={Pen4} alt="pen" style={{ width: '1.0rem', height: '3.9rem', marginLeft: '1.5rem' }} />

            <div className="info" style={{ marginTop: '0.2rem' }}>
              <div className="info-name">NFT Number</div>
              <div className="info-value">12622</div>
            </div>
            <div className="info">
              <div className="info-name">Selling</div>
              <div className="info-value">555666</div>
            </div>
            <div className="info">
              <div className="info-name">NFT Values</div>
              <div className="info-value">$123215.36</div>
            </div>
            <SubmitButtonSmall>AUCTION</SubmitButtonSmall>
          </InfoDetail>
        </SubColumn>
        <SubColumn>
          <div className="image-2">
            <img src={Pen5} alt="pen" style={{ width: '8.8rem', height: '9.8rem' }} />
          </div>
          <InfoDetail>
            <div className="info-title-2">Auction</div>
            <img src={Pen6} alt="pen" style={{ width: '3.1rem', height: '3.5rem', marginLeft: '2.1rem' }} />

            <div className="info" style={{ marginTop: '0.5rem' }}>
              <div className="info-name">NFT Number</div>
              <div className="info-value">12622</div>
            </div>
            <div className="info">
              <div className="info-name">Selling</div>
              <div className="info-value">555666</div>
            </div>
            <div className="info">
              <div className="info-name">NFT Values</div>
              <div className="info-value">$123215.36</div>
            </div>
            <SubmitButtonSmall>AUCTION</SubmitButtonSmall>
          </InfoDetail>
        </SubColumn>
      </Body>
      <Body>
        <MainColumn>
          <Image>
            <img src={Pencil1} alt="pencil" style={{ width: '6.3rem', height: '15.4rem' }} />
          </Image>
          <InfoDetail>
            <div className="info-title">Create</div>
            <img src={Pencil2} alt="pencil" style={{ width: '1.9rem', height: '4.7rem', marginLeft: '3.0rem' }} />
            <Column>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue>12622</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>$123215.36</InfoValue>
            </Column>
            <SubmitButton>LIQUIDITY</SubmitButton>
          </InfoDetail>
        </MainColumn>
        <MainColumn>
          <Image>
            <img src={Markpen1} alt="markpen" style={{ width: '11.1rem', height: '13.8rem' }} />
          </Image>
          <InfoDetail>
            <div className="info-title">Create</div>
            <img src={Markpen2} alt="markpen" style={{ width: '3.3rem', height: '4.0rem', marginLeft: '3.0rem' }} />
            <Column>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue>12622</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>$123215.36</InfoValue>
            </Column>
            <SubmitButton>LIQUIDITY</SubmitButton>
          </InfoDetail>
        </MainColumn>
      </Body>
    </HomePageContainer>
  )
}

export default HomePage
