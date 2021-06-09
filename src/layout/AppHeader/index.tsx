import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/homePageImg/banksy-logo.png'
import { Button } from 'antd'
import Wallet from '../../components/Wallet'
import { useHistory } from 'react-router-dom'

const AppHeaderContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 6.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
  border-bottom: 2px solid rgba(133, 133, 133, 0.1)
`

const ConnectButton = styled(Button)`
  &,
  &:hover,
  &:active {
    width: fit-content;
    height: 3.5rem;
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
  width: 3.5rem;
  height: 3.5rem;
  background: #d8d8d8;
  border-radius: 100%;
  margin-left: 3.3rem;
`

const AppHeader = () => {
  const history = useHistory()
  return (
    <AppHeaderContainer>
      <img src={BanksyLogo} alt="banksy" style={{ width: '12.6rem' }} />
      <Row>
        <ConnectButton>
          <Wallet />
        </ConnectButton>
        <Avatar onClick={() => history.push('/personal/home')} />
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
