import React, { useState } from 'react'
import { Menu } from 'antd'
import { FileTextOutlined, HomeOutlined, UserOutlined, HomeFilled, CalendarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const MenuNav: React.FC = () => {
  const [key, setKey] = useState('1')
  const navigate = useNavigate()
  return (
    <Menu
      theme='light'
      mode='inline'
      defaultSelectedKeys={[key]}
      onClick={({ key }) => {
        navigate(`/${key}`)
        setKey(key)
      }}
      style={{ border: '0' }}
      items={[
        {
          key: '',
          icon: <HomeOutlined />,
          label: 'DashBoard'
        },
        {
          key: 'user',
          icon: <UserOutlined />,
          label: 'User'
        },
        {
          key: 'appartment',
          icon: <HomeFilled />,
          label: 'Appartment'
        },
        {
          key: 'appointment',
          icon: <CalendarOutlined />,
          label: 'Appointment'
        },
        {
          key: 'post',
          icon: <FileTextOutlined />,
          label: 'Post'
        }
      ]}
    />
  )
}

export default MenuNav
