/* eslint-disable no-unused-vars */
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Switch, Table, TableProps, message } from 'antd'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { updatePost } from '../../../redux/actions/post.actions'
import { useAppDispatch } from '../../../redux/containers/store'
import { post } from '../../../types/post.type'

interface PostTableProps {
  search: string
  data: post[] | undefined
  loading: boolean
  handleViewImage: (record: post) => void
  handleEdit: (post: post) => void
}

const PostTable: React.FC<PostTableProps> = ({ search, data, loading, handleViewImage, handleEdit }) => {
  const dispatch = useAppDispatch()

  const handlePressSwitch = (post: post, checked: boolean) => {
    dispatch(updatePost({ id: post.id, body: { title: post.title, description: post.description, status: checked } }))
    message.success('Update Status Successfully!')
  }

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '3%',
      align: 'center',
      key: 'id',
      sorter: {
        compare: (a: post, b: post) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '8%',
      align: 'center',
      key: 'id'
    },
    {
      title: 'Description',
      width: '13%',
      align: 'center',
      key: 'id',
      filteredValue: [search],
      render: (record: post) => String(record.description),
      onFilter: (value, record: post) => {
        return (
          String(record.id).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.description).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.apartment.name).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.apartment.building.name).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.apartment.building.zone.name).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.apartment.building.zone.area.name).toLowerCase().includes(value.toString().toLowerCase())
        )
      }
    },
    {
      title: 'Apartment',
      children: [
        {
          title: 'Area',
          key: uuidv4(),
          width: '4%',
          align: 'center',
          render: (record: post) => String(record.apartment.building.zone.area.name)
        },
        {
          title: 'Zone',
          key: uuidv4(),
          width: '6%',
          align: 'center',
          render: (record: post) => String(record.apartment.building.zone.name)
        },
        {
          title: 'Building',
          key: uuidv4(),
          width: '5%',
          align: 'center',
          render: (record: post) => String(record.apartment.building.name)
        },
        {
          title: 'Room Name',
          key: uuidv4(),
          width: '6%',
          align: 'center',
          render: (record: post) => String(record.apartment.name)
        }
      ]
    },
    {
      title: 'Images',
      width: '8%',
      align: 'center',
      render: (record: post) => (
        <Button onClick={() => handleViewImage(record)}>
          <EyeOutlined />
        </Button>
      )
    },
    {
      title: 'Action',
      key: 'id',
      width: '7%',
      render: (record: post) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleEdit(record)} />
            <Switch defaultChecked={record.status} onChange={(value) => handlePressSwitch(record, value)} />
          </div>
        )
      }
    }
  ]

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={data}
      pagination={{
        pageSize: 7,
        hideOnSinglePage: true
      }}
      rowKey={(data) => data.id}
      bordered
    />
  )
}

export default PostTable
