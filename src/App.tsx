import React from 'react'
import './app.scss'
import { Layout } from 'antd'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
import routes from './routes'
import { Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Layout>
      <Layout.Header style={{ padding: 0, height: '82px', position: 'fixed', zIndex: 999, width: '100%' }}>
        <AppHeader />
      </Layout.Header>
      <Layout>
        <Layout.Sider style={{ position: 'fixed', zIndex: 1, top: '82px' }}>
          <AppSideBar />
        </Layout.Sider>
        <Layout.Content
          style={{
            backgroundColor: '#FAF9FA',
            position: 'relative',
            top: '80px',
            left: '202px'
          }}
        >
          <div style={{ width: 'calc(100vw - 202px)' }}>
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
