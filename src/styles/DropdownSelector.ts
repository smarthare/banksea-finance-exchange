import styled from 'styled-components'
import { Select } from 'antd'

const DropdownSelector = styled(Select)`
  margin-left: 2.5rem;

  &,
  .ant-select {
    height: 4rem !important;
  }

  .ant-select-selector {
    border-color: #305099 !important;
    border-radius: 10px !important;
    width: fit-content;
    height: 5rem !important;
    background-color: #305099 !important;
    color: white;
    height: 4rem !important;
    display: flex;
    align-items: center
  }

  .ant-select-selection-item {
    font-weight: bold;
    color: white !important;
    text-align: center !important;
    line-height: 5rem !important;
    margin: 0 0.5rem !important;
  }

  span {
    color: white;
  }

  @media screen and (max-width: 1000px) {
    margin-left: 0;
    .ant-select-selector {
      width: fit-content;
      height: 4rem !important;
      color: white;
      font-size: 1rem;
    }

  }
`

export {
  DropdownSelector
}
