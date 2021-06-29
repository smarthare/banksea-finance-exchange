import { Program, Provider } from '@project-serum/anchor'
import { Connection } from '@solana/web3.js'
import { PhantomProvider } from '../../types/Phantom'

export class BanksySolanaWeb3 {

  provider?: Provider

  Banksy?: Program

  constructor(phantomProvider?: PhantomProvider) {
    if (phantomProvider) {
      this.provider = new Provider(new Connection('https://api.devnet.solana.com'), phantomProvider, {})

      this.Banksy = new Program(require('./idls/Banksy.json'), '7x8qYd4dNg4yWSdcKpUCaruJntvgS9ieA5M6JRzeJ5KX', this.provider)
    }
  }
}
