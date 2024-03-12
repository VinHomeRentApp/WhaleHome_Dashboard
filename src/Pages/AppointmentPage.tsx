import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/containers/store'
import CalendarAppointment from './Dashboard/CalendarAppointment'
import ColumnsAppointmentPage from './Settings/ColumnAppointmentPage'

const AppointmentPage: React.FC = () => {
  const { appointmentList, isLoadingAppointmentList } = useSelector((state: RootState) => state.appointment)

  return (
    <>
      <Table
        columns={ColumnsAppointmentPage}
        dataSource={appointmentList}
        pagination={{
          pageSize: 5
        }}
        scroll={{ y: 400 }}
        loading={isLoadingAppointmentList}
        rowKey='id'
        bordered
      />
      <hr />
      <div>
        <CalendarAppointment />
      </div>
    </>
  )
}

export default AppointmentPage
