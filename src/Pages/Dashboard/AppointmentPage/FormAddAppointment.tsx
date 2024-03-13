import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker, Input, Modal, Select, TimePicker, Typography, message } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, SubmitErrorHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { getApartmentList } from '../../../redux/actions/apartment.actions'
import { getApartmentClassList } from '../../../redux/actions/apartmentClass.action'
import { getArea } from '../../../redux/actions/area.actions'
import { getBuildingList } from '../../../redux/actions/building.actions'
import { getZoneList } from '../../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { apartment } from '../../../types/appartment.type'
import { building } from '../../../types/building.type'
import { zone } from '../../../types/zone.type'

type FormAddAppointmentProps = {
  isOpenAddAppointment: boolean
  setIsOpenAddAppointment: React.Dispatch<React.SetStateAction<boolean>>
}

dayjs.extend(customParseFormat)

type createAppointmentFormValuesTypes = {
  userId?: string | null
  apartmentId?: number | null
  areaId?: number | null
  zoneId?: number | null
  buildingId?: number | null
  time?: string | null
  date?: string | null
}

const createAppointmentSchema = yup.object().shape({
  userId: yup.string().nullable(),
  areaId: yup.number().nullable(),
  zoneId: yup.number().nullable(),
  buildingId: yup.number().nullable(),
  apartmentId: yup.number().nullable(),
  time: yup.string().nullable(),
  date: yup.string().nullable()
})

const defaultFormAppointmentValue: createAppointmentFormValuesTypes = {
  userId: '',
  areaId: null,
  buildingId: null,
  zoneId: null,
  apartmentId: null,
  time: '',
  date: ''
}

const FormAddAppointment = (props: FormAddAppointmentProps) => {
  const { isOpenAddAppointment, setIsOpenAddAppointment } = props
  const { control, handleSubmit, setValue, formState, getValues, reset } = useForm<createAppointmentFormValuesTypes>({
    resolver: yupResolver(createAppointmentSchema),
    defaultValues: defaultFormAppointmentValue
  })

  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const { apartmentList } = useSelector((state: RootState) => state.apartment)
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const [filteredZoneList, setFilteredZoneList] = useState<zone[]>(zoneList)
  const [filteredBuildingList, setFilteredBuildingList] = useState<building[]>(buildingList)
  const [filteredApartmentList, setFilteredApartmentList] = useState<apartment[]>(apartmentList)

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
    dispatch(getBuildingList())
    dispatch(getApartmentClassList())
    const promise = dispatch(getApartmentList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    // Logic để lọc danh sách Zone dựa trên giá trị của area
    const filteredZones = zoneList.filter((zone) => !getValues('areaId') || zone.area.id === getValues('areaId'))
    setFilteredZoneList(filteredZones)

    // Logic để lọc danh sách Building dựa trên giá trị của area và zone
    const filteredBuildings = buildingList.filter(
      (building) =>
        (!getValues('areaId') || building.zone.area.id === getValues('areaId')) &&
        (!getValues('zoneId') || building.zone.id === getValues('zoneId'))
    )
    setFilteredBuildingList(filteredBuildings)

    // Logic để lọc danh sách Apartment dựa trên giá trị của area, zone, và building
    const filteredApartments = apartmentList.filter(
      (apartment) =>
        (!getValues('areaId') || apartment.building.zone.area.id === getValues('areaId')) &&
        (!getValues('zoneId') || apartment.building.zone.id === getValues('zoneId')) &&
        (!getValues('buildingId') || apartment.building.id === getValues('buildingId'))
    )
    setFilteredApartmentList(filteredApartments)
  }, [zoneList, buildingList, apartmentList, getValues])

  useEffect(() => {
    setValue('zoneId', null)
    setValue('buildingId', null)
  }, [setValue, control])

  useEffect(() => {
    setValue('buildingId', null)
  }, [setValue, control])

  const onError: SubmitErrorHandler<createAppointmentFormValuesTypes> = (
    errors: FieldErrors<createAppointmentFormValuesTypes>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const onSubmit = (data: createAppointmentFormValuesTypes) => {
    console.log(data)
  }

  const onChangeTime = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString)
  }

  const onChangeDate = (date: Dayjs | null, dateString: string) => {
    console.log(date, dateString)
  }

  return (
    <Modal title='Edit Area' open={isOpenAddAppointment} onCancel={() => setIsOpenAddAppointment(false)}>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Typography.Title level={5}>UserID</Typography.Title>
        <Controller
          control={control}
          name='userId'
          render={({ field }) => (
            <Input
              value={field.value || undefined}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder='UserID'
            />
          )}
        />
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
                setValue('areaId', value)
                setValue('zoneId', null)
                setValue('buildingId', null)
                setValue('apartmentId', null)
              }}
              options={areaList.map((area) => ({ value: area.id, label: area.name }))}
            />
          )}
        />
        {/* Controller cho trường zoneId */}
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
                setValue('zoneId', value)
                setValue('buildingId', null)
                setValue('apartmentId', null)
              }}
              options={filteredZoneList.map((zone) => ({ value: zone.id, label: zone.name }))}
            />
          )}
        />
        {/* Controller cho trường buildingId */}
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
                setValue('buildingId', value)
                setValue('apartmentId', null)
              }}
              options={filteredBuildingList.map((building) => ({ value: building.id, label: building.name }))}
            />
          )}
        />
        {/* Controller cho trường apartmentId */}
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>Apartment</Typography.Paragraph>
        <Controller
          control={control}
          name='apartmentId'
          render={({ field }) => (
            <Select
              value={field.value}
              style={{ width: '90%' }}
              onChange={(value) => field.onChange(value)}
              options={filteredApartmentList.map((apartment) => ({ value: apartment.id, label: apartment.name }))}
            />
          )}
        />
        {/* Các trường Time và Date */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <Typography.Title style={{ width: '100%' }} level={5}>
              Time
            </Typography.Title>
            <Controller
              control={control}
              name='time'
              render={({ field }) => (
                <TimePicker
                  style={{ width: '100%' }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
          </div>
          <div style={{ width: '45%' }}>
            <Typography.Title level={5}>Date</Typography.Title>
            <Controller
              control={control}
              name='date'
              render={({ field }) => (
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default FormAddAppointment
