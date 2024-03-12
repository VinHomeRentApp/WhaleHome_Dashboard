import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Modal, TimePicker, Typography } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useState } from 'react'
import DataTableAppointment from './Dashboard/AppointmentPage/DataTableAppointment'
import CalendarAppointment from './Dashboard/CalendarAppointment'

dayjs.extend(customParseFormat)

const AppointmentPage: React.FC = () => {
  const [isOpenAddAppointment, setIsOpenAddAppointment] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleOpenAddAppointment = () => {
    setIsOpenAddAppointment(true)
  }

  const onChangeTime = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString)
  }

  const onChangeDate = (date: Dayjs | null, dateString: string) => {
    console.log(date, dateString)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Search'
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <Button onClick={handleOpenAddAppointment} style={{ width: '10%' }} type='primary' block>
          <PlusCircleOutlined />
          Add New
        </Button>
      </div>
      <DataTableAppointment searchText={searchText} />
      <hr />
      <Modal title='Edit Area' open={isOpenAddAppointment} onCancel={() => setIsOpenAddAppointment(false)}>
        <Typography.Title level={5}>UserID</Typography.Title>
        <Input placeholder='UserID' />
        <Typography.Title level={5}>ApartmentID</Typography.Title>
        <Input placeholder='ApartmentID' />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <Typography.Title style={{ width: '100%' }} level={5}>
              Time
            </Typography.Title>
            <TimePicker
              style={{ width: '100%' }}
              onChange={onChangeTime}
              defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
            />
          </div>
          <div style={{ width: '45%' }}>
            <Typography.Title level={5}>Date</Typography.Title>
            <DatePicker onChange={onChangeDate} style={{ width: '100%' }} />
          </div>
        </div>
      </Modal>
      <div>
        <CalendarAppointment />
      </div>
      {/*  */}
    </>
  )
}

export default AppointmentPage
