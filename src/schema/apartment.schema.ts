import * as yup from 'yup'

export type updateApartmentValuesType = {
  id: number | null
  description: string
  name: string
  apartmentClassId: number | null
  buildingID: number | null
  zoneID: number | null
  areaID: number | null
}

export const apartmentSchema = yup.object().shape({
  description: yup.string().required('Please input description!'),
  name: yup.string().required('Please input name!'),
  apartmentClassId: yup.number().required('Please choose apartmentClassId!').typeError(' must be a number'),
  buildingID: yup.number().required('Please choose buildingId!').typeError(' must be a number'),
  zoneID: yup.number().required('Please choose zoneID!').typeError(' must be a number'),
  areaID: yup.number().required('Please choose areaID!').typeError('must be a number')
})

export const defaultFormApartmentValue: updateApartmentValuesType = {
  id: null,
  description: '',
  name: '',
  apartmentClassId: null,
  buildingID: null,
  zoneID: null,
  areaID: null
}
