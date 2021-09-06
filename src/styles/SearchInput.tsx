import styled from 'styled-components'
import { Input } from 'antd'
import { Property } from 'csstype'

type SearchInputProps = {
  backgroundColor?: Property.Color
}

const defaultColor = '#305099'

const SearchInput = styled(Input)<SearchInputProps>`
  height: 40px;
  margin-right: 3rem;
  border-color: ${props =>  props.backgroundColor ?? defaultColor};
  background-color: ${props =>  props.backgroundColor ?? defaultColor};
  border-radius: 10px;

  .ant-input {
    background-color: ${props =>  props.backgroundColor ?? defaultColor};
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
  }

`

export {
  SearchInput
}
