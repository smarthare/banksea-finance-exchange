import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Radio, Modal, Input, Select, Button, Switch } from 'antd'
import history from '@/assets/images/swap/history.png'
import setting from '@/assets/images/swap/setting.png'
import selectArrow from '@/assets/images/swap/selectArrow.png'
import babImg from '@/assets/images/swap/babImg.png'
import toArray from '@/assets/images/swap/toArray.png'
import addImg from '@/assets/images/swap/add.png'
import addInit from '@/assets/images/swap/addInit.png'
import tip from '@/assets/images/swap/tip.png'

const FarmPageContainer = styled.div`
  font-family: 'PingFang SC';
  min-height: 100vh;
  width: 500px;
  margin-left: calc((100% - 500px) / 2);
`
const SwitchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyRadio = styled(Radio.Group)`
  margin-top: 5.8rem;
  background: #E0DDF6;
  border-radius: 2.5rem;

  .ant-radio-button-wrapper {
    height: 4rem;
  }

  .ant-radio-button-wrapper > span {
    display: flex;
    justify-content: center;
    padding-top: 0.6rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #7C6DEB;
    line-height: 2.2rem;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #7c6deb !important;
    border-color: #7c6deb;
  }

  .ant-radio-button-wrapper-checked > span {
    font-size: 1.6rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 2.2rem;
  }

  .ant-radio-button-wrapper:first-child {
    width: 9rem;
  }

  .ant-radio-button-wrapper:last-child {
    width: 11rem;
  }

  .ant-radio-button-wrapper {
    border-radius: 2.5rem;
    background: #E0DDF6;
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px;
  }
`
const Swap = styled.div`
  width: 100%;
  height: 50.8rem;
  margin-top: 4.9rem;
  border-radius: 1rem;
  background: #fff;

  .swap-main-container {
    padding: 2rem 2rem 2.4rem 2rem;
  }
`

const UnlockButton = styled(Button)`
  width: 100%;
  height: 5rem;
  margin-top: 4rem;
  background: #7C6DEB;
  border: none;
  color: #ffffff;
  border-radius: 1rem;
  font-size: 1.8rem;
`

const FormsModalTop = styled.div`
  height: 10.2rem;
  padding: 1.9rem 3.3rem 2.1rem 2.5rem;

  .forms-modal-top-left {
    float: left;

    .forms-modal-top-title {
      color: #180E61;
      font-size: 2.2rem;
    }

    .formsModalTop-text {
      color: #A196EF;
      font-size: 1.4rem;
    }
  }

  .forms-modal-top-right {
    float: right;
    display: flex;
    margin-top: 0.8rem;

    img {
      width: 2.2rem;
    }

    img:nth-of-type(2) {
      margin-left: 2.3rem;
    }
  }
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: #DCDCDC;
`
const InputItem = styled.div`
  width: 100%;
  height: 11.8rem;
  background: #E0DDF6;
  border-radius: 1rem;
  padding: 1.5rem 1.7rem 2.1rem 2.3rem;

  .swap-main-container-title {
    color: #181F61;
    font-size: 1.4rem;
  }

  .inputMain {
    display: flex;
    position: relative;

    .ant-input {
      width: 50%;
      margin-top: 3.2rem;
      border: none;
      background-color: #E0DDF6;
      color: #A196EF;
      font-size: 2.2rem;
      padding: 0;
    }
  }
`

const CurrencySelect = styled.div`
  padding: 0.4rem 0.8rem;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  font-size: 1.8rem;
  align-items: center;
  background-color: #E0DDF6;
  color: #181F61;
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    background-color: #A196EF;
  }

  .babImg {
    width: 3rem;
    margin-right: 1.1rem;
  }

  .selectArrow {
    width: 1.2rem;
    margin-left: 1rem;
  }
`

const DownArray = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  img {
    width: 1.2rem;
  }
`

const Liquidity = styled.div`
  width: 100%;
  border-radius: 1rem;
  background: #fff;
`
const LiquidityTab = styled.div`
  width: 100%;
  display: flex;
  border-radius: 1rem;
  margin-top: 4.9rem;
  background: #E0DDF6;

  div {
    width: 50%;
    height: 7rem;
    background: #E0DDF6;
    color: #7C6DEB;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    cursor: pointer;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;

    img {
      width: 1.4rem;
      margin-right: 0.6rem;
    }
  }

  .tabs__link {
    background: #fff;
    color: #181F61;
    border-top-left-radius: 1rem;
  }
`

const YourLiquidityMain = styled.div`
    padding-bottom: 3.5rem;

  .yourLiquidity {
    display: none;
  }

  .yourLiquidityContent {
    width: 100%;
    height: 9.6rem;
    line-height: 9.6rem;
    text-align: center;
    color: #7C6DEB;
    background: #EEEEEE;
  }

  .addLiquidity {
    width: 25.4rem;
    height: 5rem;
    margin-left: calc((100% - 25.4rem) / 2);
    margin-top: 4rem;
    background: #fff;
    border: 2px solid #7C6DEB;
    color: #7C6DEB;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 1.4rem;
      margin-left: 1.5rem;
    }
  }

  .yourLiquidity.active {
    display: block;
  }
`

const AddMain = styled.div`
  .add {
    display: none;
  }

  .addliquidity-container {
    padding: 2rem 2rem 2.4rem 2rem;
  }

  .add.active {
    display: block;
  }
`
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
  .transaction-select{
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
  color:#A196EF;
  font-weight: 500;
  margin-bottom: 4.6rem;
`


const InterfaceSettings = styled.div`


  .toggles{
    display: flex;
    justify-content: space-between;
    margin-top: 5rem;

    .ant-switch {
      width: 9.5rem;
      height: 5rem;
      background-color: #E0DDF6;
    }
    .ant-switch-handle::before {
      width: 4.6rem;
      height: 4.6rem;
      border-radius: 10rem;

    }
    .ant-switch-checked {
      background-color: #31D0AB;
    }
  }

`

const YourLiquidity: React.FC<any> = ({ liquidityCurrent }) => {
  return (
    <YourLiquidityMain>
      <div className={'yourLiquidity' + (liquidityCurrent === 0 ? 'active' : '')}>
        <FormsModalTop>
          <div className="forms-modal-top-left">
            <div className="forms-modal-top-title">Remove Liquidity</div>
            <div className="formsModalTop-text">Remove Liquidity to receive tokens back</div>
          </div>
          <div className="forms-modal-top-right">
            <img src={setting} />
            <img src={history} />
          </div>
        </FormsModalTop>
        <div className="yourLiquidityContent">
          Connect to wallet to view your liquidity
        </div>
        <Button className="addLiquidity">
          Add liquidity instead
          <img src={addInit} />
        </Button>
      </div>
    </YourLiquidityMain>
  )
}

const Add: React.FC<any> = ({ liquidityCurrent, liquidityValue }) => {
  return (
    <AddMain>
      <div className={'add' + (liquidityCurrent === 1 ? 'active' : '')}>
        <FormsModalTop>
          <div className="forms-modal-top-left">
            <div className="forms-modal-top-title">Remove Liquidity</div>
            <div className="forms-modal-top-text">Remove Liquidity to receive tokens back</div>
          </div>
          <div className="forms-modal-top-right">
            <img src={setting} />
            <img src={history} />
          </div>
        </FormsModalTop>
        <div className="addliquidity-container">
          <InputItem>
            <div className="swap-main-container-title">Input</div>
            <div className="inputMain">
              <Input value={liquidityValue} />
              <CurrencySelect>
                Select a currency
                <img className="selectArrow" src={selectArrow} />
              </CurrencySelect>
            </div>
          </InputItem>
          <DownArray>
            <img src={addImg} />
          </DownArray>
          <InputItem>
            <div className="swap-main-container-title">Input</div>
            <div className="inputMain">
              <Input value={liquidityValue} />
              <CurrencySelect>
                Select a currency
                <img className="selectArrow" src={selectArrow} />
              </CurrencySelect>
            </div>
          </InputItem>
          <UnlockButton>Unlock Wallet</UnlockButton>
        </div>
      </div>
    </AddMain>
  )
}

const SettingModal: React.FC<any>= ({ isSettingVisible,handleCancel }) => {

  return (
    <SettingModalMain title="Settings" visible={isSettingVisible} footer={null} onCancel={handleCancel}  >
      <div className="main-title">Transaction Settings</div>
      <div className="sub-title">
        <span>Slippage tolerance</span>
        <img src={tip} style={{ width:'1.6rem',height:'1.6rem', marginLeft:'1rem', marginTop:'0.2rem' }} />
      </div>
      <div className="transaction-select" />
      <SettingRadio defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">0.1%</Radio.Button>
        <Radio.Button value="b">0.5%</Radio.Button>
        <Radio.Button value="c">1%</Radio.Button>
        <Radio.Button value="d" >0.5</Radio.Button>
      </SettingRadio>
      <div className="sub-title">Transaction deadline
        <img src={tip} style={{ width:'1.6rem',height:'1.6rem', marginLeft:'1rem', marginTop:'0.2rem' }} />
      </div>
      <InputDeadline /><span className="unit">minutes</span>
      <div className="main-title">Interface Settings</div>
      <InterfaceSettings >
        <div className="toggles">
          <div className="sub-title">Toggle Expert Mode
            <img src={tip} style={{ width:'1.6rem',height:'1.6rem', marginLeft:'1rem', marginTop:'0.2rem' }} />
          </div>
          <Switch  />
        </div>
        <div className="toggles">
          <div className="sub-title">Disable Multihops
            <img src={tip} style={{ width:'1.6rem',height:'1.6rem', marginLeft:'1rem', marginTop:'0.2rem' }} />
          </div>
          <Switch  />
        </div>
        <div className="toggles">
          <div className="sub-title">Audio
            <img src={tip} style={{ width:'1.6rem',height:'1.6rem', marginLeft:'1rem', marginTop:'0.2rem' }} />
          </div>
          <Switch  />
        </div>
      </InterfaceSettings>
    </SettingModalMain>
  )
}


interface LiquidityTabs {
  icon?: any
  name: string
}



const FarmPage: React.FC = () => {

  const formsTabs = ['Swap', 'Liquidity']

  const liquidityTabs: LiquidityTabs[] = [
    {
      icon: '',
      name: 'Your liquidity'
    },
    {
      icon: addInit,
      name: 'Add'
    }
  ]


  const [formTabsCurrent, setFormTabsCurrent] = useState<any>('Swap')

  const [liquidityCurrent, setLiquidityCurrent] = useState<any>(0)

  const [fromValue, setFromValue] = useState<any>('0.0')

  const [liquidityValue, setLiquidityValue] = useState<any>('0.0')

  const formsTabsChange = (e: any) => {
    console.log(e.target.value)
    setFormTabsCurrent(e.target.value)
    console.log(formTabsCurrent)
  }

  const clickTabs = (item: any, key: number) => {
    setLiquidityCurrent(key)
  }

  const [isSettingVisible, setSettingVisible] = useState(false)

  const showSettingModal = () => {
    setSettingVisible(true)
  }
  const handleCancel = () => {
    setSettingVisible(false)
  }

  return (
    <FarmPageContainer>
      <SwitchArea>
        <MyRadio defaultValue="Swap" buttonStyle="solid">
          {
            formsTabs.map((item: any, i: number) => {
              return (
                <Radio.Button value={item} key={i} onChange={formsTabsChange}>{item}</Radio.Button>
              )
            })
          }
        </MyRadio>
      </SwitchArea>

      <div>
        {
          formTabsCurrent === 'Swap' ?
            <Swap>
              <FormsModalTop>
                <div className="forms-modal-top-left">
                  <div className="forms-modal-top-title">Exchange</div>
                  <div className="formsModalTop-text">Trade tokens in an instant</div>
                </div>
                <div className="forms-modal-top-right">
                  <img src={setting} onClick={showSettingModal} />
                  <img src={history} />
                </div>
              </FormsModalTop>
              <Line />
              <div className="swap-main-container">
                <InputItem>
                  <div className="swap-main-container-title">from</div>
                  <div className="inputMain">
                    <Input placeholder="0.0" />
                    <CurrencySelect>
                      <img className="babImg" src={babImg} />
                      BAB
                      <img className="selectArrow" src={selectArrow} />
                    </CurrencySelect>
                  </div>
                </InputItem>
                <DownArray>
                  <img src={toArray} />
                </DownArray>
                <InputItem>
                  <div className="swap-main-container-title">to</div>
                  <div className="inputMain">
                    <Input placeholder="0.0" />
                    <CurrencySelect>
                      Select a currency
                      <img className="selectArrow" src={selectArrow} />
                    </CurrencySelect>
                  </div>
                </InputItem>
                <UnlockButton>Unlock Wallet</UnlockButton>
              </div>
            </Swap> :
            <Liquidity>
              <LiquidityTab>
                {
                  liquidityTabs.map((item: any, i: number) => {
                    return (
                      // @ts-ignore
                      <div className={i === liquidityCurrent && 'tabs__link'}
                        onClick={() => clickTabs(item, i)}
                        key={i}
                      >
                        <img src={item?.icon} />
                        {item.name}
                      </div>
                    )
                  })
                }
              </LiquidityTab>
              <YourLiquidity liquidityCurrent={liquidityCurrent} />
              <Add liquidityCurrent={liquidityCurrent} liquidityValue={liquidityValue} />
            </Liquidity>
        }
      </div>
      <SettingModal isSettingVisible={isSettingVisible} handleCancel={handleCancel} />

    </FarmPageContainer>
  )

}

export default FarmPage
