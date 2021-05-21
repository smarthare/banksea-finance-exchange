import React from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import routes, { Route } from '../../routes'

const Container = styled.div`
  height: calc(100vh - 82px);
  background-color: white;
`

type AppSideBarProps = {}

const AppSideBar: React.FC<AppSideBarProps> = ({}) => {
  const { pathname } = useLocation()

  return (
    <Container>
      <Menu defaultSelectedKeys={[pathname]} mode="inline">
        {routes.map((route: Route) => (
          <Menu.Item key={route.path}>
            <img className="slideIcon" src={route.icon} alt="" />
            <Link to={route.path} style={{ userSelect: 'none' }}>
              {route.title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Container>
  )
}

export default AppSideBar
