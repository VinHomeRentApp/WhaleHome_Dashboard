import * as yup from 'yup'

export type BuildingTypeValue = {
  id: number | null
  name: string
  zoneId: number | null
  areaId: number | null
}

export const buildingSchema = yup.object().shape({
  name: yup.string().required('Please input building name!').trim(),
  zoneId: yup.number().required('Please choose zoneID!').typeError(' must be a number'),
  areaId: yup.number().required('Please choose areaID!').typeError('must be a number')
})

export const defaultFormBuildingValue: BuildingTypeValue = {
  id: null,
  name: '',
  zoneId: null,
  areaId: null
}
