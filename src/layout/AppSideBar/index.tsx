import React from 'react'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import routes, { Route } from '../../routes'
import twitterIcon from '../../assets/images/slidebarLink/twitter.svg'
import telegramIcon from '../../assets/images/slidebarLink/telegram.svg'

const Container = styled.div`
  height: 100vh;
  background-color: #101A2D;
  position: relative;
  z-index: 11;

  .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right,
  .ant-menu-root.ant-menu-inline {
    background: #101A2D !important;
    box-shadow: none;
  }
`


const CustomizedMenu = styled(Menu)`
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
    background-color: rgb(25, 45, 79) !important;

    a {
      color: white !important;
    }

    &:after {
      border-right: none !important;
    }
  }

  .ant-menu-item-active:not(.ant-menu-item-selected) {
    background-color: rgb(25, 45, 79) !important;
  }
`

const CustomizedLink = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 5rem;


  &,
  a {
    margin-left: 1.5rem;

    img {
      width: 3rem;
    }
  }
`

const AppSideBar: React.FC = () => {
  const { pathname } = useLocation()

  const selectedKey: string = (() => {
    return routes.filter(route => route.path === pathname || route.match?.test(pathname))[0].path
  })()

  return (
    <Container>
      <CustomizedMenu
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
      >
        {
          routes.filter(route => !route.hidden).map((route: Route) => {
            const fillColor = (route.path === pathname || route.match?.test(pathname)) ? 'white' : '#fff'

            return (
              <Menu.Item key={route.path} icon={<route.icon fill={fillColor} />}>
                <Link to={route.path} style={{ userSelect: 'none', color: 'rgb(178,178,178)' }}>
                  {route.title}
                </Link>
              </Menu.Item>
            )
          })
        }
      </CustomizedMenu>
      <CustomizedLink>
        <a
          href={'https://twitter.com/banksy_finance'}
          rel="noreferrer"
          target="_blank"
        >
          <img src={twitterIcon} />
        </a>
        <a
          href={'https://t.me/Banskyfinance'}
          rel="noreferrer"
          target="_blank"
        >
          <img src={telegramIcon} />
        </a>
      </CustomizedLink>
    </Container>
  )
}

export default AppSideBar
