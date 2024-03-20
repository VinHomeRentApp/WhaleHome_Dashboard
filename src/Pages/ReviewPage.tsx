import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getReviewList } from '../redux/actions/review.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import ColumnsReviewPages from './Settings/ColumnReviewPage'

const ReviewPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.review.reviewList)
  const loading = useSelector((state: RootState) => state.review.loading)

  useEffect(() => {
    dispatch(getReviewList())
  }, [dispatch])

  return (
    <>
      <Table
        columns={ColumnsReviewPages}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        loading={loading}
        rowKey='reviewId'
        bordered
      />
    </>
  )
}

export default ReviewPage
