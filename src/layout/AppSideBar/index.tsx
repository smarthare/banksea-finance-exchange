import React from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import routes, { Route } from '../../routes'

const Container = styled.div`
  width: 27.2rem;
  height: calc(100vh - 8.2rem);
  background-color: white;
`

const CustomizedMenu = styled(Menu)`
  font-weight: 500;

  .ant-menu-item {
    display: flex;
    align-items: center;
    svg {
      width: 1.7rem;
      line {
        shape-rendering: crispEdges;
      }
    }
  }

  .ant-menu-item-selected {
    background-color: #7c6deb !important;

    a {
      color: white !important;
    }

    &:after {
      border-right: none !important;
    }
  }

  .ant-menu-item-active:not(.ant-menu-item-selected) {
    background-color: rgb(229, 226, 251) !important;
  }
`

const AppSideBar: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <Container>
      <CustomizedMenu defaultSelectedKeys={[pathname]} mode="inline">
        {routes.filter(route => !route.hidden).map((route: Route) => {
          const fillColor = route.path === pathname ? 'white' : '#7c6deb'

          return (
            <Menu.Item key={route.path} icon={<route.icon fill={fillColor} />}>
              <Link to={route.path} style={{ userSelect: 'none', color: '#7C6DEB' }}>
                {route.title}
              </Link>
            </Menu.Item>
          )
        })}
      </CustomizedMenu>
    </Container>
  )
}

export default AppSideBar
