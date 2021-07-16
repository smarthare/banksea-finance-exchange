import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import MarketPage from './Market'
import { useWalletSelectionModal } from '../../contexts/WalletSelectionModal'
import MyDashboardPage from './MyDashboard'
import { useWeb3EnvContext } from '../../contexts/Web3EnvProvider'
import DepositPage from './Deposit'
import StakePage from './Stake'
import BorrowPage from './Borrow'
import coding from '../../assets/images/mockImg/coding.png'
import LiquidationListPage from './Liquidation'
import { Route, Switch, useHistory } from 'react-router-dom'
import DepositItemDetailPage from './Detail/DepositItemDetail'
import MortgagePoolDetailPage from './Detail/MortgagePoolDetail'
import DepositPoolDetailPage from './Detail/DepositPoolDetail'
import { useSelector } from 'react-redux'
import { getAccount } from '../../store/wallet'
import { poolsConnect } from '../../apis/pool'
import NFTMortgageDetailPage from './Detail/NFTMortgageDetail'
// import BorrowItemDetailPage from './Detail/BorrowItemDetail'
import AvailablePurchasePage from './Detail/AvailablePurchase'

export type PoolPageKeys =
  | 'market'
  | 'dashboard'
  | 'deposit'
  | 'borrow'
  | 'liquidation'
  | 'stake'
  | 'deposit/detail/:id'
  | 'mortgage/detail'
  | 'market/deposit/pool/:id'
  | 'liquidation/detail'
  | 'borrow/detail/:id'
  | 'available/detail/:uri'

// eslint-disable-next-line no-unused-vars
const PAGE_BY_PAGE_KEYS: { [key in PoolPageKeys]?: JSX.Element } = {
  'market': <MarketPage />,
  'dashboard': <MyDashboardPage />,
  'deposit': <DepositPage />,
  'borrow': <BorrowPage />,
  'liquidation': <LiquidationListPage />,
  'stake': <StakePage />,
  'deposit/detail/:id': <DepositItemDetailPage />,
  'mortgage/detail': <MortgagePoolDetailPage />,
  'market/deposit/pool/:id': <DepositPoolDetailPage />,
  'liquidation/detail': <NFTMortgageDetailPage />,
  // 'borrow/detail/:id': <BorrowItemDetailPage />,
  'available/detail/:uri': <AvailablePurchasePage />
}

// eslint-disable-next-line no-unused-vars
const MENU_BY_PAGE_KEYS: { [key in PoolPageKeys]?: string } = {
  'market': 'MARKET',
  'dashboard': 'MY DASHBOARD',
  'deposit': 'DEPOSIT',
  'borrow': 'BORROW',
  'liquidation': 'LIQUIDATION',
  'stake': 'STAKE'
}

const DEFAULT_ACTIVE_PAGE_KEY = 'market'

const PoolsContainer = styled.div`
  min-height: 100vh;
  position: relative;

  .coding {
    width: 15rem;
    position: absolute;
    top: 6rem;
    right: 0;
    z-index: 1;
  }
`

const PoolsContainerMenu = styled.div`
  width: calc(100% - 20.2rem);
  height: 6rem;
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

const PoolsPage: React.FC = () => {
  const history = useHistory()

  const moduleName = history.location.pathname.replace('/pools/', '').replace(/\/.+/, '')

  const { providerInitialized } = useWeb3EnvContext()

  const { open: openWalletSelectionModal } = useWalletSelectionModal()

  const account = useSelector(getAccount)

  const init = useCallback(() => {
    if (!providerInitialized) {
      openWalletSelectionModal()
    } else {
      poolsConnect({ walletAddress: account })
    }
  }, [providerInitialized])

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (history.location.pathname === '/pools/*') {
      history.push(`/pools/${DEFAULT_ACTIVE_PAGE_KEY}`)
    }
  }, [history])

  return (
    <PoolsContainer>
      <img className="coding" src={coding} alt="" />
      <PoolsContainerMenu>
        <div className="container-menu-main">
          {
            Object.entries(MENU_BY_PAGE_KEYS).map(([key, value]) => (
              <div
                className={clsx('container-menu-item', moduleName === key && 'tabs__link')}
                onClick={() => {
                  history.push(`/pools/${key}`)
                }}
                key={key}
              >
                {value}
              </div>
            ))
          }
        </div>
      </PoolsContainerMenu>

      <Switch>
        {
          Object.entries(PAGE_BY_PAGE_KEYS).map(([key, page]) => (
            <Route path={`/pools/${key}`} exact key={key}>
              {page}
            </Route>
          ))
        }
      </Switch>
    </PoolsContainer>
  )
}

export default PoolsPage
