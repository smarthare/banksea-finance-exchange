import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount, getSelectedWallet, setAccount, setSelectedWallet } from '../../store/wallet'
import { Button, Modal } from 'antd'
// @ts-ignore
import Jazzicon from 'jazzicon'
import { getWeb3ProviderByWallet, WalletNames } from '../../web3/wallets'
import WalletConnectProvider from '@walletconnect/web3-provider'
import styled from 'styled-components'
import { useWalletSelectionModal } from '../../contexts/WalletSelectionModal'

type CurrentAccountProps = {
  account: string
}

type WalletModalContentProps = {
  account: string
}

const SCCurrentAccount = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 1.2rem;
  }

`
const WalletModal = styled(Modal)`

  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .walletModal-Title {
    color: #7C6DEB;
    font-weight: bolder;
    font-size: 1.8rem;
  }

  .text-label {
    font-size: 1.7rem;
  }

  .walletModalClose {
    width: 12.6rem;
    height: 4rem;
    background: #7C6DEB;
    border: none;
    border-radius: 1rem;
    color: #ffffff;
    margin-left: calc((100% - 12.6rem) / 2);
    margin-top: 20px;
  }

  .disconnect {
    width: 12.6rem;
    height: 4rem;
    background: #ffffff;
    border: none;
    border-radius: 1rem;
    color: #7C6DEB;
    margin-left: calc((100% - 12.6rem) / 2);
    border: 1px solid #7C6DEB;
    margin-top: 20px;
  }
`

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
          {/*<span className="text-label">View on Explorer</span>*/}
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
      <WalletModal
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
      </WalletModal>
    </SCCurrentAccount>
  )
}

const ConnectToWallet = () => {
  // const [modalVisible, setModalVisible] = useState<boolean>(false)

  const { open } = useWalletSelectionModal()

  return (
    <div className="toAmount">
      <span onClick={open} className="toAmountText">
        Connect
      </span>
      {/*<WalletSelectionModal visible={modalVisible} onClose={() => setModalVisible(false)} />*/}
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
