import React from 'react'
import { Space } from 'antd'
import DashboardCard from '../Components/DashboardCard'
import { FileTextOutlined, UserOutlined, HomeFilled, SolutionOutlined } from '@ant-design/icons'
import RecentPost from '../Components/RecentPost'
import DashboardChart from '../Components/DashboardChar'
const DashBoard: React.FC = () => {
  return (
    <Space size={20} direction='vertical' style={{ paddingLeft: '2%' }}>
      <Space direction='horizontal' size={[100, 50]}>
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
        ></DashboardCard>
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
      <Space size={[200, 20]}>
        <RecentPost></RecentPost>
        <DashboardChart></DashboardChart>
      </Space>
    </Space>
  )
}

export default DashBoard
