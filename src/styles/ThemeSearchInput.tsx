import styled from 'styled-components'
import { Input } from 'antd'
import { Property } from 'csstype'

type SearchInputProps = {
  backgroundColor?: Property.Color
}

const defaultColor = '#305099'

const ThemeSearchInput = styled(Input.Search)<SearchInputProps>`
  .ant-input-wrapper.ant-input-group {
    height: 100% !important;

    .ant-input-affix-wrapper {
      background-color: ${props =>  props.backgroundColor ?? defaultColor};
      border-color: ${props =>  props.backgroundColor ?? defaultColor};
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    .ant-input-affix-wrapper-focused {
      box-shadow: none;
    }

    .ant-input {
      border-color: ${props =>  props.backgroundColor ?? defaultColor};
      background-color: ${props =>  props.backgroundColor ?? defaultColor};
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      color: white !important;


      &:hover, &:focus {
        box-shadow: none;
        & + span > button {
          border-left-color: ${props => props.backgroundColor ?? defaultColor} !important;
        }
      }
    }

    .ant-input-group-addon {
      height: 100%;
      background-color: ${props =>  props.backgroundColor ?? defaultColor};
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      button {
        width: 16px;
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 15px;
      }
    }

  }

  font-weight: 500;
  font-size: 1.4rem;
`

export {
  ThemeSearchInput
}
