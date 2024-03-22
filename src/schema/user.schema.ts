import * as yup from 'yup'

export type updateUserValues = {
  id: number
  email: string
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
  phone: '',
  fullName: '',
  dateOfBirth: '',
  status: true,
  image: '',
  gender: '',
  address: ''
}

export const updateUserSchema = yup.object().shape({
  email: yup.string().email('Please enter correct email').required('Email is required'),
  phone: yup.number().required('PhoneNumber is required!!'),
  fullName: yup.string().min(5, 'FullName at least 5 words').required('Name is required'),
  dateOfBirth: yup.string().required('Please fill dateOfBirth'),
  gender: yup.string().required('Please fill gender'),
  address: yup.string().required('Please fill address')
})
