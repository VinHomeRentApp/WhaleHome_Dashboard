import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Select, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getArea } from '../../../redux/actions/area.actions'
import { createBuilding, updateBuilding } from '../../../redux/actions/building.actions'
import { getZoneList } from '../../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { cancelEditingBuilding } from '../../../redux/slices/building.slice'
import { BuildingTypeValue, buildingSchema, defaultFormBuildingValue } from '../../../schema/building.schema'
import { FormBuildingProps } from '../../../types/props.types'
import { zone } from '../../../types/zone.type'
import { handleErrorMessage } from '../../../utils/HandleError'

const BuildingModal = (props: FormBuildingProps) => {
  const { building, isOpenModal, setOpenModal } = props
  const methods = useForm<BuildingTypeValue>({
    resolver: yupResolver(buildingSchema) as unknown as Resolver<BuildingTypeValue>,
    mode: 'onBlur',
    defaultValues: defaultFormBuildingValue
  })

  const { control, handleSubmit, setValue, getValues, reset } = methods
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const { error } = useSelector((state: RootState) => state.building)
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const [areaId, setAreaId] = useState<number | null>(null)
  const [filteredZoneList, setFilteredZoneList] = useState<zone[]>([])

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
  }, [dispatch])

  useEffect(() => {
    if (isOpenModal && building) {
      reset({
        id: building.id,
        name: building.name,
        zoneId: building.zone.id,
        areaId: building.zone.area.id
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building])

  useEffect(() => {
    const filteredZones = zoneList.filter((zone) => !getValues('areaId') || zone.area.id === getValues('areaId'))
    setFilteredZoneList(filteredZones)
  }, [zoneList, getValues, areaId])

  const onSubmit: SubmitHandler<BuildingTypeValue> = async (data) => {
    if (building) {
      if (data.id) {
        const resultAction = await dispatch(updateBuilding({ id: data.id, body: data }))
        if (updateBuilding.fulfilled.match(resultAction)) {
          message.success('Update Building Successfully!')
          reset(defaultFormBuildingValue)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createBuilding(data))
      if (createBuilding.fulfilled.match(resultAction)) {
        message.success('Create Building Successfully!')
        reset(defaultFormBuildingValue)
        setOpenModal(false)
      }
    }
    reset(defaultFormBuildingValue)
    setOpenModal(false)
  }

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Building' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const onError: SubmitErrorHandler<BuildingTypeValue> = (errors: FieldErrors<BuildingTypeValue>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(cancelEditingBuilding())
    reset(defaultFormBuildingValue)
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal title='Edit Building' open={isOpenModal} onOk={handleSubmit(onSubmit, onError)} onCancel={handleCancel}>
          <>
            <Typography.Title level={5}>Name</Typography.Title>
            <Controller
              control={control}
              name='name'
              render={({ field }) => <Input onChange={field.onChange} value={field.value ? field.value : ''} />}
            />
          </>

          <Typography.Title level={5}>Area</Typography.Title>
          <Controller
            control={control}
            name='areaId'
            render={({ field }) => (
              <Select
                value={field.value}
                style={{ minWidth: 150 }}
                onChange={(value) => {
                  field.onChange(value)
                  setAreaId(value)
                  setValue('zoneId', null)
                }}
                options={areaList.map((area) => ({ value: area.id, label: area.name }))}
              />
            )}
          />

          <Typography.Title level={5}>Zone</Typography.Title>
          <Controller
            control={control}
            name='zoneId'
            render={({ field }) => (
              <Select
                value={field.value}
                style={{ minWidth: 150 }}
                onChange={(value) => {
                  field.onChange(value)
                }}
                options={filteredZoneList.map((zone) => ({ value: zone.id, label: zone.name }))}
              />
            )}
          />
        </Modal>
      </form>
    </>
  )
}

export default BuildingModal
