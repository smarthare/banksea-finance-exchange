import React from 'react'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type TableTitleWithTooltipProps = {
  title: string
  tooltip: string
}

const TableTitleWithTooltip: React.FC<TableTitleWithTooltipProps> = ({ title, tooltip }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '5px' }}>{title}</span>
      <Tooltip title={tooltip}>
        <QuestionCircleOutlined className="icon" />
      </Tooltip>
    </div>
  )
}

export default TableTitleWithTooltip
