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
import StepOne from '@/assets/images/allModalImg/number1.png'
import DepositIcon from '@/assets/images/allModalImg/deposit-icon.png'
import Authorizing from '@/assets/images/allModalImg/authorizing.png'
import { NftHomeCreateData } from '../../utils/banksyNftList'

import { Button, Divider, Modal } from 'antd'
import { useHistory } from 'react-router-dom'

const HomePageContainer = styled.div`
  margin: 0 auto;
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
      margin-top: 4.3rem;
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
        margin-right: 1.2rem;
      }

      .deposit-tip {
        font-size: 1.6rem;
        font-weight: 500;
        color: #999999;
        line-height: 2.2rem;
      }
    }
  }
`

const MyAuthorizingModal = styled(Modal)`
  .ant-modal-content {
    width: 62.3rem;
    height: 49.4rem;
    background: #FFFFFF;
    border-radius: 1rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .author-body {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    .author-title {
      font-size: 2.2rem;
      font-weight: 400;
      color: #000000;
      line-height: 3rem;
      margin-top: 7.1rem;
      margin-bottom: 2.5rem;
    }

    .author-tip {
      font-size: 1.4rem;
      font-weight: 400;
      color: #000000;
      line-height: 2rem;
    }
  }

  .author-img {
    position: absolute;
    margin-top: 5.1rem;
    margin-left: 17.8rem;
  }

`


const HomePage: React.FC = () => {
  const history = useHistory()

  const [isBuyModalVisible, setBuyModalVisible] = useState(false)
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false)
  const [isDepositModalVisible, setDepositModalVisible] = useState(false)
  const [isAuthorizingModalVisible, setAuthorizingModalVisible] = useState(false)

  const showBuyingModal = () => {
    setBuyModalVisible(true)
  }

  const handleOk = () => {
    setBuyModalVisible(false)
  }

  const showAuthorizingModal = () => {
    setAuthorizingModalVisible(true)
  }

  const showCheckoutModal = () => {
    setCheckoutModalVisible(true)
  }

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
    setAuthorizingModalVisible(false)
  }
  const [data, setData] = useState<any>()
  const init = useCallback(async () => {
    NftHomeCreateData().then(res => {
      setData(res.data.data)
    }).catch(err => err)
  }, [])

  useEffect(() => {
    init()
  }, [init])


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
              <InfoValue>{data?.createNftNumber}</InfoValue>
            </Column>
            <Column>
              <SubTitle>Total Values</SubTitle>
              <InfoValue>${data?.createTotalValues}</InfoValue>
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
              <InfoValue style={{ lineHeight: '3rem' }}>{data?.buySelling}</InfoValue>
            </Column2>
            <Column2>
              <SubTitle>NFT Values</SubTitle>
              <InfoValue style={{ lineHeight: '3rem' }}>${data?.buyNftValues}</InfoValue>
            </Column2>
            <Column2>
              <SubTitle>NFT Number</SubTitle>
              <InfoValue style={{ lineHeight: '3rem' }}>{data?.buyNftNumber}</InfoValue>
            </Column2>
            <SubmitButton onClick={() => history.push('/collectibles')}>BUY</SubmitButton>
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

      <MyBuyModal title="Checkout"
        visible={isBuyModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
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
            <div className="nft-price">- - -</div>
            <div className="nft-price-dollar">($- - -)</div>
          </div>
        </div>
        <Divider />
        <div className="total-price">
          <div className="total">Total</div>
          <div className="nft-value">
            <div className="nft-price">- - -</div>
            <div className="nft-price-dollar">($- - -)</div>
          </div>
        </div>
        <Divider />
        <div className="footer">
          <Button onClick={nextPart}>Checkout</Button>
        </div>
      </MyBuyModal>
      <MyCheckoutModal visible={isCheckoutModalVisible}
        onOk={handleCheckoutOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="head-title">
          Complete your purchase
        </div>
        <Divider />
        <div className="step-tip">
          To complete your purchase, follow these steps:
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
      <MyDepositModal
        title="Add ETH to you wallet"
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
            <div className="deposit-tip">Deposit from an exchange</div>
          </div>
        </div>
      </MyDepositModal>
      <MyAuthorizingModal
        visible={isAuthorizingModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="author-body">
          <div className="author-title">
            Authorizing your account for this order...
          </div>
          <div className="author-tip">if a signature request pops up, just click &quot;Sign&quot;</div>
          <div className="author-tip">to verify that you own your wallet.</div>
        </div>
        <div className="author-img">
          <img src={Authorizing} alt="" style={{ width: '21.1rem', height: '15.2rem' }} />
        </div>
      </MyAuthorizingModal>
    </HomePageContainer>
  )
}

export default HomePage
