import React, { useState } from 'react'
import { Card, Space, Statistic } from 'antd'

import { useEffect } from 'react'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'

interface props {
  title: string
  icon: React.ReactNode
  URL: string
}

const DashboardCard: React.FC<props> = ({ title, icon, URL }) => {
  const [data, setData] = useState<number>()
  async function getUsers() {
    try {
      const response = await http.get<ResponseSuccessful<number>>(URL, {
        headers: {
          Accept: 'application/json'
        }
      })

      setData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Card style={{ width: 200 }}>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={data} />
      </Space>
    </Card>
  )
}

export default DashboardCard
