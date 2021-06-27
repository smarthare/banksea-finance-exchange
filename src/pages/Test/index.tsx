import React from 'react'
import { useWeb3EnvContext } from '../../contexts/Web3EnvProvider'
import { BN, web3 } from '@project-serum/anchor'
import { banksyWeb3 } from '../../BanksyWeb3'

function str2Bytes(str: string) {
  const bytes = new Array(128).fill(0)
  for (let index = 0; index < str.length; index++) {
    bytes[index] = str.charCodeAt(index)

  }
  return bytes
}

const testCreateNftAccount = async () => {
  const uri = 'ipfs://ipfs/QmVLAo3EQvkkQKjLTt1dawYsehSEnwYBi19vzh85pohpuw'
  const supply = new BN(100)

  const user1 = web3.Keypair.generate()
  const nftKey = web3.Keypair.generate()

  const program = banksyWeb3.sol.Banksy!
  const userAccount = await program.account.userAccount.associatedAddress(user1.publicKey, nftKey.publicKey)
  await banksyWeb3.sol.Banksy!.rpc.createNft(str2Bytes(uri), supply, {
    accounts: {
      nft: nftKey.publicKey,
      authority: user1.publicKey,
      user: userAccount,
      payer: program.provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
      rent: web3.SYSVAR_RENT_PUBKEY
    },
    signers: [nftKey, user1],
    instructions: [await program.account.nftAccount.createInstruction(nftKey)]
  })
}

const TestPage: React.FC = () => {
  const { providerInitialized } = useWeb3EnvContext()

  return (
    <div>
      {
        providerInitialized && (
          <>
            <h1>
              Provider Has Been Initialized!
            </h1>
            <button onClick={testCreateNftAccount}>Create NFT Account</button>
          </>
        )
      }
    </div>
  )
}

export default TestPage
