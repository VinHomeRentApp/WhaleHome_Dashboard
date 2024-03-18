import {
  BarChartOutlined,
  CalendarOutlined,
  ContactsOutlined,
  FileTextOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { SubMenu } = Menu

const MenuNav: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return sessionStorage.getItem('selectedKey') || ''
  })
  const navigate = useNavigate()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`)
    setSelectedKey(key)
  }
  useEffect(() => {
    sessionStorage.setItem('selectedKey', selectedKey)
  }, [selectedKey])

  return (
    <Menu
      theme='dark'
      mode='inline'
      selectedKeys={[selectedKey]}
      defaultOpenKeys={['management', 'reviews']}
      onClick={handleMenuClick}
      style={{ border: '0', height: '100vh' }}
    >
      <div style={{ justifyContent: 'center', textAlign: 'center', margin: 10 }}>
        <img src='/main-logo.png' style={{ height: '50%', width: '50%' }} alt='' />
      </div>
      <Menu.Item key='' icon={<BarChartOutlined />}>
        DashBoard
      </Menu.Item>
      <Menu.Item key='users' icon={<UserOutlined />}>
        User
      </Menu.Item>

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
