import { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../redux/store'
import { cancelEditingArea, createArea, deleteArea, getArea, startEditingArea, updateArea } from '../redux/area.slice'
import { EditOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, Modal, Switch, Table, TableProps, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { area } from '../types/area.type'

const formData: area = {
  name: '',
  createDate: '',
  status: true,
  id: NaN
}

export default function AreaPage() {
  const dispatch = useAppDispatch()
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const areaEditing = useSelector((state: RootState) => state.area.editArea)
  const loading = useSelector((state: RootState) => state.area.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<area>(formData)
  const [modalAdd, setModalAdd] = useState<boolean>(false)

  useEffect(() => {
    const promise = dispatch(getArea())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    setModalData(areaEditing || formData)
  }, [areaEditing])

  const columns: TableProps['columns'] = [
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

  function handleDelte(id: number) {
    console.log(id)

    dispatch(deleteArea(id))
  }

  function handleOpenModal(id: number) {
    setModal(true)
    dispatch(startEditingArea(id))
  }
  const handleOk = () => {
    setModal(false)
    dispatch(updateArea({ areaId: modalData.id, body: modalData }))
  }
  const handleCancel = () => {
    setModal(false)
    dispatch(cancelEditingArea())
  }
  const handleCancelAdd = () => {
    setModalAdd(false)
  }
  const handleOkAdd = () => {
    setModalAdd(false)
    dispatch(createArea(modalData.name))
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
          Add New Area
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={areaList}
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
