import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/banksy-logo.png'
import { Button } from 'antd'

const AppHeaderContainer = styled.div`
  background-color: white;
  height: 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`

const ConnectButton = styled(Button)`
  width: 146px;
  height: 50px;
  background: #7c6deb;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

const Row = styled.div`
  display: flex;
`

const Avatar = styled.div`
  width: 51px;
  height: 51px;
  background: #d8d8d8;
  border-radius: 100%;
  margin-left: 33px;
`

const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <img src={BanksyLogo} alt="banksy" style={{ width: '166px' }} />
      <Row>
        <ConnectButton>Connect </ConnectButton>
        <Avatar />
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
