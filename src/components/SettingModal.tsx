import React from 'react'
import tip from '@/assets/images/swap/tip.png'
import { Input, Modal, Radio, Switch } from 'antd'
import styled from 'styled-components'

const SettingModalMain = styled(Modal)`
  .ant-modal-content {

    width: 80rem;
    height: 75.5rem;
  }

  .main-title {
    font-size: 22px;
    font-weight: 500;
    color: #180E61;
    line-height: 30px;
  }

  .sub-title {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: #A196EF;
    line-height: 20px;
    padding-top: 1.2rem;
  }

  .transaction-select {
    padding-top: 3rem;

  }

  .unit {
    font-size: 18px;
    font-weight: 500;
    color: #7C6DEB;
    line-height: 25px;
    margin-left: 1.5rem;
  }
`

const SettingRadio = styled(Radio.Group)`
  margin-bottom: 3rem;

  .ant-radio-button-wrapper {
    margin-right: 2rem;
    background: #E0DDF6;
    width: 9.6rem;
    height: 6rem;
    border-radius: 10px;
  }

  .ant-radio-button-wrapper > span {
    display: flex;
    justify-content: center;
    padding-top: 1.5rem;
    font-size: 18px;
    font-weight: 500;
    color: #7C6DEB;
    line-height: 25px;
  }

  .ant-radio-button-wrapper:last-child {
    width: 31.6rem;
  }

  .ant-radio-button-wrapper-checked > span {
    font-size: 1.6rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 2.2rem;

  }

  .ant-radio-button-wrapper-checked {
    background: #7c6deb !important;

  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px;
  }
`

const InputDeadline = styled(Input)`
  margin-top: 1.9rem;
  width: 29.2rem;
  height: 5rem;
  background-color: #E0DDF6;
  border-radius: 1rem;
  color: #A196EF;
  font-weight: 500;
  margin-bottom: 4.6rem;
`

const InterfaceSettings = styled.div`
  .toggles {
    display: flex;
    justify-content: space-between;
    margin-top: 5rem;

    .ant-switch {
      background-color: #E0DDF6;
    }

    .ant-switch-checked {
      background-color: #31D0AB;
    }
  }
`

const SettingModal: React.FC<any> = ({ isSettingVisible, handleCancel }) => {
  return (
    <SettingModalMain title="Settings" visible={isSettingVisible} footer={null} onCancel={handleCancel}>
      <div className="main-title">Transaction Settings</div>
      <div className="sub-title">
        <span>Slippage tolerance</span>
        <img src={tip} style={{ width: '1.6rem', height: '1.6rem', marginLeft: '1rem', marginTop: '0.2rem' }}  alt="" />
      </div>
      <div className="transaction-select" />
      <SettingRadio defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">0.1%</Radio.Button>
        <Radio.Button value="b">0.5%</Radio.Button>
        <Radio.Button value="c">1%</Radio.Button>
        <Radio.Button value="d">0.5</Radio.Button>
      </SettingRadio>
      <div className="sub-title">Transaction deadline
        <img src={tip} style={{ width: '1.6rem', height: '1.6rem', marginLeft: '1rem', marginTop: '0.2rem' }} alt="" />
      </div>
      <InputDeadline />
      <span className="unit">minutes</span>
      <div className="main-title">Interface Settings</div>
      <InterfaceSettings>
        <div className="toggles">
          <div className="sub-title">Toggle Expert Mode
            <img src={tip} style={{ width: '1.6rem', height: '1.6rem', marginLeft: '1rem', marginTop: '0.2rem' }} alt="" />
          </div>
          <Switch />
        </div>
        <div className="toggles">
          <div className="sub-title">Disable Multihops
            <img src={tip} style={{ width: '1.6rem', height: '1.6rem', marginLeft: '1rem', marginTop: '0.2rem' }} alt="" />
          </div>
          <Switch />
        </div>
        <div className="toggles">
          <div className="sub-title">Audio
            <img src={tip} style={{ width: '1.6rem', height: '1.6rem', marginLeft: '1rem', marginTop: '0.2rem' }} alt="" />
          </div>
          <Switch />
        </div>
      </InterfaceSettings>
    </SettingModalMain>
  )
}

export default SettingModal
