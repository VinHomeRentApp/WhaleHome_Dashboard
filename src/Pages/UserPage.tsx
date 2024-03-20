import { EditOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Input, Switch, Table, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deactiveUser, getUsers } from '../redux/actions/user.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { startEdituser } from '../redux/slices/user.slice'
import { User, UserToken } from '../types/user.type'
import { handleErrorMessage } from '../utils/HandleError'
import ModalUpdateUser from './Dashboard/UserPage/UserModal'

const UserPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const { userList, isLoading, error, editUser } = useSelector((state: RootState) => state.user)
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'User' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      sorter: {
        compare: (a: User, b: User) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Full Name',
      key: 'id',
      align: 'center',
      filteredValue: [search],
      onFilter: (value, record) => {
        return (
          String(record.fullName).toLowerCase().includes(String(value).toLowerCase()) ||
          String(record.email).toLowerCase().includes(String(value).toLowerCase())
        )
      },
      render: (record: User) => String(record.fullName)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Role',
      width: '8%',
      key: 'id',
      align: 'center',
      render: (record: UserToken) => {
        //user token la do role ban dau la obj bay gio la string k dam dung vao sau de sua so loi~~~
        if (record.role === 'ADMIN') {
          return <Tag color={'magenta'}>{String(record.role).toUpperCase()}</Tag>
        }
        return <Tag color={'blue'}>{String(record.role).toUpperCase()}</Tag>
      }
    },
    {
      title: 'Verified',
      key: 'id',
      width: '8%',
      align: 'center',
      render: (record: User) => {
        if (record.verified === true) {
          return <Tag color={'blue'}>{String(record.verified).toUpperCase()}</Tag>
        }
        return <Tag color={'red'}>{String(record.verified).toUpperCase()}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'id',
      align: 'center',
      width: '10%',
      render: (record: User) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelete(record.id)} />
          </div>
        )
      }
    }
  ]

  const handleDelete = async (e: number) => {
    const resultAction = await dispatch(deactiveUser(e))
    if (deactiveUser.fulfilled.match(resultAction)) {
      message.success('Update User Status Successfully!')
    } else if (deactiveUser.rejected.match(resultAction)) {
      message.error('Update User Status Fail!')
    }
  }

  const handleOpenModalEdit = (e: number) => {
    setOpenModal(true)
    dispatch(startEdituser(e))
  }

  return (
    <>
      {contextHolder}
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
        dataSource={userList}
        pagination={{
          pageSize: 7
        }}
        loading={isLoading}
        rowKey='id'
        bordered
      />

      <ModalUpdateUser isOpenModal={openModal} userEdit={editUser} setOpenModal={setOpenModal} />
    </>
  )
}

export default UserPage
