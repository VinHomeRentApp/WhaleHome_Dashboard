import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../redux/store'
import { EditOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, Modal, Switch, Table, TableProps, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { cancelEditingBuilding, getBuildingList, startEditBuilding } from '../redux/building.slice'
import { building } from '../types/building.type'

const formData: building = {
  id: NaN,
  name: '',
  zone: {
    id: NaN,
    area: {
      id: NaN
    }
  }
}

const BuildingPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const loading = useSelector((state: RootState) => state.building.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [modalData, setModalData] = useState<building>(formData)
  const editBuilding = useSelector((state: RootState) => state.building.editingBuilding)

  useEffect(() => {
    const promise = dispatch(getBuildingList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    setModalData(editBuilding || formData)
    console.log(modalData)
  }, [editBuilding, modalData])

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
      title: 'Action',
      key: 'id',
      width: '7%',
      render: (record: building) => {
        return (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
          </div>
        )
      }
    }
  ]

  const handleDelte = (id: number) => {
    console.log(id)
  }

  const handleOpenModalEdit = (id: number) => {
    setModal(true)
    dispatch(startEditBuilding(id))
  }

  const handleOk = () => {
    setModal(false)
    dispatch(cancelEditingBuilding())
  }
  const handleCancel = () => {
    setModal(false)
    dispatch(cancelEditingBuilding())
  }

  const handleOkAdd = () => {
    setModalAdd(false)
    dispatch(cancelEditingBuilding())
  }

  const handleCancelAdd = () => {
    setModalAdd(false)
    dispatch(cancelEditingBuilding())
  }
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
        <Button style={{ width: '10%' }} type='primary' block onClick={() => setModalAdd(true)}>
          Add New Zone
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={buildingList}
        loading={loading}
        pagination={{
          pageSize: 5
        }}
        rowKey='id'
        bordered
      />

      <Modal title='Edit Building' open={modal} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Title level={5}>ID</Typography.Title>
        <Input
          placeholder='input name'
          value={modalData.id}
          onChange={(e) => setModalData((data) => ({ ...data, id: Number(e.target.value) }))}
          disabled
        />
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          value={modalData.name}
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
        />
        <Typography.Title level={5}>Status</Typography.Title>
        <Checkbox
          onChange={(e) => setModalData((data) => ({ ...data, status: e.target.value }))}
          checked={modalData.status}
        />
      </Modal>

      <Modal title='Add Area' open={modalAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
          value={modalData.name}
        />
      </Modal>
    </>
  )
}

export default BuildingPage
