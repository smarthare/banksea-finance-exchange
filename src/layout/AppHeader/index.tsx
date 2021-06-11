import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/homePageImg/banksy-logo.png'
import { Button } from 'antd'
import Wallet from '../../components/Wallet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import avatar1 from '../../assets/images/headAvatar/avatar1.png'
import avatar2 from '../../assets/images/headAvatar/avatar2.png'
import avatar3 from '../../assets/images/headAvatar/avatar3.png'
import avatar4 from '../../assets/images/headAvatar/avatar4.png'
import avatar5 from '../../assets/images/headAvatar/avatar5.png'
import avatar6 from '../../assets/images/headAvatar/avatar6.png'
import avatar7 from '../../assets/images/headAvatar/avatar7.png'
import avatar8 from '../../assets/images/headAvatar/avatar8.png'
import avatar9 from '../../assets/images/headAvatar/avatar9.png'
import avatar10 from '../../assets/images/headAvatar/avatar10.png'

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

const Avatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin-left: 3.3rem;
  cursor: pointer;
`

const AvatarNone = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin-left: 3.3rem;
  background: #c8d6e5;
`

const AppHeader = () => {
  const history = useHistory()
  const account = useSelector(getAccount)
  const headerAvatar = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10
  ]
  const random = parseInt(String(10 * Math.random()))

  const headerImg = headerAvatar[random]

  const toPersonalPage = () => {
    history.push('/personal/home',
      { headerImg: headerImg }
    )
  }

  return (
    <AppHeaderContainer>
      <img src={BanksyLogo} alt="banksy" style={{ width: '12.6rem' }} />
      <Row>
        <ConnectButton>
          <Wallet />
        </ConnectButton>
        {account?
          <Avatar onClick={toPersonalPage} src={`${headerImg}`} />:
          <AvatarNone />}
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
