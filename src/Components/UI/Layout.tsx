import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, Modal, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState, useAppDispatch } from '../../redux/containers/store.ts'
import { handleLogout } from '../../usecases/HandleLogout.ts'
import { handleErrorMessage } from '../../utils/HandleError.ts'
import MenuNav from './Menu.tsx'
import {
  layoutHeaderStyle,
  styleButtonLogout,
  styleIconHeader,
  styleLayoutContext,
  styleSider
} from './styles/layout.ts'

const { Header, Sider, Content } = Layout

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const { userInfo, error } = useSelector((state: RootState) => state.auth)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Auth' })
  }, [error])

  return (
    <Layout>
      {contextHolder}
      <Sider trigger={null} collapsible collapsed={collapsed} style={styleSider}>
        <MenuNav />
      </Sider>

      <Layout
        className={collapsed ? 'layout-transition' : 'layout-transition-faster'}
        style={{ marginLeft: collapsed ? 80 : 200 }}
      >
        <div style={{ position: 'sticky', top: 0, width: '100%', zIndex: 3 }}>
          <Header style={layoutHeaderStyle}>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={styleIconHeader}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
                alignItems: 'center',
                marginRight: 20
              }}
            >
              {userInfo != null && <Avatar style={{ margin: 10 }} size='large' src={userInfo.image}></Avatar>}
              <Button onClick={() => setIsOpenModal(!isOpenModal)} style={styleButtonLogout}>
                <LoginOutlined />
              </Button>
              <Modal
                title='Confirmation'
                open={isOpenModal}
                onOk={() => handleLogout(dispatch, navigate)}
                onCancel={() => setIsOpenModal(!isOpenModal)}
              >
                <Typography>Are you sure that you want to logout?</Typography>
              </Modal>
            </div>
          </Header>
        </div>

        <Content className={collapsed ? 'layout-transition' : 'layout-transition-faster'} style={styleLayoutContext}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
