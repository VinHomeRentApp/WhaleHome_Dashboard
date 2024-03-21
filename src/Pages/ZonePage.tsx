/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from '@ant-design/icons'
import { Button, Input, Switch, Table, TableProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { typoColor } from '../constants/mainColor'
import { getArea } from '../redux/actions/area.actions'
import { deleteZone, getZoneList } from '../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { startEditingZone } from '../redux/slices/zone.slice'
import { zone } from '../types/zone.type'
import ZoneModal from './Dashboard/ZonePage/ModalFormZone'

const ZonePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const editingZone = useSelector((state: RootState) => state.zone.editingZone)
  const loading = useSelector((state: RootState) => state.zone.loading)
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

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
          style={{ width: '10%', color: typoColor.mainBackground }}
          type='primary'
          block
          onClick={() => {
            setModal(true)
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
          pageSize: 7
        }}
        rowKey='id'
        bordered
      />
      <ZoneModal isOpenModal={modal} setOpenModal={setModal} zone={editingZone} />
    </>
  )
}

export default ZonePage
