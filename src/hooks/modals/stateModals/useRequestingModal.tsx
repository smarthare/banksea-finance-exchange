import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import { useModal } from '../../useModal'
import { LoadingOutlined } from '@ant-design/icons'
import { useSuccessModal } from './useSuccessModal'

const RequestModal = styled(Modal)`
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
      font-size: 2.2rem;
      font-weight: bolder;
      text-align: center;
    }

    &-main {
      margin-top: 10rem;
      display: flex;
      justify-content: center;
      margin-bottom: 10rem;
    }
  }
`

export const useRequestingModal = () => {

  const { successModal, openSuccessModal } = useSuccessModal()

  const init = useCallback(() => {
    const t = setInterval(() => {
      openSuccessModal()
    },5000)
  },[])

  useEffect(() => {
    init()
  },[init])

  const { modal, open, close } = useModal((_open, close, visible) => (
    <RequestModal
      visible={visible}
      onCancel={close}
      footer={null}
      closable={false}
    >
      <div className="request-body">
        <div className="request-body-title">Please wait</div>
        <div className="request-body-main">
          <LoadingOutlined style={{ fontSize: '10rem', color: '#06d6a0' }} />
        </div>
      </div>
      {successModal}
    </RequestModal>
  ))

  return {
    requestingModal: modal,
    openRequestingModal: open,
    closeRequestingModal: close
  }
}
