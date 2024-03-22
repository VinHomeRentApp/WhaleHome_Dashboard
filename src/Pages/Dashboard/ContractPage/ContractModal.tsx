import { yupResolver } from '@hookform/resolvers/yup'
import { AutoComplete, DatePicker, Input, InputNumber, Modal, Select, Typography, message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createContract } from '../../../redux/actions/contract.action'
import { searchUser } from '../../../redux/actions/user.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { removeSearchUser } from '../../../redux/slices/user.slice'
import { contractSchema, contractValueType, defaultFormValues } from '../../../schema/contract.schema'
import { appointments } from '../../../types/appointments.type'
import { FormContractModalProps } from '../../../types/props.types'
import { ResponseSuccessful } from '../../../types/response.type'
import { formatDate } from '../../../utils/formatDate'
import { http } from '../../../utils/http'
const ModalContract = (props: FormContractModalProps) => {
  const { isOpenModal, setOpenModal } = props
  const searchUserData = useSelector((state: RootState) => state.user.searchUserIncludeAppointment)
  const [searchUserState, setSearchUserState] = useState<appointments[]>([])
  const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined)

  const [appointmentFiltered, setAppointmentFiltered] = useState<appointments[]>([])

  useEffect(() => {
    setSearchUserState(searchUserData)
  }, [searchUserData])

  const dateFormat = 'YYYY-MM-DD'

  const filterAppointment = (e: number) =>
    searchUserData.filter((ap) => {
      return ap.users.id === Number(e)
    })

  const methods = useForm<contractValueType>({
    resolver: yupResolver(contractSchema) as Resolver<contractValueType>,
    mode: 'onBlur',
    defaultValues: defaultFormValues
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = methods
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<contractValueType> = async (data) => {
    const formattedData: contractValueType = {
      appointmentId: data.appointmentId,
      dateSign: formatDate(String(data.dateSign)),
      dateStartRent: formatDate(String(data.dateStartRent)),
      description: data.description,
      expiredTime: formatDate(String(data.expiredTime)),
      price: data.price,
      user: data.user
    }
    const resultAction = await dispatch(createContract(formattedData))
    if (createContract.fulfilled.match(resultAction)) {
      message.success('Create Contract Successfully!')
    }
    dispatch(removeSearchUser())
    reset(defaultFormValues)
    setOpenModal(false)
  }

  const onError: SubmitErrorHandler<contractValueType> = (errors: FieldErrors<contractValueType>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const handleCancel = () => {
    setOpenModal(false)
    reset(defaultFormValues)
    dispatch(removeSearchUser())
  }

  const handleSearchUser = (e: string) => {
    if (e.length === 0) {
      return
    }
    dispatch(searchUser(e))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const disabledEndDate = (current: any) => {
    // Disable dates after the selected start date
    if (startDate) return current && current < startDate
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function disabledDate(current: any) {
    // Trả về true nếu current (ngày hiện tại) nhỏ hơn ngày hiện tại
    return current && current < dayjs().startOf('day')
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal title='Add Contract' open={isOpenModal} onOk={handleSubmit(onSubmit, onError)} onCancel={handleCancel}>
          <div style={{ width: '100%' }}>
            <Typography.Title level={5}>User</Typography.Title>
            <Controller
              control={control}
              name='user'
              render={({ field }) => (
                <AutoComplete
                  status={errors.user && 'error'}
                  style={{ width: '100%' }}
                  placeholder='Input email to find ID user'
                  value={field.value}
                  options={searchUserState.map((user) => ({
                    label: user.users.fullName, // Sửa phần hiển thị label ở đây
                    value: Number(user.users.id)
                  }))}
                  onSearch={debounce((e) => handleSearchUser(e), 500)}
                  onChange={(value) => {
                    field.onChange(value)
                    const abc = filterAppointment(value)
                    setAppointmentFiltered(abc)
                  }}
                />
              )}
            />
          </div>
          <div style={{ width: '100%' }}>
            <Typography.Title level={5}>Description</Typography.Title>
            <Controller
              control={control}
              name='description'
              render={({ field: { value, onChange } }) => (
                <Input.TextArea
                  status={errors.description && 'error'}
                  placeholder='Input description'
                  value={value}
                  onChange={(value) => {
                    onChange(value)
                  }}
                />
              )}
            />
          </div>
          <div style={{ width: '100%' }}>
            <Typography.Title level={5}>Appointment</Typography.Title>
            <Controller
              control={control}
              name='appointmentId'
              render={({ field }) => (
                <Select
                  status={errors.appointmentId && 'error'}
                  style={{ width: '100%' }}
                  onChange={async (value) => {
                    field.onChange(value)
                    const response = await http.get<ResponseSuccessful<appointments>>(`appointments/${value}`)
                    setValue(
                      'price',
                      response.data.data.apartment.apartmentClass.rent_price ||
                        response.data.data.apartment.apartmentClass.buy_price ||
                        0
                    )
                  }}
                  options={appointmentFiltered.map((appointments) => {
                    return { value: appointments.id, label: <div>{appointments.apartment.name}</div> }
                  })}
                  value={field.value}
                />
              )}
            />
          </div>
          <div style={{ display: 'flex', gap: '5%' }}>
            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Date Start Rent</Typography.Title>
              <Controller
                control={control}
                name='dateStartRent'
                render={({ field }) => (
                  <DatePicker
                    status={errors.dateStartRent && 'error'}
                    style={{ width: '100%' }}
                    format={dateFormat}
                    onChange={(value) => {
                      field.onChange(value)
                      if (value != null) {
                        setStartDate(value)
                      }
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    disabledDate={disabledDate}
                  />
                )}
              />
            </div>
            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Expired Time</Typography.Title>
              <Controller
                control={control}
                name='expiredTime'
                render={({ field }) => (
                  <DatePicker
                    status={errors.expiredTime && 'error'}
                    style={{ width: '100%' }}
                    format={dateFormat}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                    disabledDate={disabledEndDate}
                    value={field.value ? dayjs(field.value) : null}
                  />
                )}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '5%' }}>
            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Date Sign</Typography.Title>
              <Controller
                control={control}
                name='dateSign'
                render={({ field }) => (
                  <DatePicker
                    status={errors.dateSign && 'error'}
                    style={{ width: '100%' }}
                    format={dateFormat}
                    onChange={(value) => field.onChange(value)}
                    disabledDate={disabledDate}
                    value={field.value ? dayjs(field.value) : null}
                  />
                )}
              />
            </div>
            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Price</Typography.Title>
              <Controller
                control={control}
                name='price'
                render={({ field }) => (
                  <InputNumber
                    min={0}
                    disabled={true}
                    status={errors.price && 'error'}
                    style={{ width: '100%' }}
                    controls={false}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
        </Modal>
      </form>
    </>
  )
}

export default ModalContract
