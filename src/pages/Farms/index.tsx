import React, { useState } from 'react'
import styled from 'styled-components'
import { Radio, Modal } from 'antd'

const FarmPageContainer = styled.div`
  font-family: 'PingFang SC';
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


const FarmPage : React.FC = () => {
  const [isSwapVisible, setSwapVisible] = useState(true)

  return (
    <FarmPageContainer >
      <SwitchArea>
        <MyRadio defaultValue="swap" buttonStyle="solid">
          <Radio.Button value="swap">Swap</Radio.Button>
          <Radio.Button value="liquidity">Liquidity</Radio.Button>
        </MyRadio>
      </SwitchArea>

      {
        !isSwapVisible && (
          <h2>55</h2>
        )
      }



    </FarmPageContainer>
  )


}

export default FarmPage
