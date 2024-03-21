import * as yup from 'yup'

export type ZoneTypeValue = {
  id: number | null
  name: string
  areaId: number | null
}

export const ZoneSchema = yup.object().shape({
  name: yup.string().required('Please input Zone name!').trim(),
  areaId: yup.number().required('Please choose areaID!')
})

export const defaultFormZoneValue: ZoneTypeValue = {
  id: null,
  name: '',
  areaId: null
}
