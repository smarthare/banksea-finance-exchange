import React from 'react'
import styled from 'styled-components'
import { Button, Modal, Checkbox } from 'antd'
import { useModal } from '../useModal'
import stateKSY from '../../assets/images/Pools/stateKSY.png'
import stateBPT from '../../assets/images/Pools/StateBPT.png'
import { useApproveModal } from './useApproveModal'

const StakeUnderstandModal = styled(Modal)`
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

  .stake-body {
    margin-top: 1rem;

    &-title {
      color: #F172ED;
      font-size: 2.2rem;
      font-weight: bolder;
      text-align: center;
    }

    &-image {
      width: 6rem;
      height: 6rem;
      border-radius: 6rem;
      margin: 1rem auto;
    }

    &-name {
      text-align: center;
      color: #ffffff;
      font-size: 1.8rem;
      font-weight: bolder;
    }

    &-text {
      color: #ffffff;
      text-align: center;
      margin-top: 2rem;
    }

    &-check {
      text-align: center;
      margin-top: 6rem;

      .ant-checkbox + span {
        color: #999999;
      }
    }
  }
`

const StakeButton = styled(Button)`
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

export const useStakeUnderstandModal = (stakeCurrency: any) => {

  const { approveModal, openApproveModal, closeApproveModal } = useApproveModal(stakeCurrency)

  const understand = () => {
    openApproveModal()
  }

  const { modal, open, close } = useModal((_open, close, visible) => (
    <StakeUnderstandModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="stake-body">
        <div className="stake-body-title">Stake overview</div>
        <img className="stake-body-image" src={stakeCurrency==='KSY' ? stateKSY : stateBPT} alt="" />
        <div className="stake-body-name">Staking {stakeCurrency==='KSY' ? 'KSY' : 'BPT'}</div>
        <div className="stake-body-text">
          KSY holder can stake their KSY in the Safety Module
          and earn Safety Incentives. In the case of a
          <span style={{ color: '#e63946' }}> shortfall event, up to 30% </span>
          of your stake can be slashed to cover the
          deficit, providing an additional layer of protection for the
          protocol.
        </div>
        <div className="stake-body-text">
          Stakers receive Safety Incentives in the form of KSY tokens
          in exchange for taking this risk to secure the protocol. Your will need to activate a
          <i style={{ fontWeight: 'bolder', fontSize: '1.7rem' }}> 10 day cooling period </i>
          before you are able to withdraw your stake.
        </div>
        <div className="stake-body-check">
          <Checkbox>Remember my choice for next time</Checkbox>
        </div>
        <StakeButton onClick={understand}>I understand</StakeButton>
      </div>
      {approveModal}
    </StakeUnderstandModal>
  ))

  return {
    stakeUnderstandModal: modal,
    openStakeUnderstandModal: open,
    closeStakeUnderstandModal: close
  }
}
