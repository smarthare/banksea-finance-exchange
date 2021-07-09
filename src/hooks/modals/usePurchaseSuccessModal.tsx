import React from 'react'
import { Button, Modal } from 'antd'
import successExchange from '@/assets/images/allModalImg/successExchange.png'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useModal } from '../useModal'

const PurchaseSuccessModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }
  width: 60rem;
  height: 60rem;
  border-radius: 1rem;

  .ant-modal-body,
  .ant-modal-header{
    background-color: #111C3A; !important;
  }

  .success-title {
    width: 100%;
    text-align: center;
    font-size: 2.2rem;
    color: #98BDF9;
  }

  .ant-modal-content,
  .ant-modal-body {
    border-radius: 1rem;
    border-bottom: none;
  }

  img {
    width: 7.6rem;
    margin-left: calc((100% - 7.6rem) / 2);
    margin-top: 5.4rem;
  }

  .toItem {
    width: 25.3rem;
    height: 5rem;
    background: #554BFF;
    border-radius: 10px;
    color: #fff;
    font-size: 1.8rem;
    margin-left: calc((100% - 25.3rem) / 2);
    margin-top: 5.4rem;
    border: none;
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
