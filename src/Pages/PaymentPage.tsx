import { Input, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllPayments } from '../redux/actions/payment.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { issue } from '../types/issue.type'
import { Payment } from '../types/payment.type'

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const {
    payment: { allPaymentList, isLoading }
  } = useSelector((state: RootState) => state)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getAllPayments())
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
      key: 'createDate',
      align: 'center',
      width: '10%',
      dataIndex: 'createDate',
      filteredValue: [search],
      onFilter: (value, record: Payment) => {
        const lowerCaseValue = value.toString().toLowerCase()
        return (
          String(record.id).toLowerCase().includes(lowerCaseValue) ||
          String(record.content).toLowerCase().includes(lowerCaseValue) ||
          String(record.payment_time).toLowerCase().includes(lowerCaseValue) ||
          String(record.createDate).toLowerCase().includes(lowerCaseValue) ||
          String(record.total_price).toLowerCase().includes(lowerCaseValue)
        )
      }
    },

    {
      title: 'Pay Time',
      dataIndex: 'payment_time',
      key: 'id',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'id',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Price ($)',
      dataIndex: 'total_price',
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
      render: (record) => {
        if (record) {
          return <Tag color={'green'}>DONE PAID</Tag>
        } else {
          return <Tag color={'red'}>UNPAID</Tag>
        }
      }
    }
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Search'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={allPaymentList}
        pagination={{
          pageSize: 7
        }}
        loading={isLoading}
        rowKey={'id'}
        bordered
      />
    </>
  )
}

export default PaymentPage
