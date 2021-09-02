import styled from 'styled-components'
import { Table } from 'antd'
import { Property } from 'csstype'

export type ThemeTableProps = {
  headerBackgroundColor?: Property.Color
  headerTextColor?: Property.Color

  rowBackgroundColor?: Property.Color
  rowTextColor?: Property.Color

  gutterColor?: Property.Color
  gutterHeight?: Property.Height

  rowHoveredBackgroundColor?: Property.Color
  rowCursor?: Property.Cursor
}

const ThemeTable = styled(Table)<ThemeTableProps>`
  width: 100%;
  margin-top: 1.5rem;

  .ant-table-thead > tr > th {
    background-color: ${props => props.headerBackgroundColor ?? '#0B111E'};
  }

  .ant-table-thead .ant-table-cell {
    font-size: 14px;
    font-weight: 550;
    line-height: 20px;
    color: ${props => props.headerTextColor ?? 'rgb(244, 244, 244)'}
  }

  .ant-table-tbody .ant-table-cell {
    font-size: 1.4rem;
    color: ${props => (props.rowTextColor ?? 'rgb(244, 244, 244)') + '!important;'}
    line-height: 20px;
  }

  .ant-table-tbody .ant-table-cell :first-child {
    border-radius: 5rem;
  }

  .ant-table-row {
    background-color: ${props => props.rowBackgroundColor ?? '#18284C'};
    cursor: ${props => props.rowCursor} !important;
  }

  .ant-table-tbody {
    > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-row-hover, .ant-table-row-hover > td {
      background: #354d86 !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom-width: ${props => props.gutterHeight ?? '4px'};
    border-bottom-style: solid;
    border-bottom-color: ${props => props.gutterColor ?? '#0B111E'}
  }

  .ant-table-tbody > tr:nth-last-of-type(1) > td {
    border-bottom: none;
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

  .ant-tooltip-open {
    background-color: ${props => props.headerBackgroundColor ?? '#0B111E'};
    filter: brightness(90%);
  }

  .ant-table-column-sort {
    background-color: ${props => props.headerBackgroundColor ?? '#0B111E'};
    filter: brightness(95%);
  }

  @media screen and (max-width: 1000px) {
    //padding: 0 8vw;
    width: 100vw !important;
    overflow-x: scroll;
    position: relative;
  }
`

export default ThemeTable
