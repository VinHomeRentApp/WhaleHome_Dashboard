import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker, Modal, Select, Spin, TimePicker, Typography, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { isAfter } from 'date-fns'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getApartmentList } from '../../../redux/actions/apartment.actions'
import { getApartmentClassList } from '../../../redux/actions/apartmentClass.action'
import { createAppointment, getAppointmentList } from '../../../redux/actions/appointment.actions'
import { getArea } from '../../../redux/actions/area.actions'
import { getBuildingList } from '../../../redux/actions/building.actions'
import { getUsers } from '../../../redux/actions/user.actions'
import { getZoneList } from '../../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import {
  createAppointmentFormValuesTypes,
  createAppointmentSchema,
  defaultFormAppointmentValue
} from '../../../schema/appointment.schema'
import { apartment } from '../../../types/appartment.type'
import { building } from '../../../types/building.type'
import { createAppointmentFormDataTypes } from '../../../types/form.types'
import { zone } from '../../../types/zone.type'
import { handleErrorMessage } from '../../../utils/HandleError'
import { filterOption } from '../../../utils/filterOptions'
import { formatDate, formatTime } from '../../../utils/formatDate'

type FormAddAppointmentProps = {
  isOpenAddAppointment: boolean
  setIsOpenAddAppointment: React.Dispatch<React.SetStateAction<boolean>>
}

dayjs.extend(customParseFormat)

const FormAddAppointment = (props: FormAddAppointmentProps) => {
  const { isOpenAddAppointment, setIsOpenAddAppointment } = props
  const { control, handleSubmit, setValue, getValues, formState, reset } = useForm<createAppointmentFormValuesTypes>({
    resolver: yupResolver(createAppointmentSchema) as Resolver<createAppointmentFormValuesTypes>,
    mode: 'onBlur',
    defaultValues: defaultFormAppointmentValue
  })

  const { errors } = formState

  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const { error, isLoadingAppointmentList } = useSelector((state: RootState) => state.appointment)
  const { apartmentList } = useSelector((state: RootState) => state.apartment)
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const { userList } = useSelector((state: RootState) => state.user)
  const [filteredZoneList, setFilteredZoneList] = useState<zone[]>(zoneList)
  const [filteredBuildingList, setFilteredBuildingList] = useState<building[]>(buildingList)
  const [filteredApartmentList, setFilteredApartmentList] = useState<apartment[]>(apartmentList)
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null)
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null)
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
    dispatch(getBuildingList())
    dispatch(getApartmentClassList())
    dispatch(getUsers())
    const promise = dispatch(getApartmentList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    const filteredZones = zoneList.filter((zone) => !getValues('areaId') || zone.area.id === getValues('areaId'))
    setFilteredZoneList(filteredZones)

    const filteredBuildings = buildingList.filter(
      (building) =>
        (!getValues('areaId') || building.zone.area.id === getValues('areaId')) &&
        (!getValues('zoneId') || building.zone.id === getValues('zoneId'))
    )
    setFilteredBuildingList(filteredBuildings)

    const filteredApartments = apartmentList.filter(
      (apartment) =>
        (!getValues('areaId') || apartment.building.zone.area.id === getValues('areaId')) &&
        (!getValues('zoneId') || apartment.building.zone.id === getValues('zoneId')) &&
        (!getValues('buildingId') || apartment.building.id === getValues('buildingId'))
    )
    setFilteredApartmentList(filteredApartments)
  }, [zoneList, buildingList, apartmentList, getValues, selectedAreaId, selectedBuildingId, selectedZoneId])

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Appointment' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const onError: SubmitErrorHandler<createAppointmentFormValuesTypes> = (
    errors: FieldErrors<createAppointmentFormValuesTypes>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const onSubmit = async (data: createAppointmentFormValuesTypes) => {
    // Parse date and time strings into the correct format
    const parsedDate = new Date(data.date)
    const parsedTime = new Date(data.time)
    const year = parsedDate.getFullYear()
    const month = parsedDate.getMonth()
    const day = parsedDate.getDate()
    const hours = parsedTime.getHours()
    const minutes = parsedTime.getMinutes()
    const seconds = parsedTime.getSeconds()

    const selectedDateTime = new Date(year, month, day, hours, minutes, seconds)

    if (!isNaN(selectedDateTime.getTime())) {
      const selectedHour = selectedDateTime.getHours()
      const selectedMinute = selectedDateTime.getMinutes()

      const isInvalidTime = selectedHour >= 20 || selectedHour < 6 || (selectedHour === 6 && selectedMinute !== 0)

      if (isInvalidTime) {
        message.error('Please select a time between 6:00 AM and 8:30 PM.')
        return
      }

      if (isAfter(selectedDateTime, new Date())) {
        const formattedData: createAppointmentFormDataTypes = {
          dateTime: formatDate(String(selectedDateTime)), // Assuming formatDate function handles Date objects
          usersId: parseInt(data.userId),
          apartmentId: data.apartmentId,
          time: formatTime(String(selectedDateTime)), // Assuming formatTime function handles Date objects
          note: data.note
        }

        const resultAction = await dispatch(createAppointment(formattedData))
        if (createAppointment.fulfilled.match(resultAction)) {
          message.success('Create Appointment Successfully!')
          reset(defaultFormAppointmentValue)
          dispatch(getAppointmentList())
          setIsOpenAddAppointment(false)
        }
      } else {
        messageApi.error('Please select a future date and time for the appointment.')
      }
    } else {
      message.error('Invalid date or time format. Please check your input.')
    }
  }

  return (
    <Spin spinning={isLoadingAppointmentList}>
      <Modal
        title='Create new Appointment'
        open={isOpenAddAppointment}
        onOk={handleSubmit(onSubmit, onError)}
        onCancel={() => setIsOpenAddAppointment(false)}
      >
        {contextHolder}
        <div style={{ margin: 10 }}>
          <Typography.Title level={5}>User</Typography.Title>
          <Controller
            control={control}
            name='userId'
            render={({ field }) => (
              <Select
                style={{ width: '100%' }}
                showSearch
                status={errors.userId && 'error'}
                filterOption={filterOption}
                placeholder='Search to Select'
                options={userList.map((user) => ({ value: user.id, label: user.email ?? '' }))}
                onChange={(value) => field.onChange(value)}
                value={field.value}
              />
            )}
          />
        </div>

        <div style={{ margin: 10 }}>
          <Typography.Title level={5}>Note</Typography.Title>
          <Controller
            name='note'
            control={control}
            render={({ field }) => (
              <TextArea showCount value={field.value || ''} maxLength={100} onChange={field.onChange} />
            )}
          />
        </div>

        <div style={{ display: 'flex', width: '100%', margin: 10 }}>
          <div style={{ width: '50%' }}>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Area</Typography.Paragraph>
            <Controller
              control={control}
              name='areaId'
              render={({ field }) => (
                <Select
                  value={field.value}
                  style={{ width: '90%' }}
                  onChange={(value) => {
                    field.onChange(value)
                    setSelectedAreaId(value)
                    setValue('zoneId', null)
                    setValue('buildingId', null)
                    setValue('apartmentId', null)
                  }}
                  options={areaList.map((area) => ({ value: area.id, label: area.name }))}
                />
              )}
            />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Zone</Typography.Paragraph>
            <Controller
              control={control}
              name='zoneId'
              render={({ field }) => (
                <Select
                  value={field.value}
                  style={{ width: '90%' }}
                  onChange={(value) => {
                    field.onChange(value)
                    setSelectedZoneId(value)
                    setValue('buildingId', null)
                    setValue('apartmentId', null)
                  }}
                  options={filteredZoneList.map((zone) => ({ value: zone.id, label: zone.name }))}
                />
              )}
            />
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', margin: 10 }}>
          <div style={{ width: '100%' }}>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Building</Typography.Paragraph>
            <Controller
              control={control}
              name='buildingId'
              render={({ field }) => (
                <Select
                  value={field.value}
                  style={{ width: '90%' }}
                  onChange={(value) => {
                    field.onChange(value)
                    setSelectedBuildingId(value)
                    setValue('apartmentId', null)
                  }}
                  options={filteredBuildingList.map((building) => ({ value: building.id, label: building.name }))}
                />
              )}
            />
          </div>
          <div style={{ width: '100%' }}>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Apartment</Typography.Paragraph>
            <Controller
              control={control}
              name='apartmentId'
              render={({ field }) => (
                <Select
                  value={field.value}
                  status={errors.apartmentId && 'error'}
                  style={{ width: '90%' }}
                  onChange={(value) => field.onChange(value)}
                  options={filteredApartmentList.map((apartment) => ({ value: apartment.id, label: apartment.name }))}
                />
              )}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
          <div style={{ width: '100%' }}>
            <Typography.Title style={{ width: '95%' }} level={5}>
              Time
            </Typography.Title>
            <Controller
              control={control}
              name='time'
              render={({ field }) => (
                <TimePicker
                  status={errors.time && 'error'}
                  style={{ width: '100%' }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
          </div>
          <div style={{ width: '100%', marginLeft: 20 }}>
            <Typography.Title level={5}>Date</Typography.Title>
            <Controller
              control={control}
              name='date'
              render={({ field }) => (
                <DatePicker
                  status={errors.date && 'error'}
                  style={{ width: '100%' }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
          </div>
        </div>
      </Modal>
    </Spin>
  )
}

export default FormAddAppointment
