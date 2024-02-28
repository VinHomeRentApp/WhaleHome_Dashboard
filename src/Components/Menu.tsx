import React, { useState } from 'react'
import { Menu } from 'antd'
import {
  FileTextOutlined,
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  ContactsOutlined
} from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

const MenuNav: React.FC = () => {
  const [key, setKey] = useState('')
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
          icon: <HomeOutlined />,
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
        },
        {
          key: 'review',
          icon: <span className='material-symbols-outlined'>reviews</span>,
          label: 'Review'
        },
        {
          key: 'problem',
          icon: <span className='material-symbols-outlined'>problem</span>,
          label: 'Problem'
        },
        {
          key: 'issue',
          icon: <span className='material-symbols-outlined'>error</span>,
          label: 'Issue'
        }
      ]}
    />
  )
}

export default MenuNav
