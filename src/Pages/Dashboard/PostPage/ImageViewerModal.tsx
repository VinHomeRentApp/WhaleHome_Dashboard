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
      visible={visible}
      onCancel={() => {
        handleClose()
      }}
    >
      <Carousel swipeToSlide draggable arrows>
        {imageList.map((img) => (
          <div key={img.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <img width='100%' alt={img.image_alt} src={img.image_url} className='card' />
          </div>
        ))}
      </Carousel>
    </Modal>
  )
}

export default ImageViewerModal
