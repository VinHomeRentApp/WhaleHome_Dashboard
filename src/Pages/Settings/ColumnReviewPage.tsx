import { Avatar, TableProps } from 'antd'
import { review } from '../../types/review.type'

const ColumnsReviewPages: TableProps['columns'] = [
  {
    title: 'ID',
    dataIndex: 'reviewId',
    key: 'reviewId',
    width: '4%',
    align: 'center',
    sorter: {
      compare: (a: review, b: review) => a.reviewId - b.reviewId
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
        render: (record: review) => String(record.apartmentName)
      },
      {
        title: 'Zone',
        key: 'reviewId',
        width: '8%',
        align: 'center',
        render: (record: review) => String(record.zoneName)
      },
      {
        title: 'Building',
        key: 'reviewId',
        width: '7%',
        align: 'center',
        render: (record: review) => String(record.buildingName)
      },
      {
        title: 'RoomName',
        key: 'reviewId',
        width: '6%',
        align: 'center',
        render: (record: review) => String(record.apartmentName)
      }
    ]
  },
  {
    title: 'User',
    key: 'reviewId',
    align: 'center',
    width: '10%',
    render: (record: review) => (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar size='default' src={record.userImage}></Avatar>
        <span>{record.userName}</span>
      </div>
    )
  }
]

export default ColumnsReviewPages
