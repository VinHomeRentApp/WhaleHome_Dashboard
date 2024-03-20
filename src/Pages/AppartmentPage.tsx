import { Button, Input, message } from 'antd'
import { useState } from 'react'
import { deleteApartment } from '../redux/actions/apartment.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { startEditingApartment } from '../redux/slices/apartment.slice'
import ApartmentModal from './Dashboard/ApartmentPage/ApartmentModal'
import TableApartment from './Dashboard/ApartmentPage/TableApartment'
import { useSelector } from 'react-redux'

const ApartmentPage = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const apartmentEdit = useSelector((state: RootState) => state.apartment.editApartment)

  const handleOpenModalEdit = (id: number) => {
    dispatch(startEditingApartment(id))
    setIsOpenModal(true)
  }
  const handleDelete = async (id: number) => {
    const resultAction = await dispatch(deleteApartment(id))
    if (deleteApartment.fulfilled.match(resultAction)) {
      message.success('Update Apartment Status Successfully!')
    } else if (deleteApartment.rejected.match(resultAction)) {
      message.error('Update Apartment Status Fail!')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm theo tên phòng'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button
          style={{ width: '10%' }}
          type='primary'
          block
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          Add New
        </Button>
      </div>

      <TableApartment search={search} handleDelete={handleDelete} handleOpenModalEdit={handleOpenModalEdit} />

      <ApartmentModal setOpenModal={setIsOpenModal} isOpenModal={isOpenModal} Apartment={apartmentEdit} />
    </>
  )
}

export default ApartmentPage
