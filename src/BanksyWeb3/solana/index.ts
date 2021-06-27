import { Program, Provider } from '@project-serum/anchor'
import { Connection } from '@solana/web3.js'
import { PhantomProvider } from '../../types/Phantom'

export class BanksySolanaWeb3 {

  provider?: Provider

  Banksy?: Program

  constructor(phantomProvider?: PhantomProvider) {
    const idl = require('./idls/Banksy.json')

    if (phantomProvider) {
      this.provider = new Provider(new Connection('https://api.devnet.solana.com'), phantomProvider, {})

      const provider = new Provider(new Connection('https://api.devnet.solana.com'), phantomProvider!, {})

      this.Banksy = new Program(idl, '7x8qYd4dNg4yWSdcKpUCaruJntvgS9ieA5M6JRzeJ5KX', provider)
    }
  }
}
