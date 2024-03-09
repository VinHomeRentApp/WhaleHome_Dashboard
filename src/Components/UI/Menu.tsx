import {
  BarChartOutlined,
  CalendarOutlined,
  ContactsOutlined,
  FileTextOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/user.type'

const { SubMenu } = Menu // Destructure SubMenu from Menu

const MenuNav: React.FC = () => {
  const [key, setKey] = useState('')
  const navigate = useNavigate()
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
    <Menu
      theme='light'
      mode='inline'
      defaultSelectedKeys={[key]}
      onClick={({ key }) => {
        navigate(`/${key}`)
        setKey(key)
      }}
      style={{ border: '0' }}
    >
      {user != null ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          <Avatar size='large' src={user.image}></Avatar>
          <div style={{ textAlign: 'center' }}>{user.fullName}</div>
        </div>
      ) : (
        <div style={{ justifyContent: 'center', textAlign: 'center', margin: 10 }}>
          <img src='/main-logo.png' style={{ height: '50%', width: '50%' }} alt='' />
        </div>
      )}

      {/* Your existing menu items */}
      <Menu.Item key='' icon={<BarChartOutlined />}>
        DashBoard
      </Menu.Item>
      <Menu.Item key='users' icon={<UserOutlined />}>
        User
      </Menu.Item>

      {/* Submenu for 'Management' */}
      <SubMenu key='management' icon={<span className='material-symbols-outlined'>pin_drop</span>} title='Management'>
        <Menu.Item key='areas' icon={<span className='material-symbols-outlined'>place</span>}>
          Area
        </Menu.Item>
        <Menu.Item key='zones' icon={<span className='material-symbols-outlined'>location_city</span>}>
          Zone
        </Menu.Item>
        <Menu.Item key='buildings' icon={<span className='material-symbols-outlined'>apartment</span>}>
          Building
        </Menu.Item>
        <Menu.Item key='appartments' icon={<HomeOutlined />}>
          Appartment
        </Menu.Item>
        <Menu.Item key='appointments' icon={<CalendarOutlined />}>
          Appointment
        </Menu.Item>
        <Menu.Item key='contracts' icon={<ContactsOutlined />}>
          Contracts
        </Menu.Item>
        <Menu.Item key='posts' icon={<FileTextOutlined />}>
          Post
        </Menu.Item>
      </SubMenu>

      {/* Submenu for 'Reviews' */}
      <SubMenu key='reviews' icon={<span className='material-symbols-outlined'>reviews</span>} title='Reviews'>
        <Menu.Item key='review' icon={<span className='material-symbols-outlined'>rate_review</span>}>
          Review
        </Menu.Item>
        <Menu.Item key='issue' icon={<span className='material-symbols-outlined'>error</span>}>
          Issue
        </Menu.Item>
        <Menu.Item key='problem' icon={<span className='material-symbols-outlined'>problem</span>}>
          Problem
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default MenuNav
