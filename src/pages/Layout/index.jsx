import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu, Typography } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import News from '../../assets/news.svg?react'

const { Header, Content, Footer } = AntLayout
const { Link: AntLink } = Typography

const Layout = () => {
  const location = useLocation()
  const currentKey = location.pathname

  const menuItems = [
    {
      key: '/',
      label: <NavLink to='/'>Home</NavLink>,
    },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
          <News fill='white' width='48px' height='48px' />
        </Link>

        <Menu items={menuItems} mode='vertical' selectedKeys={[currentKey]} theme='dark'></Menu>
      </Header>
      <Content
        style={{ flex: '1', margin: '0 auto', padding: '0 10px', maxWidth: '500px', width: '100%' }}
      >
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <AntLink target='_blank' href='https://github.com/amalumian/ta-hacker-news'>
          <GithubOutlined style={{ fontSize: '32px' }} />
        </AntLink>
      </Footer>
    </AntLayout>
  )
}

export default Layout
