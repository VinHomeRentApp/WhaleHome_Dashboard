import { EditOutlined } from '@ant-design/icons'
import { Button, Carousel, Modal, Switch, Table, TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { getPostList } from '../redux/actions/post.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { post, postImages } from '../types/post.type'

// const onChange = (currentSlide: number) => {
//   console.log(currentSlide)
// }

const PostPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.post.postList)
  const loading = useSelector((state: RootState) => state.post.loading)
  const [modal, setModal] = useState<boolean>(false)
  const [imageList, setImageList] = useState<postImages[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalEdit, setModalEdit] = useState<boolean>(false)

  useEffect(() => {
    const promise = dispatch(getPostList())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  const colums: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '3%',
      align: 'center',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '8%',
      align: 'center',
      key: 'id'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '13%',
      align: 'center',
      key: 'id'
    },
    {
      title: 'Apartment',
      children: [
        {
          title: 'Area',
          key: uuidv4(),
          width: '4%',
          align: 'center',
          render: (record: post) => String(record.apartment.building.zone.area.name)
        },
        {
          title: 'Zone',
          key: uuidv4(),
          width: '6%',
          align: 'center',

          render: (record: post) => String(record.apartment.building.zone.name)
        },
        {
          title: 'Building',
          key: uuidv4(),
          width: '5%',
          align: 'center',

          render: (record: post) => String(record.apartment.building.name)
        },
        {
          title: 'RoomName',
          key: uuidv4(),
          width: '6%',
          align: 'center',
          render: (record: post) => String(record.apartment.name)
        }
      ]
    },
    {
      title: 'ViewImage',
      width: '8%',
      align: 'center',
      render: (record: post) => <Button onClick={() => handleOnClickImage(record)}> ViewImage </Button>
    },
    {
      title: 'Action',
      key: 'id',
      width: '7%',
      render: (record: post) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDelte(record.id)} />
          </div>
        )
      }
    }
  ]
  const handleOpenModalEdit = (id: number) => {
    setModalEdit(true)
    console.log(id)
    console.log(modalEdit)
  }

  const handleDelte = (id: number) => {
    console.log(id)
  }

  function handleOnClickImage(record: post) {
    setModal(true)
    setImageList(record.postImages)
  }

  return (
    <>
      <Table
        columns={colums}
        loading={loading}
        dataSource={data}
        scroll={{ y: 500 }}
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true
        }}
        rowKey='id'
        bordered
      ></Table>

      <Modal
        footer={null}
        centered
        closable={false}
        title={'Image'}
        open={modal}
        onCancel={() => {
          setModal(false)
          setImageList([])
        }}
        // okButtonProps={{ style: { display: 'none' } }}
      >
        <Carousel swipeToSlide draggable arrows>
          {imageList.map((img) => (
            <div key={img.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <img width='100%' alt={img.image_alt} src={img.image_url} className='card' />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  )
}

export default PostPage

// import React from 'react'

// const PostPage: React.FC = () => {
//   return <>PostPage</>
// }

// export default PostPage
