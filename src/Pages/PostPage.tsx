// import { useState } from 'react'
// import { Table, TableProps, Typography } from 'antd'
// import { Post } from '../types/post.type'

// const PostPage: React.FC = () => {
//   const colums: TableProps['columns'] = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'id'
//     },
//     {
//       title: 'createBy',
//       dataIndex: 'createBy',
//       key: 'createBy'
//     },
//     {
//       title: 'createDate',
//       dataIndex: 'createDate',
//       key: 'createDate'
//     }
//   ]

//   const [dataSource, setDataSource] = useState<Post[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   //   async function getPost() {
//   //     try {
//   //       setLoading(true)
//   //       const response = await http.get<ResponseSuccessful<Post[]>>('/post', {
//   //         headers: {
//   //           Accept: 'application/json'
//   //         }
//   //       })
//   //       setDataSource(response.data.data)
//   //       setLoading(false)
//   //     } catch (error) {
//   //       console.log(error)
//   //     }
//   //   }

//   //   useEffect(() => {
//   //     getPost()
//   //   }, [])
//   // useEffect(FetchPost('/post/'))

//   return (
//     <>
//       <Typography.Text strong>Recent Post</Typography.Text>
//       <Table
//         columns={colums}
//         // loading={loading}
//         // dataSource={dataSource}
//         scroll={{ y: 200 }}
//         pagination={{
//           pageSize: 4,
//           hideOnSinglePage: true
//         }}
//         rowKey='id'
//       ></Table>
//     </>
//   )
// }

// export default PostPage

import React from 'react'

const PostPage: React.FC = () => {
  return <>PostPage</>
}

export default PostPage
