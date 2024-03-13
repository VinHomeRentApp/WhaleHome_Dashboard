import {
  CalendarOutlined,
  CarryOutOutlined,
  ContainerOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Avatar, Button, Card, Drawer, Switch, Table, TableProps, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../../../redux/containers/store'
import { apartment } from '../../../types/appartment.type'
import { appointments } from '../../../types/appointments.type'
import { User } from '../../../types/user.type'
import { convertToAMPM } from '../../../utils/formatDate'

type DataTableAppointmentProps = {
  searchText: string
}

const DataTableAppointment = ({ searchText }: DataTableAppointmentProps) => {
  const { appointmentList, isLoadingAppointmentList } = useSelector((state: RootState) => state.appointment)
  const [selectedRecord, setSelectedRecord] = useState<appointments | null>(null)

  const showDrawer = (appointment: appointments) => {
    setSelectedRecord(appointment)
  }

  const onClose = () => {
    setSelectedRecord(null)
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
      <Drawer
        title={
          <>
            <CarryOutOutlined />
            {' Detail Appointment'}
          </>
        }
        onClose={onClose}
        open={!!selectedRecord}
      >
        <Card hoverable style={{ width: '100%' }} cover={<img alt='example' src={selectedRecord?.users.image} />}>
          <Meta title={selectedRecord?.users.fullName} />
          <Typography.Title level={5}>
            <HomeOutlined size={10} />
            {'  '}
            Place
          </Typography.Title>
          <Typography.Paragraph>
            {`${selectedRecord?.apartment.name} - ${selectedRecord?.apartment.building.name} - ${selectedRecord?.apartment.building.zone.name} - ${selectedRecord?.apartment.building.zone.area.name}`}
          </Typography.Paragraph>
          <Typography.Title level={5}>
            <CalendarOutlined /> Date
          </Typography.Title>
          <Typography.Paragraph>{`${selectedRecord?.dateTime}`}</Typography.Paragraph>
          <Typography.Title level={5}>
            <FieldTimeOutlined /> Time
          </Typography.Title>
          <Typography.Paragraph>{`${convertToAMPM(selectedRecord?.time)}`}</Typography.Paragraph>
          <Typography.Title level={5}>
            <ContainerOutlined /> Note
          </Typography.Title>
          <Typography.Paragraph>{selectedRecord?.note || 'Nothing'}</Typography.Paragraph>
        </Card>
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
