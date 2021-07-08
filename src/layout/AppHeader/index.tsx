import React from 'react'
import styled from 'styled-components'
import BanksyLogo from '@/assets/images/homePageImg/banksy-logo.svg'
import { Button, Popover } from 'antd'
import Wallet from '../../components/Wallet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { QuestionCircleFilled } from '@ant-design/icons'
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
import UserAvatar from '../../assets/images/headAvatar/user-avatar.svg'


const AppHeaderContainer = styled.div`
  background-color: black;
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
    background: #554BFF;
    border-radius: 1rem;
    border-color: #3a31bd;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }

  &:hover,
  &:active {
    background: #3a31bd;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin-left: 3.3rem;
  cursor: pointer;
`

const AvatarNone = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin-left: 3.3rem;
  background: url(${require('../../assets/images/headAvatar/user-avatar.svg').default}) no-repeat;
`

const Vote = styled(Button)`
  width: fit-content;
  height: 3.5rem;
  background: #554BFF;
  border-radius: 1rem;
  border-color: #3a31bd;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-right: 3rem;

  &:hover,
  &:active {

    background: #3a31bd;
  }
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
      <img src={BanksyLogo} alt="banksy" style={{ width: '15.6rem' }} />
      <Row>
        <Vote onClick={() => history.push('/vote')}>
          Voting channel
        </Vote>
        <Popover
          placement="bottom"
          title="Rinkeby Authenticated Faucet"
          content={
            <a href={'https://faucet.rinkeby.io'}
              rel="noreferrer"
              target="_blank"
            >
              https://faucet.rinkeby.io/
            </a>
          }
          trigger="click"
        >
          <QuestionCircleFilled style={{ color: '#7c6deb', fontSize: '2rem', marginRight: '2.5rem' }} />
        </Popover>
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
