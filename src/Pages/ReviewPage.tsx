import { Avatar, Table, TableProps } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getReviewList } from '../redux/review.slice'
import { RootState, useAppDispatch } from '../redux/store'
import { reivew } from '../types/review.type'

const ReviewPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.review.reviewList)
  const loading = useSelector((state: RootState) => state.review.loading)

  useEffect(() => {
    dispatch(getReviewList())
  }, [dispatch])

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'reviewId',
      key: 'reviewId',
      width: '4%',
      align: 'center',
      sorter: {
        compare: (a: reivew, b: reivew) => a.reviewId - b.reviewId
      },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Content',
      key: 'reviewId',
      align: 'center',
      width: '10%',
      dataIndex: 'content'
    },
    {
      title: 'rate',
      dataIndex: 'rate',
      key: 'reviewId',
      align: 'center',
      width: '6%',
      render: (record) => <>{record} ⭐</>
    },
    {
      title: 'Apartment',
      children: [
        {
          title: 'Area',
          key: 'reviewId',
          width: '6%',
          align: 'center',
          render: (record: reivew) => String(record.apartmentName)
        },
        {
          title: 'Zone',
          key: 'reviewId',
          width: '8%',
          align: 'center',
          render: (record: reivew) => String(record.zoneName)
        },
        {
          title: 'Building',
          key: 'reviewId',
          width: '7%',
          align: 'center',
          render: (record: reivew) => String(record.buildingName)
        },
        {
          title: 'RoomName',
          key: 'reviewId',
          width: '6%',
          align: 'center',
          render: (record: reivew) => String(record.apartmentName)
        }
      ]
    },
    {
      title: 'User',
      key: 'reviewId',
      align: 'center',
      width: '10%',
      render: (record: reivew) => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar size='default' src={record.userImage}></Avatar>
          <span>{record.userName}</span>
        </div>
      )
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
        scroll={{ y: 400 }}
        loading={loading}
        rowKey='reviewId'
        bordered
      />
    </>
  )
}

export default ReviewPage
