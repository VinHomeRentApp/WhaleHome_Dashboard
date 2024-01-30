import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, theme, Avatar } from 'antd'

import MenuNav from './Menu.tsx'
import ContentRoutes from '../Router/router.tsx'

const { Header, Sider, Content } = Layout

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '1em',
            paddingBottom: '5%'
          }}
        >
          <Avatar
            size='large'
            src='data:image/png;base64,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'
          />
          <div style={{ textAlign: 'center' }}>Admin</div>
        </div>
        <MenuNav />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
          <ContentRoutes />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
