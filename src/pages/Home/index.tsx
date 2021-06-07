import React, { useState } from 'react'
import styled from 'styled-components'
import TitlePen from '@/assets/images/homePageImg/title-pen1.png'
import TitlePencil from '@/assets/images/homePageImg/title-pen2.png'
import DrawPen from '@/assets/images/homePageImg/draw-pen.png'
import DrawPen2 from '@/assets/images/homePageImg/draw-pen2.png'
import Bamboo1 from '@/assets/images/homePageImg/bamboo1.png'
import Bamboo2 from '@/assets/images/homePageImg/bamboo2.png'
import Pencil1 from '@/assets/images/homePageImg/pencil1.png'
import Pencil2 from '@/assets/images/homePageImg/pencil2.png'
import Markpen1 from '@/assets/images/homePageImg/markpen1.png'
import Markpen2 from '@/assets/images/homePageImg/markpen2.png'
import Pen1 from '@/assets/images/homePageImg/pen1.png'
import Pen2 from '@/assets/images/homePageImg/pen2.png'
import Pen3 from '@/assets/images/homePageImg/pen3.png'
import Pen4 from '@/assets/images/homePageImg/pen4.png'
import Pen5 from '@/assets/images/homePageImg/pen5.png'
import Pen6 from '@/assets/images/homePageImg/pen6.png'
import StepOne from '@/assets/images/number1.png'
import DepositIcon from '@/assets/images/deposit-icon.png'

import { Button, Divider, Modal } from 'antd'
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

const MyBuyModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
    height: 46.4rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .checkout-list {
    display: flex;
    justify-content: space-between;

    p {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }
  }

  .checkout-detail {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .ntf-info {
      display: flex;

      .nft-image {
        width: 7.1rem;
        height: 7.1rem;
        background: #D8D8D8;
      }

      .nft-detail {
        margin-left: 2.4rem;
        align-self: center;

        .artist-name {
          font-size: 1.8rem;
          font-weight: 500;
          color: #7C6DEB;
          line-height: 2.5rem;
        }

        .nft-name {
          font-size: 1.8rem;
          font-weight: 550;
          line-height: 2.5rem;
        }
      }
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.5rem;
        width: 7.1rem;
      }

      .nft-price-dollar {
        font-size: 1.4rem;
        font-weight: 500;
        color: #999999;
        line-height: 20px;
        width: 7.1rem;
      }
    }
  }

  .total-price {
    display: flex;
    justify-content: space-between;

    .total {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        font-size: 2.2rem;
        font-weight: 500;
        color: #7C6DEB;
        line-height: 3rem;
        width: 9.1rem;
      }

      .nft-price-dollar {
        font-size: 1.8rem;
        font-weight: 500;
        color: #999999;
        line-height: 2.5rem;
        width: 9.1rem;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 3.3rem;

    .ant-btn {
      width: 16.1rem;
      height: 5rem;
      background: #7C6DEB;
      border-radius: 1rem;
    }

    .ant-btn > span {
      font-size: 1.8rem;
      font-weight: 550;
      color: #FFFFFF;
    }
  }
`

const MyCheckoutModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
    height: 43.8rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .head-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .step-tip {
    font-size: 1.6rem;
    font-weight: 500;
    color: #999999;
    line-height: 2.2rem;
  }

  .step-one-border {
    margin-top: 2.6rem;
    width: 55.7rem;
    height: 22.9rem;
    border: 1px solid #DCDCDC;

    .border-head {
      display: flex;
      align-content: center;
      padding: 1.9rem 1.9rem;


      .step-title {
        font-size: 1.6rem;
        font-weight: 500;
        color: #000000;
        line-height: 2.5rem;
        align-self: center;
        margin-left: 1.1rem;
      }
    }

    .border-body {
      padding: 1.9rem 1.9rem;
      background: rgba(124, 109, 235, 0.1);

      .border-detail {
        font-size: 1.6rem;
        font-weight: 500;
        color: #999999;
        line-height: 22px;
      }

      .ant-btn {
        width: 16.1rem;
        height: 5rem;
        background: #7C6DEB;
        border-radius: 1rem;
        margin-top: 2.1rem;
      }

      .ant-btn > span {
        font-size: 1.8rem;
        font-weight: 550;
        color: #FFFFFF;
      }
    }
  }
`

const MyDepositModal = styled(Modal)`
  .ant-modal-content {
    width: 62.3rem;
    height: 33.3rem;
    background: #FFFFFF;
    border-radius: 1rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .deposit-body {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    .deposit-text {
      font-weight: 500;
      color: #999999;
      line-height: 2.2rem;

    }

    .options {
      width: 33.3rem;
      height: 6.1rem;
      border: 1px solid #DCDCDC;
      margin-top: 2.8rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .deposit-icon {

      }
    }
  }
`


const HomePage: React.FC = () => {
  const history = useHistory()

  const [isBuyModalVisible, setBuyModalVisible] = useState(false)

  const showBuyingModal = () => {
    setBuyModalVisible(true)
  }

  const handleOk = () => {
    setBuyModalVisible(false)
  }


  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false)
  const showCheckoutModal = () => {
    setCheckoutModalVisible(true)
  }
  const [isDepositModalVisible, setDepositModalVisible] = useState(false)
  const showDepositModal = () => {
    setDepositModalVisible(true)
  }

  const nextPart = () => {
    if (isBuyModalVisible) {
      setBuyModalVisible(false)
      showCheckoutModal()
    }
    if (isCheckoutModalVisible) {
      setCheckoutModalVisible(false)
      showDepositModal()
    }

  }
  const handleCheckoutOk = () => {
    setCheckoutModalVisible(false)
  }
  const handleCancel = () => {
    setBuyModalVisible(false)
    setCheckoutModalVisible(false)
    setDepositModalVisible(false)
  }

  return (
    <HomePageContainer>
      <MyBuyModal title="Checkout" visible={isBuyModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className="checkout-list">
          <p>Item</p>
          <p>Subtotal</p>
        </div>
        <Divider style={{ marginTop: '-8px' }} />
        <div className="checkout-detail">
          <div className="ntf-info">
            <div className="nft-image" />
            <div className="nft-detail">
              <div className="artist-name">ZED RUN</div>
              <div className="nft-name">Defence Witness</div>
            </div>
          </div>
          <div className="nft-value">
            <div className="nft-price">0.98</div>
            <div className="nft-price-dollar">($2,516.14)</div>
          </div>
        </div>
        <Divider />
        <div className="total-price">
          <div className="total">Total</div>
          <div className="nft-value">
            <div className="nft-price">0.98</div>
            <div className="nft-price-dollar">($2,516.14)</div>
          </div>
        </div>
        <Divider />
        <div className="footer">
          <Button onClick={nextPart}>Checkout</Button>
        </div>
      </MyBuyModal>
      <MyCheckoutModal visible={isCheckoutModalVisible} onOk={handleCheckoutOk} onCancel={handleCancel} footer={null}>
        <div className="head-title">
          Complete your purchase
        </div>
        <Divider />
        <div className="step-tip">
          To complete your purchasse, follow these steps:
        </div>
        <div className="step-one-border">
          <div className="border-head">
            <img src={StepOne} alt="" style={{ width: '3.7rem', height: '3.7rem' }} />
            <div className="step-title">Deposit or convert funds</div>
          </div>
          <div className="border-body">
            <div className="border-detail">
              You don&apos;t have enough funds to complete the purchase. Please deposit or convert your funds.
            </div>
            <Button onClick={nextPart}>Deposit</Button>
          </div>
        </div>
      </MyCheckoutModal>
      <MyDepositModal title="Add ETH to you wallet"
        visible={isDepositModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="deposit-body">
          <div className="deposit-text">
            Select one of the options to deposit ETH to your wallet
          </div>
          <div className="options">
            <div className="deposit-icon">
              <img src={DepositIcon} alt="" style={{ width: '2.5rem', height: '2.4rem' }} />
            </div>
          </div>
        </div>
      </MyDepositModal>
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
            <SubmitButton onClick={() => history.push('/nft/create')}>CREATE</SubmitButton>
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
            <SubmitButton onClick={showBuyingModal}>BUY</SubmitButton>
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
            <div className="info-title-2">Lend</div>
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
