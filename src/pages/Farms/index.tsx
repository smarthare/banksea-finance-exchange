import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Radio } from 'antd'
import history from '@/assets/images/swap/history.png'
import setting from '@/assets/images/swap/setting.png'
import selectArrow from '@/assets/images/swap/selectArrow.png'
import babImg from '@/assets/images/swap/babImg.png'
import toArray from '@/assets/images/swap/toArray.png'
import addImg from '@/assets/images/swap/add.png'
import addInit from '@/assets/images/swap/addInit.png'
import SettingModal from '../../components/SettingModal'

const FarmPageContainer = styled.div`
  font-family: 'PingFang SC';
  width:  100%;
  overflow-x: hidden;
  padding: 4vw 25vw;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    padding: 0 5vw;
    height: 100vw;
    width: 100vw;
  }
`
const SwitchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    margin-top: 20vw;
    width: 100vw;
  }
`

const MyRadio = styled(Radio.Group)`
  background: #97BCF9;
  border-radius: 5vw;

  .ant-radio-button-wrapper {
    height: 4rem;
  }

  .ant-radio-button-wrapper > span {
    display: flex;
    justify-content: center;
    padding-top: 0.6rem;
    font-size: 1.6rem;
    font-weight: 550;
    color: white;
    line-height: 2.2rem;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #181F61 !important;
  }

  .ant-radio-button-wrapper-checked > span {
    font-size: 1.6rem;
    font-weight: 550;
    color: white;
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
    background: #97BCF9;
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px;
  }
`

const Swap = styled.div`
  width: 100%;
  height: 33vw;
  margin-top: 3vw;
  border-radius: 1rem;
  background: #305099;

  .swap-main-container {
    padding: 2rem 2rem 2.4rem 2rem;
  }
`

const UnlockButton = styled(Button)`
  width: 100%;
  height: 5rem;
  margin-top: 4rem;
  background: #181F61;
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
    font-weight: 550;

    .forms-modal-top-title {
      color: #97BCF9;
      font-size: 2.2rem;
    }

    .formsModalTop-text {
      color: #97BCF9;
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
  background: #181F61;
`
const InputItem = styled.div`
  width: 100%;
  height: 11.8rem;
  background: #97BCF9;
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
      background-color: #97BCF9;
      color: #181F61;
      font-size: 2.2rem;
      padding: 0;
    }

    .ant-input {
      &::placeholder {
        color: #181F61;
        transition: all 1s;
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
  background-color: #97BCF9;
  color: #181F61;
  cursor: pointer;
  border-radius: 1rem;
  transition: all 0.5s;


  &:hover {
    background-color: #5381d0;
    transition: all 0.5s;

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
  background: #305099;
`
const LiquidityTab = styled.div`
  width: 100%;
  display: flex;
  border-radius: 1rem;
  margin-top: 3vw;
  background: #0B111E;

  div {
    width: 50%;
    height: 7rem;
    font-weight: 550;
    background: #97BCF9;
    color: #181F61;
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
    background: #181F61;
    color: white;
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
    color: #97BCF9;
    background: #305099;
  }

  .addLiquidity {
    width: 25.4rem;
    height: 5rem;
    margin-left: calc((100% - 25.4rem) / 2);
    margin-top: 4rem;
    background: #181F61;
    border: 2px solid #353fac;
    color: #fff;
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
            <img src={setting} alt="" />
            <img src={history} alt="" />
          </div>
        </FormsModalTop>
        <div className="yourLiquidityContent">
          Connect to wallet to view your liquidity
        </div>
        <Button className="addLiquidity">
          Add liquidity instead
          <img src={addInit} alt="" />
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
            <img src={setting} alt="" />
            <img src={history} alt="" />
          </div>
        </FormsModalTop>
        <div className="addliquidity-container">
          <InputItem>
            <div className="swap-main-container-title">Input</div>
            <div className="inputMain">
              <Input value={liquidityValue} />
              <CurrencySelect>
                Select a currency
                <img className="selectArrow" src={selectArrow} alt="" />
              </CurrencySelect>
            </div>
          </InputItem>
          <DownArray>
            <img src={addImg} alt="" />
          </DownArray>
          <InputItem>
            <div className="swap-main-container-title">Input</div>
            <div className="inputMain">
              <Input value={liquidityValue} />
              <CurrencySelect>
                Select a currency
                <img className="selectArrow" src={selectArrow} alt="" />
              </CurrencySelect>
            </div>
          </InputItem>
          <UnlockButton>Unlock Wallet</UnlockButton>
        </div>
      </div>
    </AddMain>
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

  const [liquidityValue] = useState<any>('0.0')

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
                  <img src={setting} onClick={showSettingModal} alt="" />
                  <img src={history} alt="" />
                </div>
              </FormsModalTop>
              <Line />
              <div className="swap-main-container">
                <InputItem>
                  <div className="swap-main-container-title">from</div>
                  <div className="inputMain">
                    <Input placeholder="0.0" />
                    <CurrencySelect>
                      <img className="babImg" src={babImg} alt="" />
                      BNB
                      <img className="selectArrow" src={selectArrow} alt="" />
                    </CurrencySelect>
                  </div>
                </InputItem>
                <DownArray>
                  <img src={toArray} alt="" />
                </DownArray>
                <InputItem>
                  <div className="swap-main-container-title">to</div>
                  <div className="inputMain">
                    <Input placeholder="0.0" />
                    <CurrencySelect>
                      Select a currency
                      <img className="selectArrow" src={selectArrow} alt="" />
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
                        <img src={item?.icon} alt="" />
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
