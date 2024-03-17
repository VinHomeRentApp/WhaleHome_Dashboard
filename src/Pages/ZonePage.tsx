/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, Modal, Select, Switch, Table, TableProps, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getArea } from '../redux/actions/area.actions'
import { createZone, deleteZone, getZoneList, updateZone } from '../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { cancelEditingZone, startEditingZone } from '../redux/slices/zone.slice'
import { zone } from '../types/zone.type'

const formData: zone = {
  id: NaN,
  createDate: '',
  status: true,
  name: '',
  area: {
    id: NaN,
    createDate: '',
    status: false,
    name: ''
  }
}

const ZonePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const editingZone = useSelector((state: RootState) => state.zone.editingZone)
  const loading = useSelector((state: RootState) => state.zone.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<zone>(formData)
  const [modalAdd, setModalAdd] = useState<boolean>(false)

  const areaList = useSelector((state: RootState) => state.area.areaList)

  useEffect(() => {
    const promise = dispatch(getZoneList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    const promise = dispatch(getArea())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    setModalData(editingZone || formData)
  }, [editingZone])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
      align: 'center',
      sorter: {
        compare: (a: zone, b: zone) => a.id - b.id
      },
      defaultSortOrder: 'ascend',
      sortDirections: ['descend', 'ascend']
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
      key: 'id',
      width: '8%',
      align: 'center',
      render: (r) => String(r.name),
      filteredValue: [search],
      onFilter: (value, record: zone) => {
        return (
          String(record.name).toLowerCase().includes(String(value).toLowerCase()) ||
          String(record.area.name.toLowerCase()).includes(String(value))
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
      width: '7%',
      align: 'center',
      render: (record) => {
        return (
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModal(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
          </div>
        )
      }
    }
  ]

  async function handleDelte(id: number) {
    const resultAction = await dispatch(deleteZone(id))
    if (deleteZone.fulfilled.match(resultAction)) {
      message.success('Update Zone Status Successfully!')
    } else if (deleteZone.rejected.match(resultAction)) {
      message.error('Update Zone Status Fail!')
    }
  }

  function handleOpenModal(id: number) {
    setModal(true)
    dispatch(startEditingZone(id))
  }
  const handleOkEdit = () => {
    setModal(false)
    dispatch(updateZone({ id: modalData.id, body: modalData }))
    dispatch(cancelEditingZone())
    setModalData(formData)
  }
  const handleCancel = () => {
    setModal(false)
    dispatch(cancelEditingZone())
    setModalData(formData)
  }
  const handleCancelAdd = () => {
    setModalAdd(false)
    setModalData(formData)
  }
  const handleOkAdd = () => {
    if (modalData.name.trim() !== '' && !isNaN(modalData.area.id)) {
      setModalAdd(false)
      dispatch(createZone(modalData))
      dispatch(cancelEditingZone())
    } else return
  }

  const handleSelectZone = (e: any) => {
    setModalData((curr) => ({
      ...curr,
      area: {
        ...curr.area,
        id: Number(e)
      }
    }))
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
        <Button
          style={{ width: '10%' }}
          type='primary'
          block
          onClick={() => {
            setModalAdd(true)
          }}
        >
          Add New Zone
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={zoneList}
        loading={loading}
        pagination={{
          pageSize: 6
        }}
        rowKey='id'
        bordered
      />
      <Modal title='Edit Zone' open={modal} onOk={handleOkEdit} onCancel={handleCancel}>
        <Input placeholder='input name' value={modalData.id} disabled />
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value.trim() }))}
          value={modalData.name}
        />

        <Typography.Title level={5}>Area</Typography.Title>
        <Select
          style={{ minWidth: 150 }}
          onChange={handleSelectZone}
          options={areaList?.map((area) => {
            return { value: area.id, label: area.name }
          })}
          value={modalData.area.id}
        />
        <Typography.Title level={5}>Status</Typography.Title>
        <Checkbox
          onChange={(e) => setModalData((data) => ({ ...data, status: e.target.value }))}
          checked={modalData.status}
        />
      </Modal>

      <Modal title='Add Zone' open={modalAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
          value={modalData.name}
        />

        <Typography.Title level={5}>Area</Typography.Title>

        <Select
          style={{ minWidth: 150 }}
          onChange={handleSelectZone}
          options={areaList?.map((area) => {
            return { value: area.id, label: area.name }
          })}
        />
      </Modal>
    </>
  )
}

export default ZonePage
