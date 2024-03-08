import { Avatar, TableProps } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import ButtonAction from '../../Components/UI/ButtonAction'
import { apartment } from '../../types/appartment.type'
import { appointments } from '../../types/appointments.type'
import { User } from '../../types/user.type'

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
    title: 'createDate',
    dataIndex: 'createDate',
    align: 'center',
    width: '6%',
    key: 'id'
  },
  {
    title: 'dateTime',
    dataIndex: 'dateTime',
    key: 'id',
    align: 'center',
    width: '6%'
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

export default ColumnsAppointmentPage
