import { EditOutlined } from '@ant-design/icons'
import { Switch, Table, TableProps } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/containers/store'
import { apartment } from '../../../types/appartment.type'

type Props = {
  search: string
  // eslint-disable-next-line no-unused-vars
  handleOpenModalEdit: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: number) => void
}

const TableApartment = ({ search, handleOpenModalEdit, handleDelete }: Props) => {
  const data = useSelector((state: RootState) => state.apartment.apartmentList)
  const loading = useSelector((state: RootState) => state.apartment.loading)

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
      sorter: {
        compare: (a: apartment, b: apartment) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Area',
      key: 'id',
      width: '5%',
      align: 'center',
      render: (record: apartment) => String(record.building.zone.area.name)
    },
    {
      title: 'Zone',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (record: apartment) => String(record.building.zone.name)
    },
    {
      title: 'Building',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (record: apartment) => String(record.building.name)
    },
    {
      title: 'Name Apartment',
      key: 'id',
      width: '10%',
      filteredValue: [search],
      onFilter: (value, record: apartment) => {
        return (
          String(record.name).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.building.name).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.building.zone.name).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.building.zone.area.name).toLowerCase().includes(value.toString().toLowerCase())
        )
      },
      render: (record: apartment) => String(record.name)
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'id',
      width: '10%',
      render: (text: string) => <div style={{ whiteSpace: 'nowrap', width: 'auto', overflow: 'auto' }}>{text}</div>
    },
    {
      title: 'Type',
      key: 'id',
      width: '10%',
      render: (record: apartment) => String(record.apartmentClass.name)
    },
    {
      title: 'Action',
      key: 'id',
      width: '5%',
      align: 'center',
      render: (record: apartment) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelete(record.id)} />
          </div>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 7
      }}
      loading={loading}
      rowKey='id'
      bordered
    />
  )
}

export default TableApartment
