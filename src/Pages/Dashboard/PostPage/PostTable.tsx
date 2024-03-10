import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Dropdown, Switch, Table, TableProps } from 'antd'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { post } from '../../../types/post.type'

interface PostTableProps {
  data: post[]
  loading: boolean
  handleViewImage: (record: post) => void
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}

const PostTable: React.FC<PostTableProps> = ({ data, loading, handleViewImage, handleEdit, handleDelete }) => {
  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '3%',
      align: 'center',
      key: 'id'
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
      dataIndex: 'description',
      width: '13%',
      align: 'center',
      key: 'id'
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
            <EditOutlined onClick={() => handleEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelete(record.id)} />
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
      scroll={{ y: 500 }}
      pagination={{
        pageSize: 10,
        hideOnSinglePage: true
      }}
      rowKey={(data) => data.id}
      bordered
    />
  )
}

export default PostTable
