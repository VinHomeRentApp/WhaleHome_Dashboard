import {
  BarChartOutlined,
  CalendarOutlined,
  ContactsOutlined,
  FileTextOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useState } from 'react'

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
          key: 'areas',
          icon: <span className='material-symbols-outlined'>pin_drop</span>,
          label: 'Area'
        },
        {
          key: 'zones',
          icon: <span className='material-symbols-outlined'>location_city</span>,
          label: 'Zone'
        },
        {
          key: 'buildings',
          icon: <span className='material-symbols-outlined'>apartment</span>,
          label: 'Building'
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
          key: 'contracts',
          icon: <ContactsOutlined />,
          label: 'Contracts'
        },
        {
          key: 'posts',
          icon: <FileTextOutlined />,
          label: 'Post'
        },

        {
          key: 'review',
          icon: <span className='material-symbols-outlined'>reviews</span>,
          label: 'Review'
        },
        {
          key: 'issue',
          icon: <span className='material-symbols-outlined'>error</span>,
          label: 'Issue'
        },
        {
          key: 'problem',
          icon: <span className='material-symbols-outlined'>problem</span>,
          label: 'Problem'
        }
      ]}
    />
  )
}

export default MenuNav
