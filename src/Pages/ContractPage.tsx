import { Input, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
import { contract, contractHistory } from '../types/contract.type'
import Avatar from 'antd/es/avatar/avatar'
import ButtonAction from '../Components/UI/ButtonAction'

const ContractPage: React.FC = () => {
  const [data, setDataSource] = useState<contract[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

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
    </>
  )
}

export default ContractPage
