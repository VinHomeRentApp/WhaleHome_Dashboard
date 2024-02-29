import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import MenuNav from '../Components/Menu.tsx'
import { User } from '../types/user.type.ts'

const { Header, Sider, Content } = Layout

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const [user, setUser] = useState<User | null>()

  const storedUserData = localStorage.getItem('user')
  useEffect(() => {
    if (storedUserData) {
      setUser(JSON.parse(storedUserData))
    } else {
      setUser(null)
    }
  }, [storedUserData])

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        theme='light'
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          paddingTop: '1%',
          width: '100%',
          minHeight: '100vh',
          height: '100vh',
          overflowY: 'scroll'
        }}
      >
        <MenuNav />
        {user != null ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: '1em',
              padding: '8%',
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              borderRadius: '10px',
              boxShadow: '0px 0px 15px -3px'
            }}
          >
            <Avatar size='large' src={user.image} />
            <div style={{ textAlign: 'center' }}>{user.fullName}</div>
          </div>
        ) : (
          ''
        )}
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
