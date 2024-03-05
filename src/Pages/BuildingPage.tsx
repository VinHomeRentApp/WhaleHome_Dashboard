import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../redux/store'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Input, Table, TableProps } from 'antd'
import { useSelector } from 'react-redux'
import { getBuildingList } from '../redux/building.slice'

const BuildingPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const loading = useSelector((state: RootState) => state.building.loading)
  const [search, setSearch] = useState<string>('')

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
      width: '8%',
      align: 'center'
    },
    {
      title: 'Area',
      dataIndex: 'zone',
      key: 'id',
      width: '8%',
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
      dataIndex: 'name',
      key: 'id',
      width: '8%',
      align: 'center',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(String(value).toLowerCase())
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
      title: 'Status',
      dataIndex: 'status',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (record) => String(record)
    },
    {
      title: 'Action',
      key: 'id',
      width: '7%',
      render: () => {
        return (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <EditOutlined />
            <DeleteOutlined style={{ color: 'red' }} />
          </div>
        )
      }
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm theo tên'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button style={{ width: '10%' }} type='primary' block>
          Add New Zone
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
        bordered
      />
    </>
  )
}

export default BuildingPage
