import { Table, TableProps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { post } from '../types/post.type'
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

  const [dataSource, setDataSource] = useState<post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function getPost() {
    try {
      setLoading(true)
      const response = await http.get<ResponseSuccessful<post[]>>('/post', {
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
    <div style={{ marginTop: 150 }}>
      <Typography.Text strong>Recent Post</Typography.Text>
      <Table
        columns={colums}
        loading={loading}
        dataSource={dataSource}
        pagination={{
          pageSize: 7,
          hideOnSinglePage: true
        }}
        rowKey='id'
      ></Table>
    </div>
  )
}

export default RecentPost
