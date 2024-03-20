import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { typoColor } from '../constants/mainColor'
import DataTableAppointment from './Dashboard/AppointmentPage/DataTableAppointment'
import FormAddAppointment from './Dashboard/AppointmentPage/FormAddAppointment'
import CalendarAppointment from './Dashboard/CalendarAppointment'

const AppointmentPage: React.FC = () => {
  const [isOpenAddAppointment, setIsOpenAddAppointment] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleOpenAddAppointment = () => {
    setIsOpenAddAppointment(true)
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
        <Button
          onClick={handleOpenAddAppointment}
          style={{ width: '10%', backgroundColor: typoColor.yellow1, color: typoColor.mainBackground }}
          type='primary'
        >
          <PlusCircleOutlined />
          Add New
        </Button>
      </div>
      <DataTableAppointment searchText={searchText} />
      <hr />
      <FormAddAppointment
        isOpenAddAppointment={isOpenAddAppointment}
        setIsOpenAddAppointment={setIsOpenAddAppointment}
      />
      <div>
        <CalendarAppointment />
      </div>
    </>
  )
}

export default AppointmentPage
