/* eslint-disable @typescript-eslint/no-explicit-any */
import { area } from '../../types/area.type'

export interface AreaState {
  areaList: area[]
  editArea: area | null
  loading: boolean
  currentRequestId: undefined | string
  error: any
}

export const initialAreaState: AreaState = {
  areaList: [],
  editArea: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
