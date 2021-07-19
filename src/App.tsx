import React, { useState } from 'react'
import './app.scss'
import { Button, Layout } from 'antd'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
import routes from './routes'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { MenuFoldOutlined } from '@ant-design/icons'

const CollapsedBtn = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;

  .ant-btn {
    background: none !important;
  }

`


const App: React.FC = () => {

  const [collapsed, setCollapsed] = useState(true)

  const state = {
    collapsed: false
  }

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  function toggleCollapsed () {
    setCollapsed(!collapsed)
    console.log(collapsed)
  }
  return (
    <Layout>
      <Layout.Header style={{ padding: 0, height: '62px', position: 'fixed', zIndex: 999, width: '100%' }}>
        <AppHeader />

      </Layout.Header>
      <Layout >
        <Layout.Sider style={{ position: 'fixed', zIndex: 1, top: '62px' }} collapsed={collapsed}>
          <MenuFoldOutlined onClick={toggleCollapsed}
            style={{
              position:'relative',
              fontSize:'2.5rem',
              color:'#B2B2B2',
              display:'flex',
              justifyContent:'center',
              marginTop:'1.2vh'
            }}
          />
          <AppSideBar />
        </Layout.Sider>
        <Layout.Content
          style={{
            backgroundColor: '#0B111E',
            position: 'relative',
            top: '62px',
            height:'550vh',
          }}
        >
          <div style={{ marginLeft: '20.2rem' }}>
            {routes.map(route => (
              <Route path={route.path} exact component={route.component} key={route.path} />
            ))}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
