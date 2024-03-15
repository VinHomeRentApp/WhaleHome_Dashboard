import * as yup from 'yup'

export type contractValueType = {
  description: string
  user: number
  appointmentId: number
  expiredTime: string
  dateSign: string
  dateStartRent: string
  price: number
}

export const defaultFormValues: contractValueType = {
  description: '',
  user: NaN,
  appointmentId: NaN,
  expiredTime: '',
  dateSign: '',
  dateStartRent: '',
  price: NaN
}

export const contractSchema = yup.object().shape({
  description: yup.string().required('description is required').min(5, 'description at least 5 words'),
  user: yup.number().required('pls chooose usẻr!!'),
  appointmentId: yup.number().required('pls chooose appointment!!'),
  expiredTime: yup.string().required('pls fill expiredTime'),
  dateSign: yup.string().required('pls fill dateSign'),
  dateStartRent: yup.string().required('pls fill dateStartRent'),
  price: yup.number().required('pls chooose usr!!').moreThan(0, 'pls input > 0 price')
})
