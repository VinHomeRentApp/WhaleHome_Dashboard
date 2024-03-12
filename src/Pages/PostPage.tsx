import { FileAddFilled } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPostList } from '../redux/actions/post.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { post, postImages } from '../types/post.type'
import FormAddPostModal from './Dashboard/PostPage/FormAddPostModal'
import ImageViewerModal from './Dashboard/PostPage/ImageViewerModal'
import PostTable from './Dashboard/PostPage/PostTable'

const PostPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.post.postList)
  const isLoading = useSelector((state: RootState) => state.post.isLoading)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [imageList, setImageList] = useState<postImages[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)
  const [postEdit, setPostEdit] = useState<post | null>(null)

  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleViewImage = (record: post) => {
    setIsOpenModal(true)
    setImageList(record.postImages)
  }

  const handleEdit = (post: post) => {
    setPostEdit(post)
    setIsOpenModalEdit(true)
  }

  const handleDelete = (id: number) => {
    console.log(id)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search style={{ width: '30%' }} placeholder='Find by Name' />
        <Button
          style={{ width: '5%', height: '5%' }}
          type='primary'
          block
          onClick={() => {
            setIsOpenModalAdd(!isOpenModalAdd)
          }}
        >
          <FileAddFilled />
        </Button>
      </div>
      <FormAddPostModal
        setEditPost={setPostEdit}
        postEdit={postEdit}
        isOpenModalEdit={isOpenModalEdit}
        isOpenModalAdd={isOpenModalAdd}
        setIsOpenModalAdd={setIsOpenModalAdd}
        setIsOpenModalEdit={setIsOpenModalEdit}
      />
      <PostTable
        data={data}
        loading={isLoading}
        handleViewImage={handleViewImage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ImageViewerModal
        visible={isOpenModal}
        imageList={imageList}
        handleClose={() => {
          setIsOpenModal(false)
          setImageList([])
        }}
      />
    </>
  )
}

export default PostPage
