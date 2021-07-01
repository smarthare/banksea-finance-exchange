import React, { useCallback, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'
import styled from 'styled-components'
import { sellOrder } from '../utils/banksyNftList'
import { banksyWeb3 } from '../BanksyWeb3'
import { keccak256 } from 'web3-utils'
import Web3 from 'web3'
import { ethers } from 'ethers'

const SellingModal = styled(Modal)`
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

  .checkout-list {

    .checkout-list-title {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }

    .sellMethodButton {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      margin-bottom: 3.6rem;

      Button {
        width: 12.6rem;
        height: 5rem;
        background: #E0DDF6;
        border: none;
        border-radius: 1rem;
        color: #7C6DEB;
      }

      .tabs__link {
        background-color: #7C6DEB;
        color: #ffffff;
      }
    }
  }

  .sellContent {
    width: 100%;
    display: none;

    .hightest {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }

    .fixedPrice {
      width: 100%;
      display: flex;
      align-items: center;

      .ant-input-group {
        width: 60%;
      }

      .ant-select-selector {
        height: 5rem;
        display: flex;
        align-items: center;
        color: #7C6DEB;
        background: #E5E2FB !important;
        border-top: 1px solid #7C6DEB;
        border-left: 1px solid #7C6DEB;
        border-bottom: 1px solid #7C6DEB;
      }

      .ant-input-group.ant-input-group-compact > *:first-child, .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }

      .ant-input {
        width: 130% !important;
        height: 5rem;
        color: #7C6DEB;
        background: #E5E2FB !important;
        border-top: 1px solid #7C6DEB;
        border-right: 1px solid #7C6DEB;
        border-bottom: 1px solid #7C6DEB;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }

      span {
        color: #7C6DEB;
      }
    }

    .listing {
      width: 100%;
      height: 5rem;
      margin-top: 4rem;
      background: #7C6DEB;
      border: none;
      color: #ffffff;
      border-radius: 1rem;
      font-size: 1.8rem;
    }
  }

  .sellContent.active {
    display: block;
  }

  .checkout-detail {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .ntf-info {
      display: flex;

      .nft-image {
        width: 7.1rem;
        height: 7.1rem;
        background: #D8D8D8;
      }

      .nft-detail {
        margin-left: 2.4rem;
        align-self: center;

        .artist-name {
          font-size: 1.8rem;
          font-weight: 500;
          color: #7C6DEB;
          line-height: 2.5rem;
        }

        .nft-name {
          font-size: 1.8rem;
          font-weight: 550;
          line-height: 2.5rem;
        }
      }
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.5rem;
        width: 7.1rem;
      }

      .nft-price-dollar {
        font-size: 1.4rem;
        font-weight: 500;
        color: #999999;
        line-height: 20px;
        width: 7.1rem;
      }
    }
  }

  .total-price {
    display: flex;
    justify-content: space-between;

    .total {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        font-size: 2.2rem;
        font-weight: 500;
        color: #7C6DEB;
        line-height: 3rem;
        width: 9.1rem;
      }

      .nft-price-dollar {
        font-size: 1.8rem;
        font-weight: 500;
        color: #999999;
        line-height: 2.5rem;
        width: 9.1rem;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 3.3rem;

    .ant-btn {
      width: 16.1rem;
      height: 5rem;
      background: #7C6DEB;
      border-radius: 1rem;
    }

    .ant-btn > span {
      font-size: 1.8rem;
      font-weight: 550;
      color: #FFFFFF;
    }
  }
`

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 6rem;

  .text {
    width: 54.6rem;
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #7c6deb;
    line-height: 2.5rem;
    padding-top: 4.4rem;
  }

  .text2 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #7c6deb;
    line-height: 2.5rem;
    padding-top: 5rem;
  }
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #DCDCDC;
`

const AuctionItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

`

type MessageHintProps = {
  message: string,
  type?: 'error' | 'hint' | 'success'
}

const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': 'red',
    'success': 'rgb(82,196,26)',
    'hint': '#7c6deb'
  }[type] : ''

  return (
    <p style={{ fontSize: '1.2rem', color }}>
      {message}
    </p>
  )
}

const SellModal: React.FC<any> = ({ visible, onCancel, data, account, init }) => {
  const [promised, setPromised] = useState(false)

  const [current, setcurrent] = useState(0)

  const [dateNow, setDateNow] = useState<any>()

  const [form] = Form.useForm()

  const [price, setPrice] = useState<any>()

  const [hintMessage, setHintMessage] = useState<MessageHintProps>({
    message: '', type: 'hint'
  })

  const clickTabs = useCallback((item, key) => {
    setcurrent(key)
  }, [])

  const tabs = ['Fixed price', 'Auction', 'Spliting', 'Mortgage']

  const formInitialValues = {
    price: ''
  }


  const listing = async () => {
    if (!promised) {
      setHintMessage({
        message: 'Please check the checkbox first!',
        type: 'error'
      })
      return
    } else {
      form
        .validateFields()
        .then(async values => {

          await banksyWeb3.eth.Banksy.isApprovedForAll(account, '0x928Fd76a5C287D7A334fdfb7DbAE91422Dabd98A').then(res => {
            if (res === false) {
              banksyWeb3.eth.Banksy.setApprovalForAll('0x928Fd76a5C287D7A334fdfb7DbAE91422Dabd98A', true)
            }
          })

          const dateNow = (Date.parse(new Date().toString())) / 1000

          const order = {
            dir: 0,
            maker: account,
            makerAsset: {
              settleType: 0,
              baseAsset: {
                code: {
                  baseType: 3,
                  extraType: data?.tokenId,
                  contractAddr: '0xb1e45866BF3298A9974a65577c067C477D38712a'
                },
                value: 1
              },
              extraValue: 0
            },
            taker: '0x0000000000000000000000000000000000000000',
            takerAsset: {
              settleType: 0,
              baseAsset: {
                code: {
                  baseType: 1,
                  extraType: 0,
                  contractAddr: '0x0000000000000000000000000000000000000000'
                },
                value: values?.price
              },
              extraValue: 0
            },
            fee: 0,
            feeRecipient: '0x0000000000000000000000000000000000000000',
            startTime: 0,
            endTime: 0,
            salt: dateNow,
          }

          const HashMakerAsset = await keccak256(new Web3().eth.abi.encodeParameter({
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
          }, order.makerAsset))

          const HashTakerAsset = await keccak256(new Web3().eth.abi.encodeParameter({
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
          }, order.takerAsset))

          const origin = {
            dir: order.dir,
            maker: order.maker,
            makerAssetHash: HashMakerAsset,
            taker: order.taker,
            takerAssetHash: HashTakerAsset,
            fee: order.fee,
            feeRecipient: order.feeRecipient,
            startTime: order.startTime,
            endTime: order.endTime,
            salt: order.salt,
          }

          console.log(JSON.stringify(order))

          const hashOrder = await keccak256(new Web3().eth.abi.encodeParameter({
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
              'salt': 'uint256',
            }
          }, origin))

          const signature = await banksyWeb3.signer!.signMessage(ethers.utils.arrayify(hashOrder))

          console.log(signature)

          const sellingOrder = {
            dir: 'sell',
            maker: account,
            makerAssetSettleType: 0,
            makerAssetBaseType: 3,
            makerAssetExtraType: data?.tokenId,
            makerAssetContractAddr: data?.addressContract,
            makerAssetValue: values.price,
            makerAssetExtraValue: 0,
            fee: 0,
            feeRecipient: 0,
            startTime: 0,
            endTime: 0,
            signature: signature,
            salt: dateNow,
            valueUri: data?.valueUri
          }

          await sellOrder(sellingOrder).then(() => {
            init()
            onCancel()
          }).catch(err => err)
        })
    }
  }

  return (
    <SellingModal title="Selling"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="checkout-list">
        <div className="checkout-list-title">Sell Method</div>
        <div className="sellMethodButton">
          {
            tabs.map((item: any, i: number) => {
              return (
                // @ts-ignore
                <Button className={i === current && 'tabs__link'}
                  onClick={() => clickTabs(item, i)}
                  key={i}
                >
                  {item}
                </Button>
              )
            })
          }
        </div>
      </div>
      <div className={'sellContent ' + (current === 0 ? 'active' : '')}>
        <p className="hightest">Set Price</p>
        <Form form={form} initialValues={formInitialValues}>
          <div className="fixedPrice">
            <Input.Group compact>
              <Select defaultValue="ETH">
                <Select.Option value="ETH">
                  ETH
                </Select.Option>
                <Select.Option value="ERC20">
                  ERC20
                </Select.Option>
              </Select>
              <Form.Item name="price">
                <Input style={{ width: '50%' }} defaultValue="" />
              </Form.Item>
            </Input.Group>
          </div>
          <Button className="listing" onClick={listing}>Listing</Button>
        </Form>
        <MessageHint {...hintMessage} />
        <Announcement>
          <Checkbox
            checked={promised}
            onChange={e => setPromised(e.target.checked)}
          >
            <div className="text">
              Listing is free! At the time of the sale, the following fees will be decucted.
            </div>
          </Checkbox>
          <div className="text">Total fees ----------------------------------------------------------- 2%</div>
        </Announcement>
      </div>

      <div className={'sellContent ' + (current === 1 ? 'active' : '')}>
        <p className="hightest">Highest Bid</p>
        <Line />
        <div>
          <AuctionItem>
            <div className="auctionItemLeft">
              <div>Minimum Bid</div>
              <div>
                <span>Set your starting price.</span>
                <span>Learn more</span>
              </div>
            </div>
          </AuctionItem>
        </div>
      </div>
    </SellingModal>
  )
}

export default SellModal
