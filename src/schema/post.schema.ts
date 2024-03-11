import * as yup from 'yup'

export type createPostFormValues = {
  title: string
  description: string
  apartmentId?: number | null
  areaId?: number | null
  zoneId?: number | null
  buildingId?: number | null
}

export const createPostSchema = yup.object().shape({
  title: yup.string().min(5, 'Title must be at least 5 characters').required('Title is required'),
  description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
  apartmentId: yup.number().nullable(),
  areaId: yup.number().nullable(),
  zoneId: yup.number().nullable(),
  buildingId: yup.number().nullable()
})
