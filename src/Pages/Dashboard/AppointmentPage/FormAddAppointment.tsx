import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker, Modal, Select, TimePicker, Typography, message } from 'antd'
// import type { Dayjs } from 'dayjs'
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
import { getUsers } from '../../../redux/actions/user.actions'
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
  const { control, handleSubmit, setValue, getValues } = useForm<createAppointmentFormValuesTypes>({
    resolver: yupResolver(createAppointmentSchema),
    defaultValues: defaultFormAppointmentValue
  })

  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
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

  // const onChangeTime = (time: Dayjs | null, timeString: string) => {
  //   console.log(time, timeString)
  // }

  // const onChangeDate = (date: Dayjs | null, dateString: string) => {
  //   console.log(date, dateString)
  // }

  const filterOption = (input: string, option?: { label: string; value: number }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal title='Create new Appointment' open={isOpenAddAppointment} onCancel={() => setIsOpenAddAppointment(false)}>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Typography.Title level={5}>User</Typography.Title>
        <Controller
          control={control}
          name='userId'
          render={({ field }) => (
            <Select
              style={{ width: '100%' }}
              showSearch
              filterOption={filterOption}
              placeholder='Search to Select'
              options={userList.map((user) => ({ value: user.id, label: user.fullName ?? '' }))}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />

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
