import * as yup from 'yup'

export type createAppointmentFormValuesTypes = {
  userId: string
  apartmentId: number | null
  areaId?: number | null
  note?: string | null
  zoneId?: number | null
  buildingId?: number | null
  time: string
  date: string
}

export const createAppointmentSchema = yup.object().shape({
  userId: yup.string().required('User is required!'),
  areaId: yup.number().nullable(),
  zoneId: yup.number().nullable(),
  note: yup.string().nullable(),
  buildingId: yup.number().nullable(),
  apartmentId: yup.number().nullable().required('Please choose apartment!'),
  time: yup.string().required('Time is required!'),
  date: yup.string().required('Date Appointment is required!')
})

export const defaultFormAppointmentValue: createAppointmentFormValuesTypes = {
  userId: '',
  areaId: null,
  buildingId: null,
  zoneId: null,
  apartmentId: null,
  time: '',
  date: ''
}
