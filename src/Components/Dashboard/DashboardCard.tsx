import { Card, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

import CountUp from 'react-countup'

const formatter = (value: number) => <CountUp end={value} separator=',' />

interface props {
  title: string
  icon: React.ReactNode
  URL: string
  description: string
}

const DashboardCard: React.FC<props> = ({ title, icon, URL, description }) => {
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
    <Card
      style={{
        margin: 10,
        width: '100%',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05)',
        borderWidth: 0
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 'bold' }}>{title}</div>
          <Statistic
            title={description}
            value={data}
            formatter={(value) => <span style={{ fontSize: 35, fontWeight: 'bold' }}>{formatter(Number(value))}</span>}
          />
        </div>
        <div>{icon}</div>
      </div>
    </Card>
  )
}

export default DashboardCard
