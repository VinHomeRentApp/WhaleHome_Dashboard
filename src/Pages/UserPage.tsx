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
      width: '5%'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'id',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.fullName).toLowerCase().includes(String(value).toLowerCase())
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'id'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'id'
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'id'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'id'
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'id',
      width: '7%',
      render: (text) => String(text)
    },
    {
      title: 'More',
      dataIndex: 'user',
      key: 'id',
      width: '7%',
      render: (text, record) => <ButtonAction ID={record.id} text={text} />
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
          pageSize: 5
        }}
        loading={loading}
        rowKey='id'
      />
    </>
  )
}

export default UserPage
