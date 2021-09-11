import styled from 'styled-components'
import { Select } from 'antd'
import { Property } from 'csstype'

type DropdownSelectorProps = {
  backgroundColor?: Property.Color
  minWidth?: Property.MinWidth
}

const DropdownSelector = styled(Select)<DropdownSelectorProps>`
  font-size: 1.4rem;

  &,
  .ant-select {
    height: fit-content;
    min-width: ${props => props.minWidth ?? '80px'};
  }

  .ant-select-selector {
    max-width: 300px;
    min-width: ${props => props.minWidth ?? '80px'};
    height: fit-content;
    border-color: #305099 !important;
    border-radius: 10px !important;
    background-color: ${({ backgroundColor }) => (backgroundColor ?? '#305099') + '!important;'}
    color: white;
    display: flex;
    align-items: center;
  }

  .ant-select-selection-item {
    font-weight: bold;
    color: white !important;
    text-align: center !important;
    margin: 0 0.5rem !important;
    font-size: 1.4rem;
  }

  .ant-select-clear {
    background-color: ${({ backgroundColor }) => (backgroundColor ?? '#305099')};

    span {
      position: relative;
      bottom: 4px;
      color: #c2c2c2;
    }
  }

  .ant-select-arrow {
    span {
      color: white;
    }
  }

  .ant-select-selection-overflow {
    .ant-select-selection-item {
      background-color: ${({ backgroundColor }) => (backgroundColor ?? '#305099') + '!important;'};
      filter: brightness(85%);
      color: white;
      border: none;
      border-radius: 10px;
      align-items: center;

      .ant-select-selection-item-remove {
        color: white;
        line-height: 0;
        position: relative;
        bottom: 2px;
        right: 2px;

        span svg {
          stroke-width: 20;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    margin-left: 0;
    .ant-select-selector {
      width: fit-content;
      color: white;
      font-size: 1rem;
    }
  }
`

export {
  DropdownSelector
}
