import { AutoComplete, Button, DatePicker, Input, InputNumber, Modal, Table, TableProps, Tag, Typography } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React, { useEffect, useState } from 'react'
import ButtonAction from '../Components/UI/ButtonAction'
import { contract, contractHistory } from '../types/contract.type'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'

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
  dateStartRent: ''
}

const ContractPage: React.FC = () => {
  const [data, setDataSource] = useState<contract[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [modalData, setModalData] = useState<contract>(formData)
  const [startDate, setStartDate] = useState(null)

  async function getContract() {
    try {
      setLoading(true)
      const response = await http.get<ResponseSuccessful<contract[]>>('/contracts', {
        headers: {
          Accept: 'application/json'
        }
      })
      setDataSource(response.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getContract()
  }, [])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
      align: 'center',
      sorter: {
        compare: (a: contract, b: contract) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Contract',
      dataIndex: 'description',
      key: 'id',
      width: '15%',
      align: 'center',
      filteredValue: [search],
      onFilter: (value, record) => {
        return record.description.toLowerCase().includes(String(value).toLowerCase())
      }
    },
    {
      title: 'Date Sign',
      dataIndex: 'dateSign',
      key: 'id',
      width: '7%',
      align: 'center'
    },
    {
      title: 'Date Start Rent',
      dataIndex: 'dateStartRent',
      key: 'id',
      width: '7%',
      align: 'center'
    },

    {
      title: 'Expired Time',
      dataIndex: 'contractHistory',
      width: '7%',
      key: 'id',
      render: (record: contractHistory) => String(record.expiredTime)
    },
    {
      title: 'Status Of Contract',
      dataIndex: 'contractHistory',
      key: 'id',
      width: '8%',
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
      title: 'Renter',
      dataIndex: 'contractHistory',
      key: 'id',
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
      width: '7%',
      render: (_, record) => <ButtonAction ID={record.id} />
    }
  ]

  const dateFormat = 'YYYY-MM-DD'

  const handleCancelAdd = () => {
    setModalAdd(false)
  }
  const handleOkAdd = () => {
    setModalAdd(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (_: any, dateString: string) => {
    console.log('Selected Date: ', dateString)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateStartChange = (date: any, dateString: string) => {
    console.log('Selected Date: ', dateString)
    setStartDate(date)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const disabledEndDate = (current: any) => {
    // Disable dates after the selected start date
    if (startDate) return current && current < startDate
  }
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
          pageSize: 7
        }}
        scroll={{ y: 400 }}
        loading={loading}
        rowKey='id'
        bordered
      />

      <Modal title='Add Contract' open={modalAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <div style={{ display: 'flex', gap: '5%' }}>
          <div style={{ width: '45%' }}>
            <Typography.Title level={5}>Description</Typography.Title>
            <Input.TextArea
              placeholder='input name'
              value={modalData.description}
              onChange={(e) => setModalData((data) => ({ ...data, description: e.target.value }))}
            />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Title level={5}>User</Typography.Title>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder='input name'
              options={[]}
              filterOption={true}
              onSearch={(e) => {
                console.log(e)
              }}
              onSelect={(e) => setModalData((data) => ({ ...data, description: e }))}
            />
          </div>
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
              onChange={handleDateChange}
              disabledDate={disabledEndDate}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '5%' }}>
          <div style={{ width: '45%' }}>
            <Typography.Title level={5}>Date Sign</Typography.Title>
            <DatePicker style={{ width: '80%' }} format={dateFormat} onChange={handleDateChange} />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Title level={5}>Price</Typography.Title>
            <InputNumber
              min={0}
              defaultValue={0}
              onChange={(e) => {
                console.log(e)
              }}
              controls={false}
              required={true}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ContractPage
