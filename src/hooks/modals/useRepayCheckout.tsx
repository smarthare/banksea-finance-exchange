import React from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
import { useModal } from '../useModal'

const RepayCheckoutModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }
  .ant-modal-content {
    width: 62.3rem;
    background-color: #111C3A; !important;
    border-radius: 1rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .borrow-body {
    margin-top: 4rem;

    .borrow-title {
      color: #F172ED;
      font-size: 2.2rem;
      font-weight: bolder;
      text-align: center;
    }

    .borrow-text {
      color: #ffffff;
      text-align: center;
  }

    .borrow-main {
      padding: 0 1.5rem 2rem 1.5rem;
      margin-top: 1rem;
      border: 1px solid #999999;
      border-radius: 0.8rem;

      .borrow-main-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        margin-top: 2rem;

        span:nth-of-type(2) {
          font-size: 1.7rem;
          font-weight: bolder;
        }
      }
    }
  }
`

const BorrowButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 3rem;
  margin-left: calc((100% - 16.9rem) / 2);

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

export const useRepayCheckoutModal = () => {

  const { modal, open, close } = useModal((_open, close, visible) => (
    <RepayCheckoutModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="borrow-body">
        <div className="borrow-title">Withdraw overview</div>
        <div className="borrow-text">There are your transaction details. Make sure to check if this is correct before submitting.</div>
        <div className="borrow-main">
          <div className="borrow-main-item">
            <span>Amount</span>
            <span>2 USDT</span>
          </div>
          <div className="borrow-main-item">
            <span>Interest (APY)</span>
            <span>3.88%</span>
          </div>
        </div>
        <BorrowButton >Withdraw</BorrowButton>
      </div>
    </RepayCheckoutModal>
  ))

  return {
    repayCheckoutModal: modal,
    openRepayCheckoutModal: open,
    closeRepayCheckoutModal: close
  }
}
