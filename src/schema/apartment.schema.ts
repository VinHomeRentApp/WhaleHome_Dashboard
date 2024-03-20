import * as yup from 'yup'

export type updateApartmentValuesType = {
  id: number
  description: string
  name: string
  apartmentClassId: number
  buildingID: number
  zoneID: number
  areaID: number
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
  id: NaN,
  description: '',
  name: '',
  apartmentClassId: NaN,
  buildingID: NaN,
  zoneID: NaN,
  areaID: NaN
}
