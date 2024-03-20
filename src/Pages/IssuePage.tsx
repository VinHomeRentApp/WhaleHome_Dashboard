import { Table, TableProps } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getIssueList } from '../redux/actions/issue.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { issue } from '../types/issue.type'

const ReviewPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.issue.issueList)
  const loading = useSelector((state: RootState) => state.issue.loading)

  useEffect(() => {
    dispatch(getIssueList())
  }, [dispatch])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      sorter: {
        compare: (a: issue, b: issue) => a.id - b.id
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
      title: 'name',
      dataIndex: 'name',
      key: 'id',
      align: 'center',
      width: '6%'
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        loading={loading}
        rowKey={'id'}
        bordered
      />
    </>
  )
}

export default ReviewPage
