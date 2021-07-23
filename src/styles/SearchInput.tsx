import styled from 'styled-components'
import { Input } from 'antd'

const SearchInput = styled(Input)`
  height: 4rem;
  border-color: #305099;
  background-color: #305099;
  border-radius: 10px;

  .ant-input {
    background-color: #305099;
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1000px) {
    width: 68vw;
    margin-bottom: 2vh;
  }
`

export {
  SearchInput
}
