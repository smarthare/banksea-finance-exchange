import { useModal } from '../useModal'
import { Button, Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import mortgageModalBac from '../../assets/images/allModalImg/mortgageModalBac.svg'

const ConfirmModal = styled(Modal)`
  position: relative;

  .mortgageModalBac {
    width: 17rem;
    position: absolute;
    bottom: 3rem;
    right: 3rem;
  }

  .ant-modal-close-icon {
    color: white;
  }
  .ant-modal-content {
    border-radius: 1rem;
    width: 65.3rem;
  }
  .ant-modal-body,
  .ant-modal-header{
    background-color: #111C3A; !important;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    border-bottom: none;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    color: white;
    font-weight: 550;
    font-size: 1.8rem;
  }
`

const Line = styled.div`
  position: absolute;
  right: 0rem;
  top: 5.5rem;
  width: 100%;
  height: 0.15rem;
  background: linear-gradient(to right, #00FFFF, #7702FF);
`

const ConfirmModalText = styled.div`
  color: #89ABE1;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.7rem;
`

const MortgageValues = styled.div`
  width: 50rem;
  height: 13rem;
  margin-left: calc((100% - 50rem) /2);
  border: 1px solid #fff;
  border-radius: 1.5rem;
  margin-top: 3rem;

  .evaluating {
    color: #fff;
    font-size: 1.7rem;
    text-align: center;
    margin-top: 1rem;
  }

  .mortgageRate {
    color: #fff;
    font-size: 1.7rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .MortgageValues-bottom {
    padding-left: 2rem;
    color: #84A6DA;
    font-size: 1.3rem;
  }
`

const ConfirmButton = styled(Button)`
  width: 16.9rem;
  height: 5.2rem;
  margin-left: calc((100% - 16.9rem) / 2);
  background: #6C48FF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

export const useMortgageConfirmModal = () => {

  const { modal, open, close } = useModal((_open, close, visible) => (
    <ConfirmModal
      title="Checking the Mortgage"
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <Line />
      <ConfirmModalText>
        If you agree with the valuation of the NFT, you can make a<br />
        mortgage, and the NFT will be locked in the smart contract during<br />
        the mortgage. During the mortgage period, AI Oracle will regularly<br />
        update the valuation of NFT, please pay attention to it regularly.<br />
      </ConfirmModalText>
      <MortgageValues>
        <div className="evaluating">NFT evaluating value:＄100.89</div>
        <div className="mortgageRate">NFT mortgage rate:25.8%</div>
        <div className="MortgageValues-bottom">bToken:$26.02</div>
        <div className="MortgageValues-bottom">·Next Health value:2873.89</div>
      </MortgageValues>
      <ConfirmButton>Confirm</ConfirmButton>
      <img className="mortgageModalBac" src={mortgageModalBac} alt="mortgage" />
    </ConfirmModal>
  ))

  return {
    mortgageConfirmModal: modal,
    openMortgageConfirmModal: open,
    closeMortgageConfirmModal: close
  }
}
