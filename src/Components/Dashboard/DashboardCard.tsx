import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { typoColor } from '../../constants/mainColor'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

const formatter = (value: number) => <CountUp end={value} separator=',' />

interface props {
  styleCard: React.CSSProperties
  title: string
  icon: React.ReactNode
  URL: string
  description?: string
  colorButton: string
}

const DashboardCard: React.FC<props> = ({ title, icon, URL, styleCard, colorButton }) => {
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

  const styleLaytoutInCard: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between'
  }
  const styleLayoutTitle: React.CSSProperties = { fontWeight: 'bold', color: typoColor.gray1, fontSize: 16 }

  return (
    <Card style={styleCard}>
      <div style={styleLaytoutInCard}>
        <div>
          <div>{icon}</div>
          <Statistic
            value={data}
            formatter={(value) => (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 35, fontWeight: 'bold', color: typoColor.white1 }}>
                  {formatter(Number(value))}
                </div>
                <div style={styleLayoutTitle}>{title}</div>
              </div>
            )}
          />
        </div>
        <div>
          <Button
            style={{
              backgroundColor: typoColor.subMainBackground,
              border: `1px solid ${colorButton}`,
              color: colorButton
            }}
            type='default'
            shape='circle'
            size='small'
            icon={<MoreOutlined size={5} />}
          />
        </div>
      </div>
    </Card>
  )
}

export default DashboardCard
