import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Button, Switch, Table, TableProps, Tag, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { getAppointmentList, updateAppointment } from '../../../redux/actions/appointment.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { apartment } from '../../../types/appartment.type'
import { appointments } from '../../../types/appointments.type'
import { User } from '../../../types/user.type'
import { handleErrorMessage } from '../../../utils/HandleError'
import DrawerAppointment from './DrawerAppointment'

type DataTableAppointmentProps = {
  searchText: string
}

const DataTableAppointment = ({ searchText }: DataTableAppointmentProps) => {
  const { appointmentList, isLoadingAppointmentList, error } = useSelector((state: RootState) => state.appointment)
  const [selectedRecord, setSelectedRecord] = useState<appointments | null>(null)
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const showDrawer = (appointment: appointments) => {
    setSelectedRecord(appointment)
  }

  const onClose = () => {
    setSelectedRecord(null)
  }

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Appointment' })
  }, [error])

  const onChangeStatus = async (status: string) => {
    if (selectedRecord?.id) {
      await dispatch(updateAppointment({ id: selectedRecord?.id, statusAppointment: status }))
      await dispatch(getAppointmentList())
      messageApi.success('Update Status Appointment successfully!')
    } else {
      messageApi.error('Please Choose Appointment')
    }
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
      width: '6%',
      sorter: {
        compare: (a: appointments, b: appointments) => {
          const dateA = new Date(a.dateTime)
          const dateB = new Date(b.dateTime)
          if (dateA < dateB) {
            return -1
          }
          if (dateA > dateB) {
            return 1
          }
          return 0
        }
      },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'User',
      dataIndex: 'users',
      key: 'id',
      align: 'center',
      width: '10%',
      render: (record: User) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Avatar size='default' src={record.image} />
          <span>{record.fullName}</span>
        </div>
      )
    },
    {
      title: 'Status',
      key: 'id',
      align: 'center',
      width: '6%',
      render: (record: appointments) => {
        switch (String(record.statusAppointment)) {
          case 'Completed':
            return <Tag color={'green'}>{String(record.statusAppointment).toUpperCase()}</Tag>
          case 'Canceled':
            return <Tag color={'red'}>{String(record.statusAppointment).toUpperCase()}</Tag>
          case 'Pending':
            return <Tag color={'blue'}>{String(record.statusAppointment).toUpperCase()}</Tag>
          default:
            return null
        }
      }
    },
    {
      title: 'More',
      key: 'id',
      width: '7%',
      render: (_, record: appointments) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={() => showDrawer(record)}>
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
      {contextHolder}
      <DrawerAppointment
        isLoadingAppointmentList={isLoadingAppointmentList}
        onChangeStatus={onChangeStatus}
        onClose={onClose}
        selectedRecord={selectedRecord}
      />
      <Table
        columns={ColumnsAppointmentPage}
        dataSource={appointmentList}
        pagination={{
          pageSize: 7
        }}
        loading={isLoadingAppointmentList}
        rowKey='id'
        bordered
      />
    </div>
  )
}

export default DataTableAppointment
