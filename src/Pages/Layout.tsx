import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import React, { useState } from 'react'
import MenuNav from '../Components/UI/Menu.tsx'

const { Header, Sider, Content } = Layout

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme='light'
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          paddingTop: '1%',
          width: '100%',
          height: '100vh',
          overflowY: 'scroll'
        }}
      >
        <MenuNav />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <Button style={{ color: 'blue', border: '1px solid blue', marginTop: '1%', marginRight: '2%' }}>
            <LoginOutlined />
          </Button>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
