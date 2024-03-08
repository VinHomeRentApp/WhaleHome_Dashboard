import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { appointments } from '../types/appointments.type'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
import ColumnsAppointmentPage from './Settings/ColumnAppointmentPage'

const AppointmentPage: React.FC = () => {
  const [data, setDataSource] = useState<appointments[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function getAppointments() {
    try {
      setLoading(true)
      const response = await http.get<ResponseSuccessful<appointments[]>>('/appointments', {
        headers: {
          Accept: 'application/json'
        }
      })
      setDataSource(response.data.data)
      console.log(response.data.data)

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  return (
    <>
      <Table
        columns={ColumnsAppointmentPage}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        scroll={{ y: 400 }}
        loading={loading}
        rowKey='id'
        bordered
      />
    </>
  )
}

export default AppointmentPage
