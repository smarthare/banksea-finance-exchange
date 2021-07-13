import { useSelector } from 'react-redux'
import { getSelectedWallet } from '../store/wallet'
import { WalletNames } from '../web3/wallets'
import { useCallback } from 'react'

function useWalletErrorMessageGetter(): { getWalletErrorMessage: (_e: any) => any } {
  const selectedWallet = useSelector(getSelectedWallet) as WalletNames | undefined

  const getWalletErrorMessage = useCallback((e: any) => {
    if (!selectedWallet) {
      return 'No Wallet Connected'
    } else if (selectedWallet === 'Metamask') {
      const detailMessage = e.data ? ` (${e.data.message})` : ''
      return `${e.message}${detailMessage}`
    } else if (selectedWallet === 'BSC') {
      return e.error
    } else if (selectedWallet === 'WalletConnect') {
      return e.toString()
    } else if (selectedWallet === 'Phantom') {
      return e.toString()
    } else {
      throw new Error('Unknown selected wallet')
    }
  }, [selectedWallet])

  return {
    getWalletErrorMessage: getWalletErrorMessage
  }
}

export { useWalletErrorMessageGetter }
