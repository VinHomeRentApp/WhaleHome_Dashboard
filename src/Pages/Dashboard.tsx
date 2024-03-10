import { FileTextOutlined, HomeFilled, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import React, { useEffect } from 'react'
import DashboardCard from '../Components/Dashboard/DashboardCard'
import DashboardChart from '../Components/Dashboard/DashboardChar'
import RecentPost from '../Components/RecentPost'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { setUser } from '../redux/slices/auth.slice'
import { User } from '../types/user.type'
import { useSelector } from 'react-redux'

const DashBoard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null') as User
    dispatch(setUser(user))
  }, [])

  return (
    <div>
      <Spin spinning={isLoading}>
        <Space direction='horizontal' style={{ width: '100%' }}>
          <DashboardCard
            icon={
              <FileTextOutlined
                style={{
                  color: 'green',
                  backgroundColor: 'rgba(0,255,0,0.25)',
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8
                }}
              />
            }
            title={'Post'}
            URL='/post/count-all'
          />

          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: 'purple',
                  backgroundColor: 'rgba(0,255,255,0.25)',
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8
                }}
              />
            }
            title={'Customer'}
            URL='/user/count-all'
          />

          <DashboardCard
            icon={
              <HomeFilled
                style={{
                  color: 'black',
                  backgroundColor: 'rgba(0,255,255,0.25)',
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8
                }}
              />
            }
            title={'Appartment'}
            URL='/apartments/count-all'
          />

          <DashboardCard
            icon={
              <SolutionOutlined
                style={{
                  color: 'black',
                  backgroundColor: 'rgba(0,255,255,0.25)',
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8
                }}
              />
            }
            title={'Contract'}
            URL='/contracts/count-all'
          />
        </Space>

        <DashboardChart />
        <div>
          <RecentPost />
        </div>
      </Spin>
    </div>
  )
}

export default DashBoard
