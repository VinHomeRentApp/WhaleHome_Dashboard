import { FileAddFilled } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPostList } from '../redux/actions/post.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { post, postImages } from '../types/post.type'
import { handleErrorMessage } from '../utils/HandleError'
import FormAddPostModal from './Dashboard/PostPage/FormAddPostModal'
import ImageViewerModal from './Dashboard/PostPage/ImageViewerModal'
import PostTable from './Dashboard/PostPage/PostTable'

const PostPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { postList, isLoading, error } = useSelector((state: RootState) => state.post)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [imageList, setImageList] = useState<postImages[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)
  const [postEdit, setPostEdit] = useState<post | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'post' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const handleViewImage = (record: post) => {
    setIsOpenModal(true)
    setImageList(record.postImages)
  }

  const handleEdit = (post: post) => {
    setPostEdit(post)
    setIsOpenModalEdit(true)
  }

  return (
    <>
      {contextHolder}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search style={{ width: '30%' }} placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
        <Button
          style={{ width: '5%', height: '5%' }}
          type='primary'
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
        search={search}
        data={postList}
        loading={isLoading}
        handleViewImage={handleViewImage}
        handleEdit={handleEdit}
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
