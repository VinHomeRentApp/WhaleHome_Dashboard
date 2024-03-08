import { FileTextOutlined, HomeFilled, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import DashboardCard from '../Components/Dashboard/DashboardCard'
import DashboardChart from '../Components/Dashboard/DashboardChar'
import RecentPost from '../Components/RecentPost'

const DashBoard: React.FC = () => {
  return (
    <div>
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
    </div>
  )
}

export default DashBoard
