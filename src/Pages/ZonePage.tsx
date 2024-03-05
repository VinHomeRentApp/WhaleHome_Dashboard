import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../redux/store'
import { getZoneList } from '../redux/zone.slice'
import { EditOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, Modal, Switch, Table, TableProps, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { zone } from '../types/zone.type'

const formData: zone = {
  id: NaN,
  createDate: '',
  status: true,
  name: '',
  area: {
    id: NaN,
    createDate: '',
    status: true,
    name: ''
  }
}

const ZonePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const loading = useSelector((state: RootState) => state.zone.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<zone>(formData)
  const [modalAdd, setModalAdd] = useState<boolean>(false)

  useEffect(() => {
    const promise = dispatch(getZoneList())
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
      dataIndex: 'area',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (r) => String(r.name)
    },
    {
      title: 'Name',
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
      render: (record) => {
        return (
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModal(/*record.id*/)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
          </div>
        )
      }
    }
  ]

  function handleDelte(id: number) {
    // dispatch(deleteArea(id))
    console.log(id)
  }

  function handleOpenModal(/*id: number*/) {
    setModal(true)
    // dispatch(startEditingArea(id))
  }
  const handleOk = () => {
    setModal(false)
    // dispatch(updateArea({ areaId: modalData.id, body: modalData }))
  }
  const handleCancel = () => {
    setModal(false)
    // dispatch(cancelEditingArea())
  }
  const handleCancelAdd = () => {
    setModalAdd(false)
  }
  const handleOkAdd = () => {
    setModalAdd(false)
    // dispatch(createArea(modalData.name))
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
        <Button style={{ width: '10%' }} type='primary' block>
          Add New Zone
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={zoneList}
        loading={loading}
        pagination={{
          pageSize: 7
        }}
        rowKey='id'
        bordered
      />
      <Modal title='Edit Area' open={modal} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Title level={5}>ID</Typography.Title>
        <Input
          placeholder='input name'
          onChange={(e) => setModalData((data) => ({ ...data, id: Number(e.target.value) }))}
          value={modalData.id}
          disabled
        />
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
          value={modalData.name}
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

export default ZonePage