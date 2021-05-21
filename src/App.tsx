import React from 'react'
import './app.css'
import { Layout } from 'antd'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
import routes from './routes'
import { Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Layout>
      <Layout.Header style={{ padding: 0, height: '82px' }}>
        <AppHeader />
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <AppSideBar />
        </Layout.Sider>
        <Layout.Content style={{ backgroundColor: '#FAF9FA' }}>
          {routes.map(route => (
            <Route path={route.path} exact component={route.component} key={route.path} />
          ))}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
