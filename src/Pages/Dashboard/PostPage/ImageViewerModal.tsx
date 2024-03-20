import { Carousel, Modal } from 'antd'
import { isEmpty } from 'lodash'
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
      {imageList.length === 0 && !isEmpty(imageList) ? (
        <img
          src='https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg'
          alt=''
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      ) : (
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
      )}
    </Modal>
  )
}

export default ImageViewerModal
