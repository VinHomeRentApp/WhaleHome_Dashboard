import { useState, useEffect } from 'react'
import { Table, TableProps, Typography } from 'antd'
import { Post } from '../types/post.type'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'

const RecentPost: React.FC = () => {
  const colums: TableProps['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'id'
    },
    {
      title: 'createBy',
      dataIndex: 'createBy',
      key: 'createBy'
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'createDate'
    }
  ]

  const [dataSource, setDataSource] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  async function getPost() {
    try {
      setLoading(true)
      const response = await http.get<ResponseSuccessful<Post[]>>('/post', {
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
    getPost()
  }, [])
  return (
    <>
      <Typography.Text strong>Recent Post</Typography.Text>
      <Table
        columns={colums}
        loading={loading}
        dataSource={dataSource}
        scroll={{ y: 200 }}
        pagination={{
          pageSize: 4,
          hideOnSinglePage: true
        }}
        rowKey='id'
      ></Table>
    </>
  )
}

export default RecentPost
