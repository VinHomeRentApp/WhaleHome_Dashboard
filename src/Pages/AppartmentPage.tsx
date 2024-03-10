import { EditOutlined } from '@ant-design/icons'
import { Input, Modal, Select, Switch, Table, TableProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getApartmentList } from '../redux/actions/apartment.actions'
import { getApartmentClassList } from '../redux/actions/apartmentClass.action'
import { getArea } from '../redux/actions/area.actions'
import { getBuildingList } from '../redux/actions/building.actions'
import { getZoneList } from '../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { cancelEditingApartment, startEditingApartment } from '../redux/slices/apartment.slice'
import { apartment } from '../types/appartment.type'
import { building } from '../types/building.type'
import { zone } from '../types/zone.type'

const formData: apartment = {
  id: NaN,
  createDate: '',
  status: false,
  name: '',
  description: '',
  living_room: NaN,
  bed_room: NaN,
  kitchen: NaN,
  rest_room: NaN,
  floor: NaN,
  area: NaN,
  air_conditioner: NaN,
  electric_fan: NaN,
  television: NaN,
  electric_stoves: NaN,
  gas_stoves: NaN,
  apartmentClass: {
    id: NaN,
    name: '',
    status: false
  },
  building: {
    id: NaN,
    status: true,
    zone: {
      id: NaN,
      status: true,
      area: {
        id: NaN,
        status: true
      }
    }
  }
}

const ApartmentPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.apartment.apartmentList)
  const loading = useSelector((state: RootState) => state.apartment.loading)
  const [search, setSearch] = useState<string>('')
  const [modalData, setModalData] = useState<apartment>(formData)
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
  const editModalData = useSelector((state: RootState) => state.apartment.editApartment)

  const areaList = useSelector((state: RootState) => state.area.areaList)
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const buildingList = useSelector((state: RootState) => state.building.buildingList)

  const [areaID, setAreaID] = useState<number>(NaN)
  const [zoneID, setZoneID] = useState<number>(NaN)
  const [buildingListFilter, setBuildingListFilter] = useState<building[]>(buildingList)

  const [zoneListfilter, setZoneListfilter] = useState<zone[]>(zoneList)
  const apartmentClass = useSelector((state: RootState) => state.apartmentClass.apartmentClassList)

  const ZoneListFilterFunc = (e: number) => zoneList.filter((z) => z.area.id == e)

  // const BuildingListFilterFunc = (idArea: number, idZone: number) =>
  //   buildingList.filter((building) => building.zone.area.id == idArea && building.zone.id == idZone)

  useEffect(() => {
    if (zoneID & areaID) {
      setBuildingListFilter(
        buildingListFilter.filter((building) => building.zone.area.id == areaID && building.zone.id == zoneID)
      )
    } else if (zoneID) {
      setBuildingListFilter(buildingListFilter.filter((building) => building.zone.id == zoneID))
    } else if (areaID) {
      setBuildingListFilter(buildingListFilter.filter((building) => building.zone.area.id == areaID))
    } else {
      setBuildingListFilter(buildingList)
    }
  }, [areaID, zoneID])

  useEffect(() => {
    setModalData(editModalData || formData)
  }, [editModalData])

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
    dispatch(getBuildingList())
    dispatch(getApartmentClassList())
    const promise = dispatch(getApartmentList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
      sorter: {
        compare: (a: apartment, b: apartment) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Area',
      key: 'id',
      // filters: data.map((z) => ({
      //   text: String(z.area_c.name),
      //   value: String(z.area_c.name)
      // })),
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      width: '5%',
      align: 'center',
      render: (record: apartment) => String(record.building.zone.area.name)
    },
    {
      title: 'Zone',
      key: 'id',
      // filters: zone.map((z) => ({
      //   text: z.name,
      //   value: z.name
      // })),
      // onFilter: (value, record) => {
      //   return String(record.name).includes(String(value))
      // },
      width: '8%',
      align: 'center',
      render: (record: apartment) => String(record.building.zone.name)
    },
    {
      title: 'Building',
      key: 'id',
      // filters: building.map((b) => ({
      //   text: b.name,
      //   value: b.name
      // })),
      // onFilter: (value, record) => {
      //   return String(record.name).includes(String(value))
      // },
      width: '8%',
      align: 'center',
      render: (record: apartment) => String(record.building.name)
    },
    {
      title: 'Name Apartment',
      key: 'id',
      width: '10%',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(String(value).toLowerCase())
      },
      render: (record: apartment) => String(record.name)
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'id',
      width: '10%',
      render: (text: string) => <div style={{ whiteSpace: 'nowrap', width: 'auto', overflow: 'auto' }}>{text}</div>
    },
    {
      title: 'Action',
      key: 'id',
      width: '5%',
      align: 'center',
      render: (record: apartment) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
          </div>
        )
      }
    }
  ]

  const handleOpenModalEdit = (id: number) => {
    dispatch(startEditingApartment(id))
    setIsModalEdit(true)
  }
  const handleDelte = (id: number) => {
    console.log(id)
  }

  const handleOk = () => {
    setIsModalEdit(false)
    dispatch(cancelEditingApartment())
  }
  const handleCancel = () => {
    setIsModalEdit(false)
    dispatch(cancelEditingApartment())
  }

  const handleSelectArea = (e: number) => {
    setModalData((curr) => ({
      ...curr,
      building: {
        ...curr.building,
        zone: {
          ...curr.building.zone,
          area: {
            ...curr.building.zone.area,
            id: e
          }
        }
      }
    }))
    setAreaID(e)
    setZoneListfilter(ZoneListFilterFunc(e))
  }

  const handleSelectZone = (e: number) => {
    setModalData((curr) => ({
      ...curr,
      building: {
        ...curr.building,
        zone: {
          ...curr.building.zone,
          id: e
        }
      }
    }))
    setZoneID(e)
  }

  const handleSelectBuilding = (e: number) => {
    setModalData((curr) => ({
      ...curr,
      building: {
        ...curr.building,
        id: e
      }
    }))
  }

  const handleSelectTypeApartment = () => {}
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm theo tên phòng'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        scroll={{ y: 400 }}
        loading={loading}
        rowKey='id'
        bordered
      />

      <Modal title='Edit Apartment' open={isModalEdit} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Title level={5}>ID</Typography.Title>
        <Input
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
        <Typography.Title level={5}>Description</Typography.Title>
        <Input
          placeholder='input Description'
          onChange={(e) => setModalData((data) => ({ ...data, description: e.target.value }))}
          value={modalData.description}
        />

        <Typography.Title level={5}>Area</Typography.Title>
        <Select
          defaultValue={editModalData?.building.zone.area.id || 1}
          style={{ minWidth: 150 }}
          onChange={handleSelectArea}
          options={areaList.map((area) => {
            return { value: area.id, label: area.name }
          })}
        />

        <Typography.Title level={5}>Zone</Typography.Title>
        <Select
          defaultValue={editModalData?.building.zone.id}
          style={{ minWidth: 150 }}
          onChange={handleSelectZone}
          options={
            zoneListfilter != null
              ? zoneListfilter.map((zone) => {
                  return { value: zone.id, label: zone.name }
                })
              : zoneList.map((zone) => {
                  return { value: zone.id, label: zone.name }
                })
          }
        />

        <Typography.Title level={5}>Building</Typography.Title>
        <Select
          defaultValue={editModalData?.building.id}
          style={{ minWidth: 150 }}
          onChange={handleSelectBuilding}
          options={buildingListFilter.map((b) => {
            return { value: b.id, label: b.name }
          })}
        />

        <Typography.Title level={5}>Type Apartment</Typography.Title>
        <Select
          defaultValue={1}
          style={{ minWidth: 150 }}
          onChange={handleSelectTypeApartment}
          options={apartmentClass.map((b) => {
            return { value: b.id, label: b.name }
          })}
        />
      </Modal>
    </>
  )
}

export default ApartmentPage
