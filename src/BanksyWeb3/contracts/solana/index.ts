import { Program, Provider } from '@project-serum/anchor'
import { Connection } from '@solana/web3.js'
import { PhantomProvider } from '../../../types/Phantom'

export class BanksySolanaWeb3 {

  provider?: Provider

  Banksy?: Program

  constructor(phantomProvider?: PhantomProvider) {
    if (phantomProvider) {
      this.provider = new Provider(new Connection('https://api.devnet.solana.com'), phantomProvider, {})

      this.Banksy = new Program(require('./idls/Banksy.json'), 'A5ws9phjEaNwrSjzGkRRxH53QDzmaJuQY1xompPpBwXf', this.provider)
    }
  }
}
