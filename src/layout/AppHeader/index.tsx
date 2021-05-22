import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/banksy-logo.png'
import { Button } from 'antd'

const AppHeaderContainer = styled.div`
  background-color: white;
  height: 8.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
`

const ConnectButton = styled(Button)`
  width: 14.6rem;
  height: 5rem;
  background: #7c6deb;
  border-radius: 25px;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`

const Row = styled.div`
  display: flex;
`

const Avatar = styled.div`
  width: 5.1rem;
  height: 5.1rem;
  background: #d8d8d8;
  border-radius: 100%;
  margin-left: 3.3rem;
`

const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <img src={BanksyLogo} alt="banksy" style={{ width: '16.6rem' }} />
      <Row>
        <ConnectButton>Connect </ConnectButton>
        <Avatar />
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
