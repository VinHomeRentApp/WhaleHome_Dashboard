import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'
import { User } from '../types/user.type'
import ButtonAction from '../Components/ButtonAction'
import { Input, Table } from 'antd'

const UserPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  async function getUsers() {
    try {
      setLoading(true)
      const response = await http.get<ResponseSuccessful<User[]>>('/user', {
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
    getUsers()
  }, [])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
      align: 'center',
      sorter: {
        compare: (a: User, b: User) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'id',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.fullName).toLowerCase().includes(String(value).toLowerCase())
      },
      render: (text: string) => <div style={{ whiteSpace: 'nowrap', width: 'auto' }}>{text}</div>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'id',
      render: (text: string) => <div style={{ whiteSpace: 'nowrap', width: 'auto', overflow: 'auto' }}>{text}</div>
    },

    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'id',
      width: '15%'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'id',
      width: '10%'
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'id',
      width: '7%',
      render: (text) => String(text)
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'id',
      width: '8%'
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
          placeholder='Tìm kiếm theo tên'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
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

export default UserPage
