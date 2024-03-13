import * as yup from 'yup'

export type updateUserValues = {
  id: number
  email: string
  password: string
  phone: string
  fullName: string
  dateOfBirth: string
  status: boolean
  image: string
  gender: string
  address: string
}

export const defaultFormValues: updateUserValues = {
  id: NaN,
  email: '',
  password: '',
  phone: '',
  fullName: '',
  dateOfBirth: '',
  status: true,
  image: '',
  gender: '',
  address: ''
}

export const updateUserSchema = yup.object().shape({
  email: yup.string().email('pls enter email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  phone: yup.number().required('PhoneNumber is required!!'),
  fullName: yup.string().min(5, 'at least 5 words').required('Name is required'),
  dateOfBirth: yup.string().required('pls fill thiss'),
  gender: yup.string().required('pls fill this'),
  address: yup.string().required('pls fill this')
})
