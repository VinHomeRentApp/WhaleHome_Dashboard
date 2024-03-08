import { area } from '../../types/area.type'

export interface AreaState {
  areaList: area[]
  editArea: area | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialAreaState: AreaState = {
  areaList: [],
  editArea: null,
  loading: false,
  currentRequestId: undefined
}
