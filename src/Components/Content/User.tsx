import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd'
import { http } from '../../utils/http'
import { ResponseSuccessful } from '../../types/response.type'
import { User } from '../../types/user.type'

const columns: TableProps['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'id'
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
    dataIndex: 'dataOfBirth',
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
    render: (text) => String(text)
  }
]

const User: React.FC = () => {
  const [dataSource, setDataSource] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
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

  return <Table columns={columns} dataSource={dataSource} scroll={{ y: 400 }} loading={loading} />
}

export default User
