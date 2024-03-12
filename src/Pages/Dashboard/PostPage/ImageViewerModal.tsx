import { Carousel, Modal } from 'antd'
import React from 'react'
import { postImages } from '../../../types/post.type'

interface ImageViewerModalProps {
  visible: boolean
  imageList: postImages[]
  handleClose: () => void
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ visible, imageList, handleClose }) => {
  return (
    <Modal
      footer={null}
      centered
      closable={false}
      title='Image'
      open={visible}
      onCancel={() => {
        handleClose()
      }}
    >
      <Carousel autoplay={true} draggable arrows>
        {imageList.map((img) => (
          <img
            key={img.id}
            alt={img.image_alt}
            src={img.image_url}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ))}
      </Carousel>
    </Modal>
  )
}

export default ImageViewerModal
