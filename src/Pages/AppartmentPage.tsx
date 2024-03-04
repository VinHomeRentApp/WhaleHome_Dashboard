import { Input, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { appartment /*area_c, building, zone*/ } from '../types/appartment.type'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
import ButtonAction from '../Components/ButtonAction'
// import ButtonAction from '../Components/ButtonAction'

const AppartmentPage: React.FC = () => {
  const [data, setDataSource] = useState<appartment[]>([])
  // const [zone, setZone] = useState<zone[]>([])
  // const [building, setBuilding] = useState<building[]>([])
  // const [area, setArea] = useState<area_c[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  async function getAppartment() {
    try {
      setLoading(true)
      const response = await http.get<ResponseSuccessful<appartment[]>>('/apartments/get-all-details', {
        headers: {
          Accept: 'application/json'
        }
      })
      setDataSource(response.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  // async function getZone() {
  //   try {
  //     setLoading(true)
  //     const response = await http.get<ResponseSuccessful<zone[]>>('/zone', {
  //       headers: {
  //         Accept: 'application/json'
  //       }
  //     })
  //     setLoading(false)

  //     setZone(response.data.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function getBuilding() {
  //   try {
  //     setLoading(true)
  //     const response = await http.get<ResponseSuccessful<building[]>>('/buildings', {
  //       headers: {
  //         Accept: 'application/json'
  //       }
  //     })
  //     setLoading(false)

  //     setBuilding(response.data.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // async function getArea() {
  //   try {
  //     setLoading(true)
  //     const response = await http.get<ResponseSuccessful<area_c[]>>('/areas', {
  //       headers: {
  //         Accept: 'application/json'
  //       }
  //     })
  //     setLoading(false)
  //     setArea(response.data.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    getAppartment()
    // getZone()
    // getBuilding()
    // getArea()
  }, [])

  const columns: TableProps['columns'] = [
    {
      title: 'Area',
      dataIndex: 'area_c',
      key: 'id',
      // filters: area.map((z) => ({
      //   text: String(z.name),
      //   value: String(z.name)
      // })),
      // onFilter: (value, record: appartment) => String(record.name).includes(String(value)),
      width: '5%',
      align: 'center',
      render: (record) => String(record.name)
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'id',
      // filters: zone.map((z) => ({
      //   text: z.name,
      //   value: z.name
      // })),
      // onFilter: (value, record) => {
      //   return String(record.name).includes(String(value))
      // },
      width: '8%',
      align: 'center',
      render: (record) => String(record.name)
    },
    {
      title: 'Building',
      dataIndex: 'building',
      key: 'id',
      // filters: building.map((b) => ({
      //   text: b.name,
      //   value: b.name
      // })),
      // onFilter: (value, record) => {
      //   return String(record.name).includes(String(value))
      // },
      width: '8%',
      align: 'center',
      render: (record) => String(record.name)
    },
    {
      title: 'Name Apartment',
      dataIndex: 'name',
      key: 'id',
      width: '10%',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(String(value).toLowerCase())
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'id',
      width: '10%',
      render: (text: string) => <div style={{ whiteSpace: 'nowrap', width: 'auto', overflow: 'auto' }}>{text}</div>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'id',
      width: '5%',
      render: (text) => String(text)
    },
    {
      title: 'More',
      dataIndex: 'user',
      key: 'id',
      width: '7%',
      render: (_, record) => <ButtonAction ID={record.id} />
    }
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm theo tên phòng'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 7
        }}
        scroll={{ y: 400 }}
        loading={loading}
        rowKey='id'
        bordered
      />
    </>
  )
}

export default AppartmentPage
