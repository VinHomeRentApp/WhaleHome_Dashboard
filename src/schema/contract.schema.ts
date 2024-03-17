import * as yup from 'yup'

export type contractValueType = {
  description: string
  user: number | null
  appointmentId: number | null
  expiredTime: string
  dateSign: string
  dateStartRent: string
  price: number | null
}

export const defaultFormValues: contractValueType = {
  description: '',
  user: null,
  appointmentId: null,
  expiredTime: '',
  dateSign: '',
  dateStartRent: '',
  price: null
}

export const contractSchema = yup.object().shape({
  description: yup.string().required('Description is required!!').min(5, 'Description at least 5 words'),
  user: yup.number().required('You must select user!!'),
  appointmentId: yup.number().required('Appointment is required !!'),
  expiredTime: yup.string().required('Expired Time is required !'),
  dateSign: yup.string().required('Date Sign is required !'),
  dateStartRent: yup.string().required('Date Start Rent is required !'),
  price: yup.number().required('Price is required!!').moreThan(0, 'Price must be more than 0')
})
