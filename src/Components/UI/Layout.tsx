import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, Modal, Typography, theme } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/containers/store.ts'
import { handleLogout } from '../../usecases/HandleLogout.ts'
import MenuNav from './Menu.tsx'

const { Header, Sider, Content } = Layout

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const dispatch = useAppDispatch()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout>
      <Sider theme='dark' trigger={null} collapsible collapsed={collapsed}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {userInfo != null && <Avatar style={{ margin: 10 }} size='large' src={userInfo.image}></Avatar>}
            <Button
              onClick={() => setIsOpenModal(!isOpenModal)}
              style={{ color: 'blue', border: '1px solid blue', marginTop: '1%', marginRight: '2%' }}
            >
              <LoginOutlined />
            </Button>
            <Modal
              title='Confirmation'
              open={isOpenModal}
              onOk={() => handleLogout(dispatch)}
              onCancel={() => setIsOpenModal(!isOpenModal)}
            >
              <Typography>Are you sure that you want to logout?</Typography>
            </Modal>
          </div>
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