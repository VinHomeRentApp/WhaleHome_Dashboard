import { Checkbox, Input, Modal, Typography } from 'antd'
import React, { Dispatch } from 'react'
import { updateArea } from '../../../redux/actions/area.actions'
import { useAppDispatch } from '../../../redux/containers/store'
import { area } from '../../../types/area.type'

type ModalFormAddAreaProps = {
  modalData: area
  isOpenModal: boolean
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>
  setModalData: Dispatch<React.SetStateAction<area>>
  handleCancel: () => void
}

const ModalFormAddArea = ({
  isOpenModal,
  setIsOpenModal,
  modalData,
  setModalData,
  handleCancel
}: ModalFormAddAreaProps) => {
  const dispatch = useAppDispatch()

  const handleOk = () => {
    setIsOpenModal(false)
    dispatch(updateArea({ areaId: modalData.id, body: modalData }))
  }

  return (
    <Modal title='Edit Area' open={isOpenModal} onOk={handleOk} onCancel={handleCancel}>
      <Typography.Title level={5}>ID</Typography.Title>
      <Input
        placeholder='input name'
        onChange={(e) => setModalData((data) => ({ ...data, id: Number(e.target.value) }))}
        value={modalData.id}
        disabled
      />
      <Typography.Title level={5}>Name</Typography.Title>
      <Input
        placeholder='input name'
        onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value }))}
        value={modalData.name}
      />
    </Modal>
  )
}

export default ModalFormAddArea
