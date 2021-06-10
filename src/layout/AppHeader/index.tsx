import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/homePageImg/banksy-logo.png'
import { Button } from 'antd'
import Wallet from '../../components/Wallet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'

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

const headerAvatar = [
  'linear-gradient(to bottom, #5352ed, #3742fa)',
  'linear-gradient(to bottom, #eccc68, #ffa502)',
  'linear-gradient(to bottom, #f8a5c2, #f78fb3)',
  'linear-gradient(to bottom, #786fa6, #574b90)',
  'linear-gradient(to bottom, #cf6a87, #c44569)',
  'linear-gradient(to bottom, #596275, #303952)',
  'linear-gradient(to bottom, #ff7675, #d63031)',
  'linear-gradient(to bottom, #a29bfe, #6c5ce7)',
  'linear-gradient(to bottom, #81ecec, #00cec9)',
  'linear-gradient(to bottom, #55efc4, #00b894)'
]
const random = parseInt(String(10 * Math.random()))

const backgroundColor = headerAvatar[random]

const AppHeader = () => {
  const history = useHistory()
  const account = useSelector(getAccount)

  return (
    <AppHeaderContainer>
      <img src={BanksyLogo} alt="banksy" style={{ width: '12.6rem' }} />
      <Row>
        <ConnectButton>
          <Wallet />
        </ConnectButton>
        <Avatar onClick={() => history.push('/personal/home')} style={{ background: `${backgroundColor}` }} />
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
