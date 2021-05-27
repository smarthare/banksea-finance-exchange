import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/banksy-logo.png'
import { Button } from 'antd'
import Wallet from '../../components/Wallet'

const AppHeaderContainer = styled.div`
  background-color: white;
  height: 8.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
`

const ConnectButton = styled(Button)`
  &,
  &:hover,
  &:active {
    width: fit-content;
    height: 5rem;
    background: #7c6deb;
    border-radius: 25px;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }

  &:hover,
  &:active {
    background: #a399f3;
  }
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
        <ConnectButton>
          <Wallet />
        </ConnectButton>
        <Avatar />
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
