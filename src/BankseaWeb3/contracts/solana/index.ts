import { Program, Provider } from '@project-serum/anchor'
import { Connection } from '@solana/web3.js'
import { PhantomProvider } from '@/types/Phantom'

export class BankseaSolanaWeb3 {

  provider?: Provider

  Banksea?: Program
  Exchange?: Program

  constructor(phantomProvider?: PhantomProvider) {
    if (phantomProvider) {
      this.provider = new Provider(new Connection('https://api.devnet.solana.com'), phantomProvider, {})

      // https://explorer.solana.com/address/A5ws9phjEaNwrSjzGkRRxH53QDzmaJuQY1xompPpBwXf?cluster=devnet
      this.Banksea = new Program(require('./idls/Banksea.json'), 'A5ws9phjEaNwrSjzGkRRxH53QDzmaJuQY1xompPpBwXf', this.provider)
      this.Exchange = new Program(require('./idls/Exchange.json'), '5nibWrtmkx1oUfsZpm24XbkJp1jRAe9do8K7MotuqWZo', this.provider)
    }
  }
}
