import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker, Image, Input, Modal, Select, Typography, message } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { updateUser } from '../../../redux/actions/user.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { cancelEditingUser } from '../../../redux/slices/user.slice'
import { defaultFormValues, updateUserSchema, updateUserValues } from '../../../schema/user.schema'
import { FormUserModalProps } from '../../../types/props.types'
import { handleErrorMessage } from '../../../utils/HandleError'

const ModalUpdateUser = (props: FormUserModalProps) => {
  const { userEdit, isOpenModal, setOpenModal } = props

  const methods = useForm<updateUserValues>({
    resolver: yupResolver(updateUserSchema) as unknown as Resolver<updateUserValues>,
    mode: 'onBlur',
    defaultValues: defaultFormValues
  })

  const { control, handleSubmit, formState, reset } = methods
  const { errors } = formState
  const [messageApi, contextHolder] = message.useMessage()
  const { error } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpenModal && userEdit) {
      reset({
        id: userEdit.id,
        email: userEdit.email,
        phone: userEdit.phone,
        fullName: userEdit.fullName,
        dateOfBirth: userEdit.dateOfBirth,
        status: userEdit.status,
        image: userEdit.image,
        gender: userEdit.gender,
        address: userEdit.address
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEdit])

  const onSubmit: SubmitHandler<updateUserValues> = async (data) => {
    const resultAction = await dispatch(updateUser(data))
    if (updateUser.fulfilled.match(resultAction)) {
      message.success('Update User Successfully!')
    }
    reset(defaultFormValues)
    setOpenModal(false)
  }

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'User' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const onError: SubmitErrorHandler<updateUserValues> = (errors: FieldErrors<updateUserValues>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const handleCancel = () => {
    setOpenModal(false)
    reset(defaultFormValues)
    dispatch(cancelEditingUser())
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal title='Edit User' open={isOpenModal} onOk={handleSubmit(onSubmit, onError)} onCancel={handleCancel}>
          <Image
            style={{ width: '40%', height: '30%' }}
            src={userEdit?.image ? userEdit?.image : '/public/default-user.png'}
          />

          <Typography.Title level={5}>FullName</Typography.Title>
          <Controller
            control={control}
            name='fullName'
            render={({ field: { value, onChange } }) => (
              <Input status={errors.fullName && 'error'} placeholder='Input Title' value={value} onChange={onChange} />
            )}
          />
          <Typography.Title level={5}>Phone</Typography.Title>
          <Controller
            control={control}
            name='phone'
            render={({ field: { value, onChange } }) => (
              <Input
                status={errors.phone && 'error'}
                placeholder='input phone number'
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Typography.Title level={5}>Email</Typography.Title>
          <Controller
            control={control}
            name='email'
            render={({ field: { value, onChange } }) => (
              <Input status={errors.email && 'error'} placeholder='input email' value={value} onChange={onChange} />
            )}
          />

          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Date of Birth</Typography.Title>

              <Controller
                control={control}
                name='dateOfBirth'
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    style={{ minWidth: '150px' }}
                    value={value ? dayjs(value) : null}
                    onChange={(_date, dateString) => onChange(dateString)}
                  />
                )}
              />
            </div>

            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Gender</Typography.Title>
              <Controller
                control={control}
                name='gender'
                render={({ field }) => (
                  <Select
                    value={field.value}
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' }
                    ]}
                  />
                )}
              />
            </div>
          </div>
          <Typography.Title level={5}>Address</Typography.Title>
          <Controller
            control={control}
            name='address'
            render={({ field: { value, onChange } }) => (
              <Input placeholder='input address' value={value} onChange={onChange} />
            )}
          />
        </Modal>
      </form>
    </>
  )
}

export default ModalUpdateUser
