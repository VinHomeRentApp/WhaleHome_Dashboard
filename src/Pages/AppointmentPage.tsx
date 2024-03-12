import { Button, Input } from 'antd'
import React from 'react'
import DataTableAppointment from './Dashboard/AppointmentPage/DataTableAppointment'
import CalendarAppointment from './Dashboard/CalendarAppointment'

const AppointmentPage: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search style={{ width: '30%' }} placeholder='Tìm kiếm theo tên phòng' />
        <Button style={{ width: '10%' }} type='primary' block>
          Add New
        </Button>
      </div>
      <DataTableAppointment />
      <hr />
      <div>
        <CalendarAppointment />
      </div>
      {/*  */}
    </>
  )
}

export default AppointmentPage
