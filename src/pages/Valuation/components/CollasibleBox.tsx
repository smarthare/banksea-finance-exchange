import styled from 'styled-components'
import React, { CSSProperties, useState } from 'react'
import { Property } from 'csstype'
import { DownOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'


interface ThemeCollapseProps  {
  contentBackground?: Property.Background
}

interface CollapsibleBoxProps extends ThemeCollapseProps {
  title: string
  collapsible?: boolean
  contentPadding?: Property.Padding
  titleIcon?: JSX.Element
  style?: CSSProperties
}


const ThemeCollapse = styled(Collapse)<ThemeCollapseProps>`
  border: none;
  border-radius: 10px !important;
  background-color: transparent;

  .ant-collapse-header {
    height: 70px;
    background: #18284C;
    border: none;
    border-top-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
  }

  .ant-collapse-content {
    border: none;
    background: ${({ contentBackground }) => contentBackground ?? '#305099'}
  }

  .collapse-custom-panel {
    overflow: hidden;
    background-color: #305099;
    border: none;
    border-radius: 10px !important;
  }

  .ant-collapse-item-disabled > .ant-collapse-header {
    cursor: auto;
  }
`

const CollapseHeaderContainer = styled.div<{collapsed?: boolean, collapsible?: boolean}>`
  display: flex;
  align-items: center;
  color: #99bdf9;
  user-select: none;

  .icon {
    margin-right: 8px;
    margin-left: 8px;

    img {
      height: 22px;
    }
  }

  .title {
    font-size: 30px;
    font-weight: 500;
  }

  .arrow {
    transition: all .25s;
    transform: ${props => props.collapsed ? 'rotate(180deg)' : ''};
    position: absolute;
    right: 25px;
  }
`

const CollapseHeader: React.FC<{ title: string, icon?: JSX.Element, collapsed?: boolean,collapsible?: boolean }> = ({
  title,
  icon,
  collapsed,
  collapsible
}) => {
  return (
    <CollapseHeaderContainer collapsed={collapsed}>
      <div className="icon">
        {icon}
      </div>
      <div className="title">
        {title}
      </div>
      <div className="arrow">
        { collapsible && <DownOutlined />}
      </div>
    </CollapseHeaderContainer>
  )
}

const CollapsibleBox: React.FC<CollapsibleBoxProps> = ({
  collapsible, contentPadding, titleIcon, title, children, style, contentBackground
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = (e: any) => {
    if (!collapsible) {
      return
    }
    setCollapsed(e.length === 0)
  }

  return (
    <ThemeCollapse
      style={style}
      onChange={handleCollapse}
      defaultActiveKey={1}
      contentBackground={contentBackground}
    >
      <Collapse.Panel
        showArrow={false}
        header={
          <CollapseHeader
            title={title}
            icon={titleIcon}
            collapsed={collapsed}
            collapsible={collapsible}
          />
        }
        key="1"
        className="collapse-custom-panel"
        collapsible={!collapsible ? 'disabled' : 'header'}
      >
        <div className="content" style={{ padding: contentPadding }}>
          {children}
        </div>
      </Collapse.Panel>

    </ThemeCollapse>
  )
}

export default CollapsibleBox
