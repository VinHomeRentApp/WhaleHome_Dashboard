import { Card, Space, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

interface props {
  title: string
  icon: React.ReactNode
  URL: string
}

const DashboardCard: React.FC<props> = ({ title, icon, URL }) => {
  const [data, setData] = useState<number>()

  async function getData() {
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
    getData()
  }, [])

  return (
    <Card style={{ width: '100%' }}>
      <Space direction='horizontal' style={{ padding: 10 }}>
        {icon}
        <Statistic style={{ fontWeight: 'bold' }} title={title} value={data} />
      </Space>
    </Card>
  )
}

export default DashboardCard
