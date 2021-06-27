import { PublicKey, Transaction } from '@solana/web3.js'

export type PhantomEvent = 'disconnect' | 'connect'

export type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signTransaction'
  | 'signAllTransactions'

export interface PhantomProvider {
  publicKey: PublicKey;
  isConnected: boolean | null;
  autoApprove: boolean | null;
  signTransaction: (_transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (_transactions: Transaction[]) => Promise<Transaction[]>;
  connect: (_opts?: Partial<{ onlyIfTrusted: boolean }>) => Promise<void>;
  disconnect: () => Promise<void>;
  on: (_event: PhantomEvent, _handler: (_args: any) => void) => void;
  request: (_method: PhantomRequestMethod, _params: any) => Promise<any>;
}
