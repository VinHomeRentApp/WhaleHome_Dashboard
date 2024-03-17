import { FileTextOutlined, HomeFilled, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
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

  return (
    <Spin spinning={isLoading}>
      <div>
        <Space direction='horizontal' style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <DashboardCard
            icon={
              <FileTextOutlined
                style={{
                  color: 'green',
                  backgroundColor: 'rgba(0,255,0,0.25)',
                  borderRadius: 20,
                  fontSize: 40,
                  marginRight: 20,
                  padding: 10
                }}
              />
            }
            title={'Posts'}
            URL='/post/count-all'
          />

          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: 'purple',
                  backgroundColor: 'rgba(0,255,255,0.25)',
                  borderRadius: 20,
                  fontSize: 40,
                  marginRight: 20,
                  padding: 10
                }}
              />
            }
            title={'Customers'}
            URL='/user/count-all'
          />

          <DashboardCard
            icon={
              <HomeFilled
                style={{
                  color: 'black',
                  backgroundColor: 'rgba(0,255,255,0.25)',
                  borderRadius: 20,
                  fontSize: 40,
                  marginRight: 20,
                  padding: 10
                }}
              />
            }
            title={'Apartments'}
            URL='/apartments/count-all'
          />

          <DashboardCard
            icon={
              <SolutionOutlined
                style={{
                  color: 'black',
                  backgroundColor: 'rgba(0,255,255,0.25)',
                  borderRadius: 20,
                  fontSize: 40,
                  marginRight: 20,
                  padding: 10
                }}
              />
            }
            title={'Contracts'}
            URL='/contracts/count-all'
          />
        </Space>

        <DashboardChart />
        <div>
          <CalendarAppointment />
        </div>
      </div>
    </Spin>
  )
}

export default DashBoard
