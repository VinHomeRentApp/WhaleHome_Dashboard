import { PlusOutlined } from '@ant-design/icons'
import { GetProp, Modal, Upload, UploadFile, UploadProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { deletePostImage, getPostList } from '../../../redux/actions/post.actions'
import { useAppDispatch } from '../../../redux/containers/store'
import { post } from '../../../types/post.type'

type UploadImageProps = {
  post: post
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const UploadImage = ({ post }: UploadImageProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uploadFileList: UploadFile[] =
      post?.postImages.map((e) => ({
        uid: String(e.id),
        name: 'image.png',
        status: 'done',
        url: e.image_url ?? e.image_alt
      })) || []

    setFileList(uploadFileList)
  }, [post?.postImages])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    return isJpgOrPng
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    if (file.status === 'done') {
      setFileList(newFileList)
      message.success('Upload Image Post Successfully!')
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`)
    }
  }

  const handleRemove = async (file: UploadFile) => {
    await dispatch(deletePostImage(file.uid))
    await dispatch(getPostList())
    message.success('Delete Image Successfully!')
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  return (
    <>
      <Upload
        action={`https://whalehome.up.railway.app/api/v1/postimage/create/${post.id}`}
        method='POST'
        listType='picture-card'
        onRemove={handleRemove}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default UploadImage
