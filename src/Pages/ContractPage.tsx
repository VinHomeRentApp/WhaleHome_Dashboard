import {
  AutoComplete,
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  TableProps,
  Tag,
  Typography
} from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React, { useEffect, useState } from 'react'
import ButtonAction from '../Components/UI/ButtonAction'
import { contract, contractHistory } from '../types/contract.type'
import { useSelector } from 'react-redux'
import { createContract, getContractList } from '../redux/actions/contract.action'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { searchUser } from '../redux/actions/user.actions'
import { appointments } from '../types/appointments.type'

const formData: contract = {
  id: NaN,
  contractHistory: {
    price: NaN,
    description: '',
    expiredTime: '',
    users: {
      id: NaN,
      image: ''
    }
  },
  dateSign: '',
  description: '',
  dateStartRent: '',
  appointmentId: NaN
}

const ContractPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const searchUserData = useSelector((state: RootState) => state.user.searchUserIncludeAppointment)
  const [searchUserState, setSearchUserState] = useState<appointments[]>(searchUserData)
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [modalData, setModalData] = useState<contract>(formData)
  const [startDate, setStartDate] = useState(null)
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.contract.contractList)
  const loading = useSelector((state: RootState) => state.contract.loading)

  useEffect(() => {
    const promise = dispatch(getContractList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    setSearchUserState(searchUserData)
  }, [searchUserData])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      sorter: {
        compare: (a: contract, b: contract) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Contract',
      key: 'id',
      width: '10%',
      align: 'center',
      render: (r: contract) => String(r.description),
      filteredValue: [search],
      onFilter: (value, record: contract) => {
        return (
          record.description.toLowerCase().includes(String(value).toLowerCase()) ||
          String(record.contractHistory.users.fullName).toLowerCase().includes(String(value).toLowerCase())
        )
      }
    },
    {
      title: 'Date Sign',
      dataIndex: 'dateSign',
      key: 'id',
      width: '8%',
      align: 'center'
    },
    {
      title: 'Date Start Rent',
      dataIndex: 'dateStartRent',
      key: 'id',
      width: '8%',
      align: 'center'
    },
    {
      title: 'Expired Time',
      dataIndex: 'contractHistory',
      width: '10%',
      key: 'id',
      render: (record: contractHistory) => String(record.expiredTime)
    },
    {
      title: 'Status Of Contract',
      dataIndex: 'contractHistory',
      key: 'id',
      align: 'center',
      width: '10%',
      render: (record: contractHistory) => {
        const now = new Date()
        const expiredTime = new Date(record.expiredTime)
        if (expiredTime > now) {
          return <Tag color={'blue'}>Còn hiệu lực</Tag>
        }
        return <Tag color={'red'}>Đã hết hạn</Tag>
      }
    },

    {
      title: 'Apartment',
      children: [
        {
          title: 'Area',
          key: 'id',
          width: '5%',
          align: 'center',
          render: (record: contract) => String(record.areaName)
        },
        {
          title: 'Zone',
          key: 'id',
          width: '8%',
          align: 'center',
          render: (record: contract) => String(record.zoneName)
        },
        {
          title: 'Building',
          key: 'id',
          width: '7%',
          align: 'center',
          render: (record: contract) => String(record.buildingName)
        },
        {
          title: 'RoomName',
          key: 'id',
          width: '6%',
          align: 'center',
          render: (record: contract) => String(record.apartmentName)
        }
      ]
    },
    {
      title: 'Renter',
      dataIndex: 'contractHistory',
      key: 'id',
      align: 'center',
      width: '12%',
      render: (record: contractHistory) => (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Avatar size='default' src={record.users.image}></Avatar>
          <span>{record.users.fullName}</span>
        </div>
      )
    },
    {
      title: 'More',
      dataIndex: 'user',
      key: 'id',
      width: '6%',
      render: (_, record) => <ButtonAction ID={record.id} />
    }
  ]

  const dateFormat = 'YYYY-MM-DD'

  const handleCancelAdd = () => {
    setModalAdd(false)
  }
  const handleOkAdd = () => {
    setModalAdd(false)
    dispatch(createContract(modalData))
    setModalData(formData)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputDescription = (e: any) => {
    setModalData((prevData) => ({
      ...prevData,
      description: e.target.value,
      contractHistory: {
        ...prevData.contractHistory,
        description: e.target.value
      }
    }))
  }

  const handleSearchUser = (e: string) => {
    dispatch(searchUser(e))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChangeExpired = (_: any, dateString: string) => {
    setModalData((data) => ({
      ...data,
      contractHistory: { ...data.contractHistory, expiredTime: dateString }
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChangeSign = (_: any, dateString: string) => {
    setModalData((data) => ({
      ...data,
      dateSign: dateString
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateStartChange = (date: any, dateString: string) => {
    setStartDate(date)
    setModalData((data) => ({
      ...data,
      dateStartRent: dateString
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangePrice = (e: any) => {
    setModalData((data) => ({
      ...data,
      contractHistory: { ...data.contractHistory, price: e }
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const disabledEndDate = (current: any) => {
    // Disable dates after the selected start date
    if (startDate) return current && current < startDate
  }

  const handleSelectAppointment = (e: number) => {
    setModalData((data) => ({ ...data, appointmentId: e }))
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Search'
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
          Add New
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 4
        }}
        scroll={{ y: 400 }}
        loading={loading}
        rowKey='id'
        bordered
      />

      <Modal title='Add Contract' open={modalAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <div style={{ display: 'flex', gap: '5%' }}>
          <div style={{ width: '50%' }}>
            <Typography.Title level={5}>Description</Typography.Title>
            <Input.TextArea placeholder='input name' value={modalData.description} onChange={handleInputDescription} />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Title level={5}>User</Typography.Title>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder='input name'
              options={searchUserState.map((user) => ({
                label: (
                  <div>
                    <img style={{ width: 20, height: 20 }} src={user.users.image} alt={user.users.fullName} />
                    {user.users.fullName}
                  </div>
                ),
                value: Number(user.users.id)
              }))}
              onSearch={(e) => {
                handleSearchUser(e)
              }}
              onSelect={(e) =>
                setModalData((data) => ({
                  ...data,
                  contractHistory: { ...data.contractHistory, users: { ...data.contractHistory.users, id: e } }
                }))
              }
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <Typography.Title level={5}>Appointment</Typography.Title>
          <Select
            style={{ minWidth: 300 }}
            onChange={handleSelectAppointment}
            options={searchUserState.map((appointments) => {
              return { value: appointments.apartment.id, label: <div>{appointments.apartment.description}</div> }
            })}
            // value={modalData.zone.area.id}
          />
        </div>
        <div style={{ display: 'flex', gap: '5%' }}>
          <div style={{ width: '45%' }}>
            <Typography.Title level={5}>Date Start Rent</Typography.Title>
            <DatePicker style={{ width: '80%' }} format={dateFormat} onChange={handleDateStartChange} />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Title level={5}>Expired Time</Typography.Title>
            <DatePicker
              style={{ width: '80%' }}
              format={dateFormat}
              onChange={handleDateChangeExpired}
              disabledDate={disabledEndDate}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '5%' }}>
          <div style={{ width: '45%' }}>
            <Typography.Title level={5}>Date Sign</Typography.Title>
            <DatePicker style={{ width: '80%' }} format={dateFormat} onChange={handleDateChangeSign} />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Title level={5}>Price</Typography.Title>
            <InputNumber min={0} defaultValue={0} onChange={handleChangePrice} controls={false} required={true} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ContractPage
