import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount, getSelectedWallet, setAccount, setSelectedWallet } from '../../store/wallet'
import { Button, Modal } from 'antd'
import WalletSelectionModal from './WalletSelectionModal'
// @ts-ignore
import Jazzicon from 'jazzicon'
import { getWeb3ProviderByWallet, WalletNames } from '../../web3/wallets'
import WalletConnectProvider from '@walletconnect/web3-provider'
import styled from 'styled-components'

type CurrentAccountProps = {
  account: string
}

type WalletModalContentProps = {
  account: string
}

const WalletModalContent: React.FC<WalletModalContentProps> = ({ account }) => {
  const dispatch = useDispatch()
  const selectedWallet = useSelector(getSelectedWallet) as WalletNames

  const disconnect = async () => {
    dispatch(setSelectedWallet(null))
    dispatch(setAccount(null))

    if (selectedWallet === 'WalletConnect') {
      const chainId: number = parseInt(process.env.CHAIN_ID!, 16)
      const RPCUrl: string = process.env.RPC_URL!
      const provider = await getWeb3ProviderByWallet({ chainId, RPCUrl }, selectedWallet)
      const walletConnectProvider = provider?.provider as WalletConnectProvider
      walletConnectProvider.disconnect()
    }
  }

  return (
    <div className="wallet-modal-content">
      <div className="walletModal-Title">{account}</div>
      <div className="bscScan">
        <div>
          <span className="text-label">View on Explorer</span>
        </div>
        <Button type="text" onClick={disconnect} className="disconnect">
          Disconnect
        </Button>
      </div>
    </div>
  )
}

const MetamaskIcon: React.FC = () => {
  const ref = useRef<HTMLDivElement>()
  const account = useSelector(getAccount)

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(26, parseInt(account.slice(2, 10), 26)))
    }
  }, [account])

  return <div ref={ref as any} style={{ width: '26px', height: '26px' }} />
}

const SCCurrentAccount = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 1.2rem;
  }
`

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <SCCurrentAccount>
      <div className="icon">
        <MetamaskIcon />
      </div>
      <span onClick={() => setIsModalVisible(true)}>{`${account.substr(0, 5)}...${account.substr(-4, 4)}`}</span>
      <Modal
        style={{ top: 20 }}
        wrapClassName="wallet-modal-wrapper"
        closable={false}
        maskClosable={false}
        title="Your Wallet"
        visible={isModalVisible}
        footer={null}
      >
        <WalletModalContent account={account} />
        <Button className="walletModalClose" onClick={closeModal}>
          Close
        </Button>
      </Modal>
    </SCCurrentAccount>
  )
}

const ConnectToWallet = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  return (
    <div className="toAmount">
      <span onClick={() => setModalVisible(true)} className="toAmountText">
        Connect
      </span>
      <WalletSelectionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  )
}

const Wallet: React.FC = () => {
  const account = useSelector(getAccount)

  return (
    <div className="wallet">
      {!account && <ConnectToWallet />}
      {!!account && <CurrentAccount account={account} />}
    </div>
  )
}

export default Wallet
