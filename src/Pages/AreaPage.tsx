import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { typoColor } from '../constants/mainColor'
import { getArea } from '../redux/actions/area.actions'
import { RootState, useAppDispatch } from '../redux/containers/store'
import AreaModal from './Dashboard/AreaPage/ModalFormAddArea'
import TableAreaPage from './Dashboard/AreaPage/TableAreaPage'

export default function AreaPage() {
  const dispatch = useAppDispatch()
  const areaEditing = useSelector((state: RootState) => state.area.editArea)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const promise = dispatch(getArea())
    return () => {
      promise.abort()
    }
  }, [dispatch])

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
          style={{ width: '10%', color: typoColor.mainBackground }}
          type='primary'
          block
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          Add New Area
        </Button>
      </div>
      <TableAreaPage search={search} setIsOpenModal={setIsOpenModal} />

      <AreaModal area={areaEditing} isOpenModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}
