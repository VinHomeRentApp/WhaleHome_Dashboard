import {
  BarChartOutlined,
  CalendarOutlined,
  ContactsOutlined,
  FileTextOutlined,
  HomeOutlined,
  PayCircleOutlined,
  UserOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { typoColor } from '../../constants/mainColor'

const { SubMenu } = Menu

const MenuNav: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return sessionStorage.getItem('selectedKey') || ''
  })
  const [openKeys] = useState<string[]>(() => {
    const managementSubItems = [
      'areas',
      'zones',
      'buildings',
      'appartments',
      'appointments',
      'contracts',
      'payments',
      'posts'
    ]
    const reviewsSubItems = ['review', 'issue', 'problem']
    const storedKey = sessionStorage.getItem('selectedKey') || ''
    if (managementSubItems.includes(storedKey)) {
      return ['management']
    } else if (reviewsSubItems.includes(storedKey)) {
      return ['reviews']
    } else {
      return []
    }
  })
  const navigate = useNavigate()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`)
    setSelectedKey(key)
  }
  useEffect(() => {
    sessionStorage.setItem('selectedKey', selectedKey)
  }, [selectedKey])

  const styleMenu: React.CSSProperties = {
    color: typoColor.white1,
    backgroundColor: typoColor.subMainBackground,
    border: '0',
    height: '100vh',
    paddingLeft: '10px',
    paddingRight: '10px'
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemActiveBg: typoColor.mainBackground,
            itemSelectedBg: typoColor.yellow1,
            itemSelectedColor: typoColor.black2,
            itemHoverColor: '#fff',
            itemColor: '#ffffffa6',
            subMenuItemBg: typoColor.mainBackground,
            itemBg: typoColor.mainBackground
          }
        }
      }}
    >
      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        defaultOpenKeys={openKeys}
        onClick={handleMenuClick}
        style={styleMenu}
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
          <Menu.Item key='payments' icon={<PayCircleOutlined />}>
            Payment
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
    </ConfigProvider>
  )
}

export default MenuNav
