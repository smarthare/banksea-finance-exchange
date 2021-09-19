import styled from 'styled-components'
import { Input } from 'antd'
import { Property } from 'csstype'

type SearchInputProps = {
  backgroundColor?: Property.Color
}

const defaultColor = '#305099'

const ThemeInput = styled(Input)<SearchInputProps>`
  border-color: ${props =>  props.backgroundColor ?? defaultColor};
  border-radius: 10px;

  font-weight: 500;
  font-size: 1.4rem;

  &, .ant-input {
    background-color: ${props =>  props.backgroundColor ?? defaultColor};
    color: white !important;
  }
`

export {
  ThemeInput
}
