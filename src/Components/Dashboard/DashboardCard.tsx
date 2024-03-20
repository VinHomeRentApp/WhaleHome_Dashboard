import { Card, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

import CountUp from 'react-countup'
import { typoColor } from '../../constants/mainColor'

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

  const styleCard: React.CSSProperties = {
    width: '100%',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05)',
    color: typoColor.white1,
    backgroundColor: typoColor.subMainBackground,
    border: '2px solid #1e1e1e',
    borderRadius: '14px'
  }

  const styleTitleStatic: React.CSSProperties = { fontSize: 14, color: typoColor.gray1 }
  const styleLaytoutInCard: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
  const styleLayoutTitle: React.CSSProperties = { fontWeight: 'bold', color: typoColor.white1 }

  return (
    <Card style={styleCard}>
      <div style={styleLaytoutInCard}>
        <div>
          <div style={styleLayoutTitle}>{title}</div>
          <Statistic
            title={<span style={styleTitleStatic}>{description}</span>}
            value={data}
            formatter={(value) => (
              <span style={{ fontSize: 35, fontWeight: 'bold', color: typoColor.white1 }}>
                {formatter(Number(value))}
              </span>
            )}
          />
        </div>
        <div>{icon}</div>
      </div>
    </Card>
  )
}

export default DashboardCard
