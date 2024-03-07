import { Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
import ButtonAction from '../Components/ButtonAction'
import { apartment, appointments } from '../types/appointments.type'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/user.type'
import Avatar from 'antd/es/avatar/avatar'

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

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      sorter: {
        compare: (a: appointments, b: appointments) => a.id - b.id
      },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      align: 'center',
      width: '5%',
      key: 'id'
    },
    {
      title: 'dateTime',
      dataIndex: 'dateTime',
      key: 'id',
      align: 'center',
      width: '5%'
    },
    {
      title: 'Apartment',
      children: [
        {
          title: 'Area',
          dataIndex: 'apartment',
          key: uuidv4(),
          width: '6%',
          align: 'center',
          render: (record: apartment) => String(record.building.zone.area.name)
        },
        {
          title: 'Zone',
          dataIndex: 'apartment',
          key: uuidv4(),
          width: '8%',
          align: 'center',

          render: (record: apartment) => String(record.building.zone.name)
        },
        {
          title: 'Building',
          dataIndex: 'apartment',
          key: uuidv4(),
          width: '7%',
          align: 'center',

          render: (record: apartment) => String(record.building.name)
        },
        {
          title: 'RoomName',
          dataIndex: 'apartment',
          key: uuidv4(),
          width: '6%',
          align: 'center',
          render: (record: apartment) => String(record.name)
        }
      ]
    },
    {
      title: 'User',
      dataIndex: 'users',
      key: 'id',
      align: 'center',
      width: '10%',
      render: (record: User) => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar size='default' src={record.image}></Avatar>
          <span>{record.fullName}</span>
        </div>
      )
    },
    {
      title: 'More',
      dataIndex: 'id',
      key: 'id',
      width: '7%',
      render: (_, record) => <ButtonAction ID={record.id} />
    }
  ]
  return (
    <>
      <Table
        columns={columns}
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
