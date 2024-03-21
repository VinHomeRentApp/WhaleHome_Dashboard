import { MoreOutlined } from '@ant-design/icons'
import { Button, Input, Table, TableProps, Tag } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getContractList } from '../redux/actions/contract.action'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { contract, contractHistory } from '../types/contract.type'
import ModalContract from './Dashboard/ContractPage/ContractModal'
import ContractModalDetail from './Dashboard/ContractPage/ContractModalDetail'

const ContractPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [selectedContract, setSelectedContract] = useState<contract | null>()
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.contract.contractList)
  const loading = useSelector((state: RootState) => state.contract.loading)
  //
  useEffect(() => {
    const promise = dispatch(getContractList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

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
          title: 'Room',
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
      title: 'Status of Payment',
      key: 'id',
      align: 'center',
      width: '10%',
      render: (record: contract) => {
        if (record.contractHistory.users.statusOfPayment) {
          return <Tag color={'green'}>Paid</Tag>
        }
        return <Tag color={'gray'}>Unpaid</Tag>
      }
    },
    {
      title: 'More',
      dataIndex: 'user',
      key: 'id',
      width: '6%',
      render: (_, record) => (
        <>
          <Button onClick={() => setSelectedContract(record)} type='default' shape='circle' icon={<MoreOutlined />} />
        </>
      )
    }
  ]

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
          block
          onClick={() => {
            setModalAdd(true)
          }}
        >
          Add New
        </Button>
      </div>

      <div>
        <ContractModalDetail selectedContract={selectedContract} setSelectedContract={setSelectedContract} />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        loading={loading}
        rowKey='id'
        bordered
      />

      <ModalContract isOpenModal={modalAdd} setOpenModal={setModalAdd} />
    </>
  )
}

export default ContractPage
