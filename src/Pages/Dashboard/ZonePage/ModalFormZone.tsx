/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Select, Typography, message } from 'antd'
import { useEffect } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getArea } from '../../../redux/actions/area.actions'
import { createZone, updateZone } from '../../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { cancelEditingZone } from '../../../redux/slices/zone.slice'
import { AreaTypeValue } from '../../../schema/area.schema'
import { ZoneSchema, ZoneTypeValue, defaultFormZoneValue } from '../../../schema/zone.schema'
import { FormZoneProps } from '../../../types/props.types'
import { handleErrorMessage } from '../../../utils/HandleError'

const ZoneModal = (props: FormZoneProps) => {
  const { zone, isOpenModal, setOpenModal } = props
  const methods = useForm<ZoneTypeValue>({
    resolver: yupResolver(ZoneSchema) as unknown as Resolver<ZoneTypeValue>,
    mode: 'onBlur',
    defaultValues: defaultFormZoneValue
  })

  const { control, handleSubmit, reset } = methods
  const { error } = useSelector((state: RootState) => state.zone)
  const { areaList } = useSelector((state: RootState) => state.area)

  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getArea())
  }, [])

  useEffect(() => {
    if (isOpenModal && zone) {
      reset({
        id: zone.id,
        name: zone.name,
        areaId: zone.area.id
      })
    }
  }, [zone])

  const onSubmit: SubmitHandler<ZoneTypeValue> = async (data) => {
    if (zone) {
      if (data.id) {
        const resultAction = await dispatch(updateZone({ id: data.id, body: data }))
        if (updateZone.fulfilled.match(resultAction)) {
          message.success('Update Zone Successfully!')
          reset(defaultFormZoneValue)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createZone(data))
      if (createZone.fulfilled.match(resultAction)) {
        message.success('Create Zone Successfully!')
        reset(defaultFormZoneValue)
        setOpenModal(false)
      }
    }
    reset(defaultFormZoneValue)
    setOpenModal(false)
  }

  const onError: SubmitErrorHandler<AreaTypeValue> = (errors: FieldErrors<AreaTypeValue>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Zone' })
  }, [error])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(cancelEditingZone())
    reset(defaultFormZoneValue)
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={zone ? 'Edit Zone' : 'Add Zone'}
          open={isOpenModal}
          onOk={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        >
          {zone ? (
            <>
              <Typography.Title level={5}>ID</Typography.Title>
              <Controller
                control={control}
                name='id'
                render={({ field }) => (
                  <Input placeholder='input name' value={field.value ? field.value : ''} disabled />
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

          <Typography.Title level={5}>Area</Typography.Title>

          <Controller
            control={control}
            name='areaId'
            render={({ field }) => (
              <Select
                style={{ minWidth: 150 }}
                onChange={field.onChange}
                options={areaList.map((area) => {
                  return { value: area.id, label: area.name }
                })}
                value={field.value ? field.value : null}
              />
            )}
          />
        </Modal>
      </form>
    </>
  )
}

export default ZoneModal
