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
      key: 'id'
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'id'
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
      // setDataSource(response.data) tam thoi vay do api chua config chuan

      console.log(response.data)

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
      <Table columns={colums} loading={loading} dataSource={dataSource} scroll={{ y: 200 }}></Table>
    </>
  )
}

export default RecentPost
