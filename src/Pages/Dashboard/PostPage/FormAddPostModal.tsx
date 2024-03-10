import { Input, Modal, Typography } from 'antd'
import { useState } from 'react'

type Props = {
  isOpenModalAdd: boolean
  setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>
}

const FormAddPostModal = ({ isOpenModalAdd, setIsOpenModalAdd }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [searchApartment, setSearchApartment] = useState('')
  return (
    <Modal
      title='Edit Area'
      open={isOpenModalAdd}
      okText='Add New Post'
      onOk={() => {}}
      onCancel={() => setIsOpenModalAdd(false)}
    >
      <Typography.Title level={5}>Title</Typography.Title>
      <Input placeholder='Input Title' onChange={(e) => setTitle(e.target.value)} value={title} />
      <Typography.Title level={5}>Description</Typography.Title>
      <Input placeholder='Input Description' onChange={(e) => setDescription(e.target.value)} value={description} />
      <Typography.Title level={5}>Apartment</Typography.Title>
    </Modal>
  )
}

export default FormAddPostModal
