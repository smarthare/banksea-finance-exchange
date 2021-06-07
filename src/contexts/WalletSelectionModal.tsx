import React, { useContext, useEffect, useState } from 'react'
import { SUPPORT_WALLETS, useConnectToWallet, Wallet } from '../web3/wallets'
import { Modal } from 'antd'
import { useWeb3EnvContext } from './Web3EnvProvider'
import styled from 'styled-components'

type WalletCardProps = {
  wallet: Wallet
}

const WalletItemContainer = styled.div`
  display: flex;
  margin-left: 7%;
  margin-bottom: 1.5rem;
  width: 86%;
  justify-content: space-between;
  align-items: center;

  border: 0.2rem solid rgba(124,109,235,0.5);
  border-radius: 3rem;
  padding: 1.1rem 2.4rem;
  background: #e5e2fb;
  color: #7c6deb;
  font-size: 1.6rem;
  font-weight: 500;

  img {
    width: 5rem;
    height: 5rem;
  }
`

const CustomModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
  }
`

const WalletSelectionModalContext = React.createContext({
  open: () => {
    return
  }
})

const WalletItem: React.FC<WalletCardProps> = ({ wallet }) => {
  const { name, icon } = wallet

  const { connect } = useConnectToWallet()

  return (
    <WalletItemContainer onClick={() => connect(wallet)}>
      <span className="wallet-name">{name}</span>
      <img className="SelectImg" src={icon} alt="" />
    </WalletItemContainer>
  )
}

const WalletSelectionModalProvider: React.FC = ({ children }) => {
  const { providerInitialized } = useWeb3EnvContext()

  const [visible, setVisible] = useState(false)

  const open = () => setVisible(true)

  const close = () => setVisible(false)

  useEffect(() => {
    if (providerInitialized) {
      close()
    }
  }, [providerInitialized])

  return (
    <WalletSelectionModalContext.Provider value={{ open }}>
      {children}
      <CustomModal title="Connect To Wallet" visible={visible} footer="" onCancel={close}>
        {SUPPORT_WALLETS.map(wallet => (
          <WalletItem wallet={wallet} key={wallet.name} />
        ))}
      </CustomModal>
    </WalletSelectionModalContext.Provider>
  )
}

const useWalletSelectionModal = () => {
  return useContext(WalletSelectionModalContext)
}

export { WalletSelectionModalProvider, useWalletSelectionModal }
