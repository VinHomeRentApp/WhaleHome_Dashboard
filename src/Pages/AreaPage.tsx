import { Button, Input, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createArea, getArea } from '../redux/actions/area.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { cancelEditingArea } from '../redux/slices/area.slice'
import { area } from '../types/area.type'
import ModalFormAddArea from './Dashboard/AreaPage/ModalFormAddArea'
import TableAreaPage from './Dashboard/AreaPage/TableAreaPage'

const formData: area = {
  name: '',
  createDate: '',
  status: true,
  id: NaN
}

export default function AreaPage() {
  const dispatch = useAppDispatch()
  const areaEditing = useSelector((state: RootState) => state.area.editArea)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<area>(formData)
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const promise = dispatch(getArea())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    setModalData(areaEditing || formData)
  }, [areaEditing])

  const handleCancel = () => {
    setIsOpenModal(false)
    dispatch(cancelEditingArea())
  }
  const handleCancelAdd = () => {
    setModalAdd(false)
  }
  const handleOkAdd = () => {
    if (modalData.name.trim() !== '') {
      setModalAdd(false)
      dispatch(createArea(modalData.name))
      handleCancelAdd()
    } else {
      return
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm theo tên'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button
          style={{ width: '10%' }}
          type='primary'
          block
          onClick={() => {
            setModalAdd(true)
          }}
        >
          Add New Area
        </Button>
      </div>
      <TableAreaPage search={search} setIsOpenModal={setIsOpenModal} />

      <ModalFormAddArea
        isOpenModal={isOpenModal}
        handleCancel={handleCancel}
        modalData={modalData}
        setIsOpenModal={setIsOpenModal}
        setModalData={setModalData}
      />

      <Modal title='Add Area' open={modalAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <Typography.Title level={5}>Name</Typography.Title>
        <Input
          placeholder='input name'
          onChange={(e) => setModalData((data) => ({ ...data, name: e.target.value.trim() }))}
          value={modalData.name}
        />
      </Modal>
    </>
  )
}
