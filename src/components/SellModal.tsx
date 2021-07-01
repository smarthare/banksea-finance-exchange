import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'
import styled from 'styled-components'
import { sellOrder } from '../utils/banksyNftList'
import { banksyWeb3 } from '../BanksyWeb3'
import { ethers } from 'ethers'
import clsx from 'clsx'
import { toWei } from '../web3/utils'
import { ExchangeOrder, ExchangeOrderAsset, SellingOrder } from '../BanksyWeb3/ethereum/services/exchange/types'
import { hashExchangeOrder, hashExchangeOrderAsset } from '../BanksyWeb3/ethereum/services/exchange/utils'
import { useSelector } from 'react-redux'
import { getAccount } from '../store/wallet'

type MessageHintProps = {
  message: string,
  type?: 'error' | 'hint' | 'success'
}

type SellModalProps = {
  visible: boolean,
  onCancel: () => void,
  data: any,
  init: () => void
}

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
        font-size: 1.8rem;
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

const SellModal: React.FC<SellModalProps> = ({ visible, onCancel, data, init }) => {
  const account = useSelector(getAccount)

  const [checked, setChecked] = useState(false)

  const [current, setCurrent] = useState(0)

  const formInitialValues = {
    price: ''
  }

  const [form] = Form.useForm<typeof formInitialValues>()

  const [hintMessage, setHintMessage] = useState<MessageHintProps>({
    message: '', type: 'hint'
  })

  const tabs = ['Fixed price', 'Auction', 'Spliting', 'Mortgage']

  const checkCheckbox = () => new Promise<void>((resolve, reject) => {
    if (!checked) {
      setHintMessage({
        message: 'Please check the checkbox first!',
        type: 'error'
      })
      reject()
    }
    resolve()
  })

  const handleListing = async (values: typeof formInitialValues) => {
    if (!await banksyWeb3.eth.Banksy.isApprovedForAll(account!, '0x928Fd76a5C287D7A334fdfb7DbAE91422Dabd98A')) {
      banksyWeb3.eth.Banksy.setApprovalForAll('0x928Fd76a5C287D7A334fdfb7DbAE91422Dabd98A', true)
    }

    const salt = (Date.parse(new Date().toString())) / 1000

    const price = toWei(values.price)

    const makerAsset: ExchangeOrderAsset = {
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
    }

    const takerAsset: ExchangeOrderAsset = {
      settleType: 0,
      baseAsset: {
        code: {
          baseType: 1,
          extraType: 0,
          contractAddr: '0x0000000000000000000000000000000000000000'
        },
        value: price
      },
      extraValue: 0
    }

    const order: ExchangeOrder = {
      dir: 0,
      maker: account!,
      makerAssetHash: hashExchangeOrderAsset(makerAsset),
      taker: '0x0000000000000000000000000000000000000000',
      takerAssetHash: hashExchangeOrderAsset(takerAsset),
      fee: 0,
      feeRecipient: '0x0000000000000000000000000000000000000000',
      startTime: 0,
      endTime: 0,
      salt
    }

    const signature = await banksyWeb3.signer!.signMessage(ethers.utils.arrayify(hashExchangeOrder(order)))

    const sellingOrder: SellingOrder = {
      dir: 'sell',
      maker: account,
      makerAssetSettleType: 0,
      makerAssetBaseType: 3,
      makerAssetExtraType: data!.tokenId,
      makerAssetContractAddr: data!.addressContract,
      makerAssetValue: values.price,
      makerAssetExtraValue: 0,
      fee: 0,
      feeRecipient: 0,
      startTime: 0,
      endTime: 0,
      valueUri: data!.valueUri,
      signature,
      salt
    }

    await sellOrder(sellingOrder)
    init()
    onCancel()
  }

  const onListingButtonClicked = async () => {
    checkCheckbox()
      .then(() => form.validateFields())
      .then(handleListing)
  }

  return (
    <SellingModal
      title="Selling"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="checkout-list">
        <div className="checkout-list-title">Sell Method</div>
        <div className="sellMethodButton">
          {
            tabs.map((item: string, index: number) => (
              <Button
                className={clsx(index === current && 'tabs__link')}
                onClick={() => setCurrent(index)}
                key={index}
              >
                {item}
              </Button>
            ))
          }
        </div>
      </div>
      <div className={clsx('sellContent', current === 0 && 'active')}>
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
          <Button className="listing" onClick={onListingButtonClicked}>Listing</Button>
        </Form>
        <MessageHint {...hintMessage} />
        <Announcement>
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
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
