import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import MarkePage from './Market'
import { useWalletSelectionModal } from '../../contexts/WalletSelectionModal'
import MyDashboardPage from './MyDashboard'
import { useWeb3EnvContext } from '../../contexts/Web3EnvProvider'
import DepositPage from './Deposit'
import StakePage from './Stake'
import BorrowPage from './Borrow'
import MortgagePage from './Mortgage'
import coding from '../../assets/images/mockImg/coding.png'

const PoolsContainer = styled.div`
  min-height: 100vh;
  position: relative;

  .coding {
    width: 15rem;
    position: absolute;
    top: 3rem;
    right: 0;
  }
`

const PoolsContainerMenu = styled.div`
  width: calc(100% - 20.2rem);
  height: 4rem;
  background: #0D1B34;
  border-bottom: 1px solid #4D4E52;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9;

  .container-menu-main {
    width: 70rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bolder;

    .container-menu-item {
      color: #9EA0A3;
      cursor: pointer;
    }

    .tabs__link {
      color: #554BFF;
    }
  }
`

const PoolsPage:React.FC = () => {

  const { providerInitialized } = useWeb3EnvContext()

  const { open: openWalletSelectionModal } = useWalletSelectionModal()

  const [current, setCurrent] = useState<number>(0)


  const menuTabs = ['MARKET', 'MY DASHBOARD', 'DEPOSIT', 'BORROW', 'MORTGAGES', 'STAKE']

  const init = useCallback(() => {
    if (current === 1) {
      if (!providerInitialized) {
        openWalletSelectionModal()
      }
    }
  },[current])

  useEffect(() => {
    init()
  },[init])

  return (
    <PoolsContainer>
      <img className="coding" src={coding} alt="" />
      <PoolsContainerMenu>
        <div className="container-menu-main">
          {
            menuTabs.map((item: string, index) => (
              <div
                className={clsx('container-menu-item', current === index && 'tabs__link')}
                onClick={() => setCurrent(index)}
                key={index}
              >
                {item}
              </div>
            ))
          }
        </div>
      </PoolsContainerMenu>
      <MarkePage current={current} />
      <MyDashboardPage current={current} providerInitialized={providerInitialized} />
      <DepositPage current={current} />
      <StakePage current={current} />
      <BorrowPage current={current} setCurrent={setCurrent} />
      <MortgagePage current={current} />
    </PoolsContainer>
  )
}

export default PoolsPage
