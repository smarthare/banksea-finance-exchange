import React, { useCallback, useState } from 'react'
import { banksyJsConnector } from '../../BanksyJs/banksyJsConnector'
import { Button, Checkbox, Input, Modal, Select } from 'antd'
import styled from 'styled-components'

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

    .hightest {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }
  }

  .sellContent {
    width: 100%;

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
        width: 65% !important;
        height: 5rem;
        color: #7C6DEB;
        background: #E5E2FB !important;
        border-top: 1px solid #7C6DEB;
        border-right: 1px solid #7C6DEB;
        border-bottom: 1px solid #7C6DEB;
      }

      .ant-input-group.ant-input-group-compact > *:last-child, .ant-input-group.ant-input-group-compact > .ant-select:last-child > .ant-select-selector, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:last-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker-focused:last-child .ant-input {
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

const SellModal: React.FC<any> = ({ visible, onCancel, data, account }) => {
  const [promised, setPromised] = useState(false)

  const [hintMessage, setHintMessage] = useState<MessageHintProps>({
    message: '', type: 'hint'
  })
  const [current, setcurrent] = useState(0)

  const clickevent = useCallback((item, key) => {
    setcurrent(key)
  },[])

  const classNameSJp = useCallback(cur => {
    return current === cur ? 'active' : 'tabs__content'
  },[])

  const tabs = ['Fixed price', 'Auction', 'Spliting', 'Mortgage',]

  const sellOrder = {
    dir: 'sell',
    maker: account,
    makerAsset: {
      settleType: 'uint256',
      baseAsset: {
        code: {
          baseType: 'uint256',
          extraType: data?.tokenId,
          contractAddr: data?.addressContract
        },
        value: 'uint256'
      },
      extraValue: 'uint256'
    },
    fee: 'uint256',
    feeRecipient: 'address',
    startTime: 'uint256',
    endTime: 'uint256',
    salt: 'uint256',
  }

  const listing = () => {
    if (!promised) {
      setHintMessage({
        message: 'Please check the checkbox first!',
        type: 'error'
      })
      return
    }else {
      banksyJsConnector.banksyJs.Banksy.isApprovedForAll(account!, '0x1Da28CC4693477E97BE4FA592918C216aE79D7aa').then(res => {
        console.log(res)
      }).catch(err=>err)
    }
  }

  const { Option } = Select
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
            tabs.map((item:any, i:number) => {
              return(
                // @ts-ignore
                <Button className={i === current && 'tabs__link'} onClick={() => clickevent(item, i)} key={i}>{item}</Button>
              )
            })
          }
        </div>
        <p className="hightest">Set Price</p>
      </div>
      <div className="sellContent">
        <div className="fixedPrice">
          <Input.Group compact>
            <Select defaultValue="ETH">
              <Option value="ETH">ETH</Option>
              <Option value="USDT">USDT</Option>
            </Select>
            <Input style={{ width: '50%' }} defaultValue="" />
          </Input.Group>
          <span>ETH</span>
        </div>
        <Button className="listing" onClick={listing}>Listing</Button>
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
          <div className="text">Total fees  ----------------------------------------------------------- 2%</div>
        </Announcement>
      </div>
    </SellingModal>
  )
}


export default SellModal
