import React from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Modal } from 'antd'
import { useModal } from '../useModal'
import stateKSY from '../../assets/images/Pools/stateKSY.png'
import stateBPT from '../../assets/images/Pools/StateBPT.png'
import { useRequestingModal } from './stateModals/useRequestingModal'

const ApproveModal = styled(Modal)`
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

  .approve-body {
    margin-top: 4rem;

    &-title {
      color: #F172ED;
      font-size: 2.2rem;
      font-weight: bolder;
      text-align: center;
    }

    &-text {
      color: #ffffff;
      text-align: center;
  }

    &-main {
      width: 70%;
      background: #305099;
      border-radius: 1rem;
      margin-left: 15%;
      margin-top: 3rem;
      position: relative;

      img {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 3rem;
        position: absolute;
        top: 0.75rem;
        left: 1rem;
      }

      .ant-input-group.ant-input-group-compact > *:first-child, .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }

      .ant-input {
        width: 85% !important;
        height: 5rem;
        margin-left: 15%;
        color: white;
        font-size: 1.6rem;
        font-weight: 550;
        background: #305099 !important;
        border-radius: 1rem;
        border: none;
      }
    }
  }
`

const ApproveButton = styled(Button)`
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

export const useStakeApproveModal = (stakeCurrency: any) => {

  const { requestingModal, openRequestingModal } = useRequestingModal()

  const stake = () => {
    openRequestingModal()
  }

  const { modal, open, close } = useModal((_open, close, visible) => (
    <ApproveModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="approve-body">
        <div className="approve-body-title">Staking overview</div>
        <div className="approve-body-text">
          There are your transaction details KSY
          to the Safety Moule. Make sure to check if
          this is correct before submitting.
        </div>
        <div className="approve-body-main">
          <img src={stakeCurrency==='KSY' ? stateKSY : stateBPT} alt="" />
          <Form.Item name="price">
            <Input style={{ width: '50%' }} />
          </Form.Item>
        </div>
        <ApproveButton onClick={stake}>Stake</ApproveButton>
      </div>
      {requestingModal}
    </ApproveModal>
  ))

  return {
    approveModal: modal,
    openApproveModal: open,
    closeApproveModal: close
  }
}
