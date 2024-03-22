import * as yup from 'yup'

export type AreaTypeValue = {
  id: number | null
  name: string
}

export const AreaSchema = yup.object().shape({
  name: yup.string().required('Please input area name!').trim()
})

export const defaultFormAreaValue: AreaTypeValue = {
  id: null,
  name: ''
}
