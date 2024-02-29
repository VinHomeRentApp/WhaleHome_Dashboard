import { Table, TableProps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Post } from '../types/post.type'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'

const RecentPost: React.FC = () => {
  const colums: TableProps['columns'] = [
    {
      title: 'Title',
      dataIndex: 'description',
      key: 'id'
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
      console.log(response)

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
