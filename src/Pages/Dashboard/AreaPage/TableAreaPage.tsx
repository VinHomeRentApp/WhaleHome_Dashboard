import { EditOutlined } from '@ant-design/icons'
import { Switch, Table, TableProps, message } from 'antd'
import { Dispatch } from 'react'
import { useSelector } from 'react-redux'
import { deleteArea } from '../../../redux/actions/area.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { startEditingArea } from '../../../redux/slices/area.slice'
import { area } from '../../../types/area.type'

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

  async function handleDelte(id: number) {
    const resultAction = await dispatch(deleteArea(id))
    if (deleteArea.fulfilled.match(resultAction)) {
      message.success('Update Area Status Successful!')
    } else if (deleteArea.rejected.match(resultAction)) {
      message.error('Update Area Status Fail!')
    }
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
      title: 'Created Date',
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
