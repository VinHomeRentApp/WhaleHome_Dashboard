import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd'
import { http } from '../../utils/http'
import { ResponseSuccessful } from '../../types/response.type'
import { User } from '../../types/user.type'
interface DataType {
  id: number
  fullName: string
  email: string
  password: string
  dataOfBirth: string
  address: string
  verified: boolean
}

const columns: TableProps<DataType>['columns'] = [
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
  async function getUsers() {
    try {
      const response = await http.get<ResponseSuccessful<User[]>>('/user', {
        headers: {
          Accept: 'application/json'
        }
      })
      setDataSource(response.data.data)
      return response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const dataFormat = dataSource.map((data: DataType) => {
    return {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      dataOfBirth: data.dataOfBirth,
      address: data.address,
      verified: data.verified
    }
  })
  return <Table columns={columns} dataSource={dataFormat} scroll={{ y: 400 }} />
}

export default User
