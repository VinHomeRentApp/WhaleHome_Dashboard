import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Switch, Table, TableProps } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../../../redux/containers/store'
import { apartment } from '../../../types/appartment.type'
import { appointments } from '../../../types/appointments.type'
import { User } from '../../../types/user.type'

type DataTableAppointmentProps = {
  searchText: string
}

const DataTableAppointment = ({ searchText }: DataTableAppointmentProps) => {
  const { appointmentList, isLoadingAppointmentList } = useSelector((state: RootState) => state.appointment)
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const ColumnsAppointmentPage: TableProps['columns'] = [
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
      title: 'Apartment',
      children: [
        {
          title: 'Area',
          dataIndex: 'apartment',
          key: uuidv4(),
          width: '6%',
          align: 'center',
          filteredValue: [searchText],
          onFilter: (value, record: appointments) => {
            return (
              String(record.apartment.building.zone.name?.toLowerCase()).includes(value.toString().toLowerCase()) ||
              String(record.apartment.building.zone.area.name?.toLowerCase()).includes(
                value.toString().toLowerCase()
              ) ||
              String(record.apartment.building.name?.toLowerCase()).includes(value.toString().toLowerCase()) ||
              String(record.apartment.name?.toLowerCase()).includes(value.toString().toLowerCase()) ||
              String(record.users.fullName?.toLowerCase()).includes(value.toString().toLowerCase())
            )
          },
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
          title: 'Room Name',
          dataIndex: 'apartment',
          key: uuidv4(),
          width: '9%',
          align: 'center',
          render: (record: apartment) => String(record.name)
        }
      ]
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      key: 'id',
      align: 'center',
      width: '6%'
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
      key: 'id',
      width: '7%',
      render: (_, record: appointments) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={showDrawer}>
              <EyeOutlined />
            </Button>
            <Switch defaultChecked={record.status} />
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Drawer title='Basic Drawer' onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
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
    </div>
  )
}

export default DataTableAppointment
