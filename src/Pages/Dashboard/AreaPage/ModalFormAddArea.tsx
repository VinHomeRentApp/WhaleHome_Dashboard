/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Typography, message } from 'antd'
import { useEffect } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createArea, updateArea } from '../../../redux/actions/area.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { cancelEditingBuilding } from '../../../redux/slices/building.slice'
import { AreaSchema, AreaTypeValue, defaultFormAreaValue } from '../../../schema/area.schema'
import { FormAreaProps } from '../../../types/props.types'
import { handleErrorMessage } from '../../../utils/HandleError'

const AreaModal = (props: FormAreaProps) => {
  const { area, isOpenModal, setOpenModal } = props
  const methods = useForm<AreaTypeValue>({
    resolver: yupResolver(AreaSchema) as unknown as Resolver<AreaTypeValue>,
    mode: 'onBlur',
    defaultValues: defaultFormAreaValue
  })

  const { control, handleSubmit, reset } = methods
  const { error } = useSelector((state: RootState) => state.area)

  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpenModal && area) {
      reset({
        id: area.id,
        name: area.name
      })
    }
  }, [area])

  const onSubmit: SubmitHandler<AreaTypeValue> = async (data) => {
    if (area) {
      if (data.id) {
        const resultAction = await dispatch(updateArea({ areaId: data.id, body: data }))
        if (updateArea.fulfilled.match(resultAction)) {
          message.success('Update Area Successfully!')
          reset(defaultFormAreaValue)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createArea(data.name))
      if (createArea.fulfilled.match(resultAction)) {
        message.success('Create Area Successfully!')
        reset(defaultFormAreaValue)
        setOpenModal(false)
      }
    }
    reset(defaultFormAreaValue)
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
    handleErrorMessage({ error, messageApi, title: 'Area' })
  }, [error])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(cancelEditingBuilding())
    reset(defaultFormAreaValue)
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={area ? 'Edit Area' : 'Add Area'}
          open={isOpenModal}
          onOk={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        >
          <Typography.Title level={5}>Name</Typography.Title>
          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input onChange={field.onChange} value={field.value ? field.value : ''} />}
          />
        </Modal>
      </form>
    </>
  )
}

export default AreaModal
