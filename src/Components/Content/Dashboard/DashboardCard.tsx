import React from 'react'
import { Card, Space, Statistic } from 'antd'

interface props {
  title: string
  value: string
  icon: React.ReactNode
}

const DashboardCard: React.FC<props> = ({ title, value, icon }) => {
  return (
    <Card style={{ width: 200 }}>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

export default DashboardCard
