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
      <Layout.Header style={{ padding: 0, height: '8.2rem', position: 'fixed', zIndex: 1, width: '100%' }}>
        <AppHeader />
      </Layout.Header>
      <Layout>
        <Layout.Sider style={{ position: 'fixed', zIndex: 1, top: '8.2rem' }}>
          <AppSideBar />
        </Layout.Sider>
        <Layout.Content style={{ backgroundColor: '#FAF9FA', position: 'relative', top: '8.2rem', left: '27.2rem' }}>
          {routes.map(route => (
            <Route path={route.path} exact component={route.component} key={route.path} />
          ))}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
