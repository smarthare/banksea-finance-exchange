import React, { useCallback, useState } from 'react'
import { toBigNumber, weiToBigNumber } from '../../web3/utils'
import { banksyWeb3 } from '../../BanksyWeb3'
import danger from '@/assets/images/allModalImg/danger.png'
import dangerDownArrow from '@/assets/images/allModalImg/dangerDownArrow.png'
import { Button, Checkbox, Divider, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useModal } from '../useModal'

const PurchaseCheckoutModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
    padding-bottom: 4rem;
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
    margin-top: 3.2rem;

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
        object-fit: cover;
        width: 7.1rem;
        height: 7.1rem;
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
      color: #FFFFFF !important;
      font-size: 1.8rem !important;

      width: 16.1rem;
      height: 5rem;
      background: #7C6DEB;
      border-radius: 1rem;
    }

    .ant-btn > span {
      font-weight: 550;
    }
  }
`

const Caveat = styled.div`
  width: 100%;
  height: 4.3rem;
  display: flex;
  align-items: center;
  background: #FDFDF4;
  border: 1px solid #E0DDF6;
  position: relative;

  .danger {
    width: 2rem;
    margin-left: 1.7rem;
  }

  span {
    margin-left: 1.4rem;
    font-weight: bold;
    font-size: 1.4rem;
  }

  .dangerDownArrow {
    width: 1.2rem;
    position: absolute;
    right: 1.5rem;
  }
`

const CaveatContent = styled.div`
  width: 100%;
  padding: 2rem;
  background: #FDFDF4;
  border: 1px solid #EFC300;
`

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 6rem;

  .text {
    width: 54.6rem;
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #7c6deb;
    line-height: 2.5rem;
    padding-top: 4.4rem;
  }

  .text2 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #7c6deb;
    line-height: 2.5rem;
    padding-top: 5rem;
  }
`

export const usePurchaseCheckoutModal = (nftDetail: any, checkoutPassed: () => void, checkoutFailed: () => void) => {
  const [isCaveatContentVisible, setCaveatContentVisible] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const [checking, setChecking] = useState(false)

  const checkboxOptions = [
    'By checking this box. I acknowledge that this item has not been reviewed or approved by Banksy',
    'By checking this box. I agree to Banksy\'s Terms of Services'
  ]

  const onChange = (e: any) => setAllChecked(e.length === checkboxOptions.length)

  const handleCheckout = async () => {
    setChecking(true)
    const balance = weiToBigNumber((await banksyWeb3.signer?.getBalance())?.toString())
    setChecking(false)

    // insufficient fund
    if (balance.lt(toBigNumber(nftDetail.price))) {
      checkoutFailed()
    } else {
      checkoutPassed()
    }
  }

  const buildModalByNftDetail = useCallback((close: () => void, visible: boolean) => (
    <PurchaseCheckoutModal
      title="Checkout"
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <Caveat
        onClick={() => setCaveatContentVisible(!isCaveatContentVisible)}
      >
        <img className="danger" src={danger} alt="" />
        <span>This item has not been reviewed by Banksy</span>
        <img className="dangerDownArrow" src={dangerDownArrow} alt="" />
      </Caveat>
      {
        isCaveatContentVisible ?
          <CaveatContent>
            You should proceed with extra caution. Anyone can
            create a digital item on a blockchain with any name.
            Including fake versions of existing items. Please take
            extra caution an do your research when interacting with
            this item to ensure it&apos;s what it claims to be.
          </CaveatContent> :
          <div />
      }
      <div className="checkout-list">
        <p>Item</p>
        <p>Subtotal</p>
      </div>
      <Divider style={{ marginTop: '-8px' }} />
      <div className="checkout-detail">
        <div className="ntf-info">
          <img className="nft-image" src={nftDetail?.image} alt="" />
          <div className="nft-detail">
            <div className="artist-name">{nftDetail?.name}</div>
            <div className="nft-name">{nftDetail?.description}</div>
          </div>
        </div>
        <div className="nft-value">
          <div className="nft-price">{nftDetail?.price ? nftDetail?.price : '---'}</div>
          <div className="nft-price-dollar">($- - -)</div>
        </div>
      </div>
      <Divider />
      <div className="total-price">
        <div className="total">Total</div>
        <div className="nft-value">
          <div className="nft-price">{nftDetail?.price ? nftDetail?.price : '- - -'}</div>
          <div className="nft-price-dollar">($- - -)</div>
        </div>
      </div>
      <Divider />
      <Announcement>
        <Checkbox.Group options={checkboxOptions} onChange={onChange} />
      </Announcement>
      <div className="footer">
        <Button disabled={!allChecked || checking} onClick={handleCheckout}>
          {
            checking ? (<><LoadingOutlined />&nbsp;Checking...</>) : 'Checkout'
          }
        </Button>
      </div>
    </PurchaseCheckoutModal>
  ), [nftDetail, allChecked, onChange])

  const { modal, open, close } = useModal((_open, close, visible) => buildModalByNftDetail(close, visible))

  return {
    purchaseCheckoutModal: modal,
    openPurchaseCheckoutModal: open,
    closePurchaseCheckoutModal: close
  }
}
