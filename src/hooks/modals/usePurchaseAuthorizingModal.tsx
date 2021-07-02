import React from 'react'
import Authorizing from '@/assets/images/allModalImg/authorizing.png'
import styled from 'styled-components'
import { Modal } from 'antd'
import { useModal } from '../useModal'

const AuthorizingModal = styled(Modal)`
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

export const usePurchaseAuthorizingModal = () => {
  const { modal, open, close } = useModal((_open, close, visible) => (
    <AuthorizingModal
      visible={visible}
      onCancel={close}
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
    </AuthorizingModal>
  ))

  return {
    authorizingModal: modal,
    openAuthorizingModal: open,
    closeAuthorizingModal: close
  }
}
