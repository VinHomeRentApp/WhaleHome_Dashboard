import { EditOutlined } from '@ant-design/icons'
import { Button, Input, Switch, Table, TableProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { typoColor } from '../constants/mainColor'
import { deleteBuilding, getBuildingList } from '../redux/actions/building.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { startEditBuilding } from '../redux/slices/building.slice'
import { building } from '../types/building.type'
import BuildingModal from './Dashboard/BuildingPage/BuildingModal'

const BuildingPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const loading = useSelector((state: RootState) => state.building.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const editBuilding = useSelector((state: RootState) => state.building.editingBuilding)

  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    const promise = dispatch(getBuildingList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '2%',
      align: 'center',
      sorter: {
        compare: (a: building, b: building) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Area',
      dataIndex: 'zone',
      key: 'id',
      width: '5%',
      align: 'center',
      render: (r) => String(r.area.name)
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (r) => String(r.name)
    },

    {
      title: 'Name Building',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (r) => String(r.name),
      filteredValue: [search],
      onFilter: (value, record: building) => {
        return (
          String(record.name).toLowerCase().includes(String(value).toLowerCase()) ||
          String(record.zone.name).toLowerCase().includes(String(value).toLowerCase()) ||
          String(record.zone.area.name).toLowerCase().includes(String(value).toLowerCase())
        )
      }
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'id',
      width: '8%',
      align: 'center'
    },
    {
      title: 'Action',
      key: 'id',
      width: '5%',
      align: 'center',
      render: (record: building) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelete(record.id)} />
          </div>
        )
      }
    }
  ]

  const handleDelete = async (id: number) => {
    const resultAction = await dispatch(deleteBuilding({ id: id }))
    if (deleteBuilding.fulfilled.match(resultAction)) {
      messageApi.success('Update Building Status Successfully!')
    } else if (deleteBuilding.rejected.match(resultAction)) {
      messageApi.error('Update Building Status Fail!')
    }
  }

  const handleOpenModalEdit = (id: number) => {
    setModal(true)
    dispatch(startEditBuilding(id))
  }

  return (
    <>
      {contextHolder}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm theo tên'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button
          style={{ width: '15%', color: typoColor.mainBackground }}
          type='primary'
          block
          onClick={() => setModal(true)}
        >
          Add New Building
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={buildingList}
        loading={loading}
        pagination={{
          pageSize: 7
        }}
        rowKey='id'
      />
      <BuildingModal building={editBuilding} isOpenModal={modal} setOpenModal={setModal} />
    </>
  )
}

export default BuildingPage
