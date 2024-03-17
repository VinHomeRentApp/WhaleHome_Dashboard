import { FileTextOutlined, HomeOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashboardCard from '../Components/Dashboard/DashboardCard'
import DashboardChart from '../Components/Dashboard/DashboardChar'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { setUser } from '../redux/slices/auth.slice'
import { User } from '../types/user.type'
import CalendarAppointment from './Dashboard/CalendarAppointment'

const DashBoard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null') as User
    dispatch(setUser(user))
  }, [])

  const styleIcon: React.CSSProperties = {
    color: '#ffffff',
    fontSize: 30
  }

  const layoutIconStyle: React.CSSProperties = {
    padding: 10,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFA02A',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <Spin spinning={isLoading}>
      <div>
        <div style={{ display: 'flex', gap: 10 }}>
          <DashboardCard
            description='Active Posts'
            icon={
              <div style={layoutIconStyle}>
                <FileTextOutlined style={styleIcon} />
              </div>
            }
            title={'Posts'}
            URL='/post/count-all'
          />

          <DashboardCard
            description='Active Customers'
            icon={
              <div style={layoutIconStyle}>
                <UserOutlined style={styleIcon} />
              </div>
            }
            title={'Customers'}
            URL='/user/count-all'
          />

          <DashboardCard
            description='Active Apartments'
            icon={
              <div style={layoutIconStyle}>
                <HomeOutlined style={styleIcon} />
              </div>
            }
            title={'Apartments'}
            URL='/apartments/count-all'
          />

          <DashboardCard
            description='Active Contracts'
            icon={
              <div style={layoutIconStyle}>
                <SolutionOutlined style={styleIcon} />
              </div>
            }
            title={'Contracts'}
            URL='/contracts/count-all'
          />
        </div>

        <DashboardChart />
        <div>
          <CalendarAppointment />
        </div>
      </div>
    </Spin>
  )
}

export default DashBoard
