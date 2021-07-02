import React from 'react'
import { Button, Modal } from 'antd'
import successExchange from '@/assets/images/allModalImg/successExchange.png'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useModal } from '../useModal'

const PurchaseSuccessModal = styled(Modal)`
  width: 62.3rem;
  height: 49.4rem;
  border-radius: 1rem;

  .success-title {
    width: 100%;
    text-align: center;
    font-size: 2.2rem;
  }

  img {
    width: 7.6rem;
    margin-left: calc((100% - 7.6rem) / 2);
    margin-top: 5.4rem;
  }

  .toItem {
    width: 25.3rem;
    height: 5rem;
    background: #7C6DEB;
    border-radius: 10px;
    color: #fff;
    font-size: 1.8rem;
    margin-left: calc((100% - 25.3rem) / 2);
    margin-top: 6.4rem;
  }
`

export const usePurchaseSuccessModal = () => {
  const history = useHistory()

  const backItem = () => {
    history.push('/personal/home')
  }

  const { modal, open, close } = useModal((_open, close, visible) => (
    <PurchaseSuccessModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="success-title">Your transaction has succeed！</div>
      <img src={successExchange} alt="" />
      <Button className="toItem" onClick={backItem}>BACK TO ALL ITEMS</Button>
    </PurchaseSuccessModal>
  ))

  return {
    purchaseSuccessModal: modal,
    openPurchaseSuccessModal: open,
    closePurchaseSuccessModal: close
  }
}
