import { EditOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Select, Switch, Table, TableProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getArea } from '../redux/actions/area.actions'

import { createBuilding, deleteBuilding, getBuildingList, updateBuilding } from '../redux/actions/building.actions'
import { getZoneList } from '../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { cancelEditingBuilding, startEditBuilding } from '../redux/slices/building.slice'
import { building } from '../types/building.type'
import { zone } from '../types/zone.type'

const formData: building = {
  id: NaN,
  name: '',
  zone: {
    id: NaN,
    area: {
      id: NaN,
      createDate: '',
      status: false,
      name: ''
    },
    createDate: '',
    status: false,
    name: ''
  }
}

const BuildingPage: React.FC = () => {
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const areaList = useSelector((state: RootState) => state.area.areaList)

  const dispatch = useAppDispatch()
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const loading = useSelector((state: RootState) => state.building.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [modalData, setModalData] = useState<building>(formData)
  const editBuilding = useSelector((state: RootState) => state.building.editingBuilding)
  const [enable, setEnable] = useState<boolean>(true)

  const [zoneListFilter, setZoneListFilter] = useState<zone[]>(zoneList)

  // const [arealist] = useState<area[]>(useSelector((state: RootState) => state.area.areaList))

  const ZoneListFilterFunc = (e: number) => zoneList.filter((z) => z.area.id == e)

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
    const promise = dispatch(getBuildingList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleSelectArea = (e: number) => {
    setModalData((curr) => ({
      ...curr,
      zone: {
        ...curr.zone,
        area: {
          ...curr.zone.area,
          id: e
        }
      }
    }))
    setZoneListFilter(ZoneListFilterFunc(e))
    setEnable(false)

    console.log(zoneListFilter)
  }

  const handleSelectZone = (e: number) => {
    setModalData((curr) => ({
      ...curr,
      zone: {
        ...curr.zone,

        id: e
      }
    }))
  }

  useEffect(() => {
    setModalData(editBuilding || formData)
  }, [editBuilding])

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
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
          </div>
        )
      }
    }
  ]

  const handleDelte = (id: number) => {
    dispatch(deleteBuilding({ id: id }))
  }

  const handleOpenModalEdit = (id: number) => {
    setModal(true)
    dispatch(startEditBuilding(id))
  }

  const handleOk = () => {
    setModal(false)
    dispatch(cancelEditingBuilding())
    dispatch(updateBuilding({ id: modalData.id, body: modalData }))
  }
  const handleCancel = () => {
    setModal(false)
    dispatch(cancelEditingBuilding())
    setModalData(formData)
  }

  const handleOkAdd = () => {
    setModalAdd(false)
    setModalData(formData)
    setEnable(true)
    dispatch(createBuilding(modalData))
    dispatch(cancelEditingBuilding())
  }

  const handleCancelAdd = () => {
    setModalAdd(false)
    setModalData(formData)
    setEnable(true)
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
        <Button style={{ width: '15%' }} type='primary' block onClick={() => setModalAdd(true)}>
          Add New Building
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
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          value={modalData.name}
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
        />
        <Typography.Title level={5}>Area</Typography.Title>
        <Select
          style={{ minWidth: 150 }}
          onChange={handleSelectArea}
          options={areaList.map((area) => {
            return { value: area.id, label: area.name }
          })}
          value={modalData.zone.area.id}
        />

        <Typography.Title level={5}>Zone</Typography.Title>
        <Select
          style={{ minWidth: 150 }}
          onChange={handleSelectZone}
          options={zoneListFilter.map((z) => {
            return { value: z.id, label: z.name }
          })}
          value={modalData.zone.id}
        />
      </Modal>

      <Modal title='Add Area' open={modalAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          value={modalData.name}
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
        />
        <Typography.Title level={5}>Area</Typography.Title>
        <Select
          style={{ minWidth: 150 }}
          onChange={handleSelectArea}
          options={areaList.map((area) => {
            return { value: area.id, label: area.name }
          })}
        />

        <Typography.Title level={5}>Zone</Typography.Title>
        <Select
          style={{ minWidth: 150 }}
          onChange={handleSelectZone}
          disabled={enable}
          options={zoneListFilter.map((z) => {
            return { value: z.id, label: z.name }
          })}
        />
      </Modal>
    </>
  )
}

export default BuildingPage
