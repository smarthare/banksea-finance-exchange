import React from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
import { useModal } from '../../useModal'
import { CheckCircleOutlined } from '@ant-design/icons'

const SuccessModal = styled(Modal)`
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

  .request-body {
    margin-top: 1rem;

    &-title {
      color: #06d6a0;
      font-size: 2.5rem;
      font-weight: bolder;
      text-align: center;
    }

    &-main {
      margin-top: 10rem;
      display: flex;
      justify-content: center;
      margin-bottom: 6rem;
    }
  }
`

const BackButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  background: #06d6a0;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 3rem;
  margin-left: calc((100% - 16.9rem) / 2);
`

export const useSuccessModal = () => {

  const { modal, open, close } = useModal((_open, close, visible) => (
    <SuccessModal
      visible={visible}
      onCancel={close}
      footer={null}
      closable={false}
    >
      <div className="request-body">
        <div className="request-body-title">Success</div>
        <div className="request-body-main">
          <CheckCircleOutlined style={{ fontSize: '12rem', color: '#06d6a0' }} />
        </div>
        <BackButton
          onClick={() => {
            window.location.reload()
          }}
        >Back
        </BackButton>
      </div>
    </SuccessModal>
  ))

  return {
    successModal: modal,
    openSuccessModal: open,
    closeSuccessModal: close
  }
}
