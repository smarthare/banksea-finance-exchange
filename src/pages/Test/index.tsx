import React, { useCallback, useEffect } from 'react'
import { useWeb3EnvContext } from '../../contexts/Web3EnvProvider'
import { BN, web3 as solanaWeb3 } from '@project-serum/anchor'
import { banksyWeb3 } from '../../BanksyWeb3'
import Web3 from 'web3'
import { Button } from 'antd'
import { ethers } from 'ethers'

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

  const user1 = solanaWeb3.Keypair.generate()
  const nftKey = solanaWeb3.Keypair.generate()

  const program = banksyWeb3.sol.Banksy!
  const userAccount = await program.account.userAccount.associatedAddress(user1.publicKey, nftKey.publicKey)
  await banksyWeb3.sol.Banksy!.rpc.createNft(str2Bytes(uri), supply, {
    accounts: {
      nft: nftKey.publicKey,
      authority: user1.publicKey,
      user: userAccount,
      payer: program.provider.wallet.publicKey,
      systemProgram: solanaWeb3.SystemProgram.programId,
      rent: solanaWeb3.SYSVAR_RENT_PUBKEY
    },
    signers: [nftKey, user1],
    instructions: [await program.account.nftAccount.createInstruction(nftKey)]
  })
}

const web3 = new Web3(Web3.givenProvider)

async function HashAsset(asset: any) {
  return (await web3.utils.keccak256(await web3.eth.abi.encodeParameter({
    'Asset': {
      'settleType': 'uint256',
      'baseAsset': {
        'code': {
          'baseType': 'uint256',
          'extraType': 'uint256',
          'contractAddr': 'address'
        },
        'value': 'uint256'
      },
      'extraValue': 'uint256'
    }
  }, asset)))

}

async function HashOrder(order: any) {
  const origin = {
    dir: order.dir,
    maker: order.maker,
    makerAssetHash: await HashAsset(order.makerAsset),
    taker: order.taker,
    takerAssetHash: await HashAsset(order.takerAsset),
    fee: order.fee,
    feeRecipient: order.feeRecipient,
    startTime: order.startTime,
    endTime: order.endTime,
    salt: order.salt
  }

  return (await web3.utils.keccak256(await web3.eth.abi.encodeParameter({
    'Order': {
      'dir': 'uint256',
      'maker': 'address',
      'makerAssetHash': 'bytes32',
      'taker': 'address',
      'takerAssetHash': 'bytes32',
      'fee': 'uint256',
      'feeRecipient': 'address',
      'startTime': 'uint256',
      'endTime': 'uint256',
      'salt': 'uint256'
    }
  }, origin)))
}

const TestPage: React.FC = () => {
  const { providerInitialized } = useWeb3EnvContext()

  const sign = async () => {
    const testSellOrder = {
      'dir': 0,
      'maker': '0x4b371Ac08AEb71944B14862E1Ead8CFaA171f3cE',
      'makerAsset': {
        'settleType': 0,
        'baseAsset': {
          'code': {
            'baseType': 1,
            'extraType': 147,
            'contractAddr': '0xb1e45866BF3298A9974a65577c067C477D38712a'
          }, 'value': 1
        },
        'extraValue': 0
      },
      'taker': '0x0000000000000000000000000000000000000000',
      'takerAsset': {
        'settleType': 0,
        'baseAsset': {
          'code': {
            'baseType': 1,
            'extraType': 0,
            'contractAddr': '0x0000000000000000000000000000000000000000'
          }, 'value': '8'
        },
        'extraValue': 0
      },
      'fee': 0,
      'feeRecipient': '0x0000000000000000000000000000000000000000',
      'startTime': 0,
      'endTime': 0,
      'salt': 1625038314
    }

    const data = await HashOrder(testSellOrder)

    const signByPrivateKey = (await web3.eth.accounts.sign(data, '820eab5ed9d7b5204a1e9fe30bf3ee038dc73ffbf4a4e589f103e67aa86372eb')).signature
    const signByEthersSigner = await banksyWeb3.signer?.signMessage(ethers.utils.arrayify(data))

    console.log('signByPrivateKey', signByPrivateKey)
    console.log('signByEthersSigner', signByEthersSigner)

    console.log('signByEthersSigner recovered address',
      ethers.utils.recoverAddress(
        ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(data))),
        signByEthersSigner!
      )
    )
  }

  const fetch = useCallback(async () => {
    // const connection = new Connection('https://api.devnet.solana.com')
    // const ownerPubKey = new PublicKey('8tqMgHc8WLtHyc5eRjMTZfqHuGfTCa2G2zHjsMQxBwrB')
    // const mintPubKey = new PublicKey('2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8')
    //
    // const { value } = await connection.getTokenAccountsByOwner(ownerPubKey, { mint: mintPubKey })
    // console.log(value[0].pubkey.toBase58())
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div>
      {
        providerInitialized && (
          <>
            <h1>
              Provider Has Been Initialized!
            </h1>
            <button onClick={testCreateNftAccount}>Create NFT Account</button>
            <Button onClick={sign}>Sign</Button>
          </>
        )
      }
    </div>
  )
}

export default TestPage
