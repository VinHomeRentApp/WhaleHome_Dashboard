import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Select, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createApartment, updateApartment } from '../../../redux/actions/apartment.actions'
import { getApartmentClassList } from '../../../redux/actions/apartmentClass.action'
import { getArea } from '../../../redux/actions/area.actions'
import { getBuildingList } from '../../../redux/actions/building.actions'
import { getZoneList } from '../../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { cancelEditingApartment } from '../../../redux/slices/apartment.slice'
import { apartmentSchema, defaultFormApartmentValue, updateApartmentValuesType } from '../../../schema/apartment.schema'
import { building } from '../../../types/building.type'
import { FormApartmentModalProps } from '../../../types/props.types'
import { zone } from '../../../types/zone.type'
import { handleErrorMessage } from '../../../utils/HandleError'

const ApartmentModal = (props: FormApartmentModalProps) => {
  const { Apartment, isOpenModal, setOpenModal } = props

  const methods = useForm<updateApartmentValuesType>({
    resolver: yupResolver(apartmentSchema) as unknown as Resolver<updateApartmentValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormApartmentValue
  })

  const { control, handleSubmit, setValue, getValues, reset } = methods
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const { apartmentList, error } = useSelector((state: RootState) => state.apartment)
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const ApartmentClass = useSelector((state: RootState) => state.apartmentClass.apartmentClassList)

  const [filteredZoneList, setFilteredZoneList] = useState<zone[]>(zoneList)
  const [filteredBuildingList, setFilteredBuildingList] = useState<building[]>(buildingList)
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null)
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
    dispatch(getBuildingList())
    dispatch(getApartmentClassList())
  }, [dispatch])

  useEffect(() => {
    if (isOpenModal && Apartment) {
      reset({
        id: Apartment.id,
        description: Apartment.description,
        name: Apartment.name,
        apartmentClassId: Apartment.apartmentClass.id,
        buildingID: Apartment.building.id,
        zoneID: Apartment.building.zone.id,
        areaID: Apartment.building.zone.area.id
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Apartment])

  useEffect(() => {
    const filteredZones = zoneList.filter((zone) => !getValues('areaID') || zone.area.id === getValues('areaID'))
    setFilteredZoneList(filteredZones)

    const filteredBuildings = buildingList.filter(
      (building) =>
        (!getValues('areaID') || building.zone.area.id === getValues('areaID')) &&
        (!getValues('zoneID') || building.zone.id === getValues('zoneID'))
    )
    setFilteredBuildingList(filteredBuildings)
  }, [zoneList, buildingList, apartmentList, getValues, selectedAreaId, selectedZoneId])

  const onSubmit: SubmitHandler<updateApartmentValuesType> = async (data) => {
    if (Apartment) {
      if (data.id) {
        const resultAction = await dispatch(updateApartment({ id: data.id, body: data }))
        if (updateApartment.fulfilled.match(resultAction)) {
          message.success('Update Apartment Successfully!')
          reset(defaultFormApartmentValue)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createApartment(data))
      if (createApartment.fulfilled.match(resultAction)) {
        message.success('Create Apartment Successfully!')
        reset(defaultFormApartmentValue)
        setOpenModal(false)
      }
    }
    reset(defaultFormApartmentValue)
    setOpenModal(false)
  }

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Apartment' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const onError: SubmitErrorHandler<updateApartmentValuesType> = (errors: FieldErrors<updateApartmentValuesType>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const handleCancel = () => {
    setOpenModal(false)
    reset(defaultFormApartmentValue)
    dispatch(cancelEditingApartment())
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={Apartment ? 'Edit Apartment' : 'Add Apartment'}
          open={isOpenModal}
          onOk={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        >
          {Apartment ? (
            <>
              <Typography.Title level={5}>ID</Typography.Title>
              <Controller
                control={control}
                name='id'
                render={({ field }) => (
                  <Input onChange={field.onChange} value={field.value ? field.value : ''} disabled />
                )}
              />
            </>
          ) : (
            ''
          )}

          <Typography.Title level={5}>Name</Typography.Title>

          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input placeholder='input name' onChange={field.onChange} value={field.value} />}
          />

          <Typography.Title level={5}>Description</Typography.Title>

          <Controller
            control={control}
            name='description'
            render={({ field }) => (
              <Input placeholder='input Description' onChange={field.onChange} value={field.value} />
            )}
          />

          <Typography.Title level={5}>Area</Typography.Title>
          <Controller
            control={control}
            name='areaID'
            render={({ field }) => (
              <Select
                value={field.value}
                style={{ minWidth: 150 }}
                onChange={(value) => {
                  field.onChange(value)
                  setSelectedAreaId(value)
                  setValue('zoneID', null)
                  setValue('buildingID', null)
                }}
                options={areaList.map((area) => ({ value: area.id, label: area.name }))}
              />
            )}
          />

          <Typography.Title level={5}>Zone</Typography.Title>
          <Controller
            control={control}
            name='zoneID'
            render={({ field }) => (
              <Select
                value={field.value}
                style={{ minWidth: 150 }}
                onChange={(value) => {
                  field.onChange(value)
                  setSelectedZoneId(value)
                  setValue('buildingID', null)
                }}
                options={filteredZoneList.map((zone) => ({ value: zone.id, label: zone.name }))}
              />
            )}
          />

          <Typography.Title level={5}>Building</Typography.Title>
          <Controller
            control={control}
            name='buildingID'
            render={({ field }) => (
              <Select
                value={field.value}
                style={{ width: '90%' }}
                onChange={(value) => {
                  field.onChange(value)
                }}
                options={filteredBuildingList.map((building) => ({ value: building.id, label: building.name }))}
              />
            )}
          />

          <Typography.Title level={5}>Type Apartment</Typography.Title>

          <Controller
            control={control}
            name='apartmentClassId'
            render={({ field }) => (
              <Select
                value={field.value}
                style={{ minWidth: 150 }}
                onChange={field.onChange}
                options={ApartmentClass.map((b) => {
                  return { value: b.id, label: b.name }
                })}
              />
            )}
          />
        </Modal>
      </form>
    </>
  )
}

export default ApartmentModal
