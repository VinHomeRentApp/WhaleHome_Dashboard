import React, { useState } from 'react'
import { Menu } from 'antd'
import {
  FileTextOutlined,
  BarChartOutlined,
  UserOutlined,
  HomeFilled,
  CalendarOutlined,
  ContactsOutlined
} from '@ant-design/icons'
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
          icon: <BarChartOutlined />,
          label: 'DashBoard'
        },
        {
          key: 'users',
          icon: <UserOutlined />,
          label: 'User'
        },
        {
          key: 'appartments',
          icon: <HomeFilled />,
          label: 'Appartment'
        },
        {
          key: 'appointments',
          icon: <CalendarOutlined />,
          label: 'Appointment'
        },
        {
          key: 'posts',
          icon: <FileTextOutlined />,
          label: 'Post'
        },
        {
          key: 'contracts',
          icon: <ContactsOutlined />,
          label: 'Contracts'
        }
      ]}
    />
  )
}

export default MenuNav
