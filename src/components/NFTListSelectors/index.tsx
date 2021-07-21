import React from 'react'
import { DropdownSelector } from '../../styles/DropdownSelector'
import { Select } from 'antd'

const OrderSelector: React.FC = () => {
  return (
    <DropdownSelector defaultValue="1">
      <Select.Option value="1">
        Recently Listed
      </Select.Option>
      <Select.Option value="2">
        Recently Created
      </Select.Option>
      <Select.Option value="3">
        Recently Sold
      </Select.Option>
      <Select.Option value="4">
        Price: Low to High
      </Select.Option>
      <Select.Option value="5">
        Price: High to Low
      </Select.Option>
      <Select.Option value="6">
        Most Favorite
      </Select.Option>
    </DropdownSelector>
  )
}

const ChainSelector: React.FC<{ onChange: (_value: any) => void }> = ({ onChange }) => {
  return (
    <DropdownSelector
      defaultValue=""
      onChange={onChange}
    >
      <Select.Option value="">All chains</Select.Option>
      <Select.Option value="Ethereum">Ethereum</Select.Option>
      <Select.Option value="Solana">Solana</Select.Option>
    </DropdownSelector>
  )
}

const StatusSelector: React.FC<{ onChange: (_value: any) => void }> = ({ onChange }) => {
  return (
    <DropdownSelector defaultValue=""
      onChange={onChange}
    >
      <Select.Option value="">All items</Select.Option>
      <Select.Option value="1">On Sale</Select.Option>
      <Select.Option value="2">On Auction</Select.Option>
      <Select.Option value="3">On Splitting</Select.Option>
      <Select.Option value="4">On Staking</Select.Option>
    </DropdownSelector>
  )
}

export {
  OrderSelector,
  ChainSelector,
  StatusSelector
}
