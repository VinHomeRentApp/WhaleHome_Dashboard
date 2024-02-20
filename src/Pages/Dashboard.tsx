import React from 'react'
import { Space } from 'antd'
import DashboardCard from '../Components/DashboardCard'
import { FileTextOutlined, UserOutlined, HomeFilled, SolutionOutlined } from '@ant-design/icons'
import RecentPost from '../Components/RecentPost'
import DashboardChart from '../Components/DashboardChar'
const DashBoard: React.FC = () => {
  return (
    <Space size={20} direction='vertical' style={{ paddingLeft: '5%' }}>
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
          value={'1234'}
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
          value={'123'}
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
          value={'12'}
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
          value={'12'}
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
