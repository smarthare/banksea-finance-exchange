import React, { useState } from 'react'
import './app.scss'
import { Button, Layout } from 'antd'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
// @ts-ignore
import routes from './routes'
import styled from 'styled-components'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { Route } from 'react-router-dom'

const Header = styled(Layout.Header)`
  padding: 0;
  height: 6.2rem;
  position: relative;
  zIndex: 999;
  width: 100vw;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    padding: 0;
    height: 6.2rem;
    position: relative;
    zIndex: 999;
    width: 100vw;
  }
`

const Presentation = styled.div`
  position: fixed;
  top: 6.5rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #305099;
  transition: opacity 0.4s ease 0s;
  opacity: 0.6;
  z-index: 10;
  pointer-events: initial;
`

const App: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  const [collapsed, setCollapsed] = useState(isMobile)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="app">
      <Header>
        <AppHeader onCollapseChanged={toggleCollapsed} />
      </Header>
      <Layout style={{ backgroundColor: '#101A2D' }}>
        <Layout.Sider
          style={ isMobile ? {
            position: 'fixed',
            zIndex: 99,
            top: '6.2rem',
            left: collapsed ? '-20rem' : 0,
          } :
            {
              position: 'fixed',
              zIndex: 99,
              top: '6.2rem',
            }}
          collapsed={collapsed}
        >
          <AppSideBar />
          {
            isMobile && !collapsed && <Presentation onClick={toggleCollapsed} />
          }
        </Layout.Sider>
        <Layout.Content
          style={{
            backgroundColor: '#0B111E',
            position: 'relative',
            overflowY: 'scroll',
            left: isMobile ? '0' : (collapsed ? '0' : '200px'),
            width: collapsed ? '100vw' : 'calc(100vw - 200px)'
          }}
        >
          <div style={{ width: collapsed ? '98.9vw' : 'calc(100vw - 200px)' }}>
            {
              routes.map((route: any) => (
                <Route path={route.path}
                  exact
                  component={route.component}
                  key={route.path}
                />
              ))
            }
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
