import styled from 'styled-components'
import { Input } from 'antd'
import { Property } from 'csstype'

type SearchInputProps = {
  backgroundColor?: Property.Color
}

const defaultColor = '#305099'

const ThemeInput = styled(Input)<SearchInputProps>`
  height: 40px;
  border-color: ${props =>  props.backgroundColor ?? defaultColor};
  background-color: ${props =>  props.backgroundColor ?? defaultColor};
  border-radius: 10px;
  color: white !important;

  font-weight: 500;
  font-size: 1.4rem;
`

export {
  ThemeInput
}
