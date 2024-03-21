/* eslint-disable @typescript-eslint/no-explicit-any */
import { zone } from '../../types/zone.type'

export interface ZoneState {
  ZoneList: zone[]
  editingZone: zone | null
  loading: boolean
  currentRequestId: undefined | string
  countBuildingList: countBuildingTypes[]
  error: any
}

export type countBuildingTypes = {
  zoneName: string
  countBuilding: 11
}

export const initialZoneState: ZoneState = {
  ZoneList: [],
  editingZone: null,
  loading: false,
  currentRequestId: undefined,
  countBuildingList: [],
  error: null
}
