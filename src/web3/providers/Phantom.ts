import { PublicKey, Transaction } from '@solana/web3.js'

type PhantomEvent = 'disconnect' | 'connect'

type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signTransaction'
  | 'signAllTransactions'

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  autoApprove: boolean | null;
  signTransaction: (_transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (_transactions: Transaction[]) => Promise<Transaction[]>;
  connect: (_opts?: Partial<{ onlyIfTrusted: boolean }>) => Promise<void>;
  disconnect: () => Promise<void>;
  on: (_event: PhantomEvent, _handler: (_args: any) => void) => void;
  request: (_method: PhantomRequestMethod, _params: any) => Promise<any>;
}

const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

export const getPhantomProvider = async (): Promise<PhantomProvider | undefined> => {
  let retry = 3

  while (retry--) {
    if ('solana' in window) {
      const { solana } = (window as any)
      if (solana.isPhantom) {
        return solana
      }
    } else {
      await sleep(1000)
    }
  }
}
