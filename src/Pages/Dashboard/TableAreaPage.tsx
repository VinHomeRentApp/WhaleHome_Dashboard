import { Switch, Table, TableProps } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/containers/store'
import { area } from '../../types/area.type'
import { startEditingArea } from '../../redux/slices/area.slice'
import { deleteArea } from '../../redux/actions/area.actions'
import { Dispatch } from 'react'

type TableArePageProps = {
  search: string
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>
}

const TableAreaPage = ({ search, setIsOpenModal }: TableArePageProps) => {
  const dispatch = useAppDispatch()
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const loading = useSelector((state: RootState) => state.area.loading)

  function handleOpenModal(id: number) {
    setIsOpenModal(true)
    dispatch(startEditingArea(id))
  }

  function handleDelte(id: number) {
    console.log(id)

    dispatch(deleteArea(id))
  }

  const ColumnAreaPage: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      sorter: {
        compare: (a: area, b: area) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Area',
      dataIndex: 'name',
      key: 'id',
      align: 'center',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(String(value).toLowerCase())
      }
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'id',
      align: 'center'
    },

    {
      title: 'Action',
      key: 'id',
      align: 'center',

      render: (record: area) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModal(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
            {/* <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelte(record.id)} /> */}
          </div>
        )
      }
    }
  ]

  return (
    <Table
      columns={ColumnAreaPage}
      dataSource={areaList}
      loading={loading}
      pagination={{
        pageSize: 7
      }}
      rowKey='id'
      bordered
    />
  )
}

export default TableAreaPage
