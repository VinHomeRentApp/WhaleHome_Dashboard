import { Input, Table, TableProps } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProblemList } from '../redux/actions/problem.action'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { problem } from '../types/problem.type'

export default function AreaPage() {
  const dispatch = useAppDispatch()
  // const problemEditing = useSelector((state: RootState) => state.problem.editProblem)
  const data = useSelector((state: RootState) => state.problem.problemList)
  const loading = useSelector((state: RootState) => state.problem.loading)

  useEffect(() => {
    const promise = dispatch(getProblemList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      sorter: {
        compare: (a: problem, b: problem) => a.id - b.id
      },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'CreateDate',
      key: 'id',
      align: 'center',
      width: '10%',
      dataIndex: 'createDate'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'id',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'id',
      align: 'center',
      width: '6%'
    },
    {
      title: 'issues',
      key: 'id',
      align: 'center',
      width: '6%',
      render: (record: problem) => record.issues?.map((issue) => <div key={issue.id}>{issue.name},</div>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'id',
      align: 'center',
      width: '6%',
      render: (record) => String(record)
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search style={{ width: '30%' }} placeholder='Tìm kiếm theo tên' />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        loading={loading}
        rowKey='id'
        bordered
      />
    </>
  )
}
