import { GetProp, Modal, Upload, UploadFile, UploadProps, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import { deletePostImage, getPostList } from '../../../redux/actions/post.actions'
import { useAppDispatch } from '../../../redux/containers/store'
import { post } from '../../../types/post.type'

type UploadImageProps = {
  post: post
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const UploadImage = ({ post }: UploadImageProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uploadFileList: UploadFile[] =
      (post.postImages &&
        post?.postImages.map((e) => ({
          uid: String(e.id),
          name: 'image.png',
          status: 'done',
          url: e.image_url ?? e.image_alt
        }))) ||
      []

    setFileList(uploadFileList)
  }, [post?.postImages])

  const handleCancel = () => setPreviewOpen(false)

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    return isJpgOrPng
  }

  const handleRemove = async (file: UploadFile) => {
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

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList)
    if (file && file.status === 'done') {
      dispatch(getPostList())
      message.success('Upload Image Post Successfully!')
    } else if (file && file.status === 'error') {
      message.error(`${file.name} file upload failed.`)
    }
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <>
      <ImgCrop rotationSlider aspectSlider cropShape='rect' modalWidth={600}>
        <Upload
          name='file'
          action={`https://whalehome.up.railway.app/api/v1/postimage/create/${post.id}`}
          listType='picture-card'
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={handleRemove}
          onChange={onChange}
          onPreview={onPreview}
        >
          {/*  */}
          {fileList.length < 8 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} />
      </Modal>
    </>
  )
}

export default UploadImage
