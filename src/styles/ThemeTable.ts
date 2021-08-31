import styled from 'styled-components'
import { Table } from 'antd'

const ThemeTable = styled(Table)`
  width: 100%;
  margin-top: 1.5rem;

  .ant-table-thead > tr > th {
    background-color: #0B111E !important;
  }

  .ant-table-thead .ant-table-cell {
    font-size: 14px;
    font-weight: 550;
    line-height: 20px;
    color: rgb(244, 244, 244);
  }

  .ant-table-tbody .ant-table-cell {
    font-size: 1.4rem;
    color: rgb(244, 244, 244);
    line-height: 20px;
  }

  .ant-table-tbody .ant-table-cell :first-child {
    border-radius: 5rem;
  }

  .ant-table-row {
    background-color: #18284C;
    user-select: none;
  }

  .ant-table-tbody {
    > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-row-hover, .ant-table-row-hover > td {
      background: #354d86 !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: 4px solid #0B111E;
    border-top: 4px solid #0B111E;
  }

  .ant-table-empty {
    background-color: transparent;
  }

  .ant-table-pagination {
    li .ant-select-selector, li, li > button, li > a, li svg {
      background: #354d86 !important;
      color: white !important;
    }

    li button span svg {
      position: relative;
      bottom: 2.5px !important;
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 0 8vw;
    width: 100vw !important;
    overflow-x: scroll;
    position: relative;
  }
`

export default ThemeTable
