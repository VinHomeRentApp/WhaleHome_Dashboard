import { PlusOutlined } from '@ant-design/icons'
import { GetProp, Modal, Upload, UploadFile, UploadProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deletePostImage, getPostList } from '../../../redux/actions/post.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { post } from '../../../types/post.type'

type UploadImageProps = {
  post: post
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const UploadImage = ({ post }: UploadImageProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()
  const [editPost, setEditPost] = useState(post)
  const { postList } = useSelector((state: RootState) => state.post)

  useEffect(() => {
    const uploadFileList: UploadFile[] =
      editPost?.postImages.map((e) => ({
        uid: String(e.id),
        name: 'image.png',
        status: 'done',
        url: e.image_url ?? e.image_alt
      })) || []

    setFileList(uploadFileList)
  }, [editPost?.postImages])

  const handleCancel = () => setPreviewOpen(false)

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    return isJpgOrPng
  }

  const handleRemove = (file: UploadFile) => {
    dispatch(deletePostImage(file.uid))
      .then((resultAction) => {
        if (deletePostImage.fulfilled.match(resultAction)) {
          setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid))
          dispatch(getPostList())
          message.success('Delete Image Successfully!')
        } else {
          message.error('Delete Image Fail!')
        }
      })
      .catch(() => {
        message.error('Delete Image Fail!')
      })
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const props: UploadProps = {
    name: 'file',
    action: `https://whalehome.up.railway.app/api/v1/postimage/create/${post.id}`,
    method: 'POST',
    accept: 'image/*',
    listType: 'picture-card',
    fileList: fileList,
    onRemove: handleRemove,
    beforeUpload: beforeUpload,
    onChange: () => {
      dispatch(getPostList())
      const findPost = postList.find((item) => item.id === editPost.id)
      if (findPost) {
        setEditPost(findPost)
      }
    }
  }

  return (
    <>
      <Upload {...props}>{fileList.length >= 8 ? null : uploadButton}</Upload>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} />
      </Modal>
    </>
  )
}

export default UploadImage
