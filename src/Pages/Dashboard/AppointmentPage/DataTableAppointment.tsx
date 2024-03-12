import { Avatar, Table, TableProps } from 'antd'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ButtonAction from '../../../Components/UI/ButtonAction'
import { RootState } from '../../../redux/containers/store'
import { apartment } from '../../../types/appartment.type'
import { appointments } from '../../../types/appointments.type'
import { User } from '../../../types/user.type'

// type Props = {}

const DataTableAppointment = () => {
  const { appointmentList, isLoadingAppointmentList } = useSelector((state: RootState) => state.appointment)

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
      dataIndex: 'id',
      key: 'id',
      width: '7%',
      render: (_, record) => <ButtonAction ID={record.id} />
    }
  ]

  return (
    <div>
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
