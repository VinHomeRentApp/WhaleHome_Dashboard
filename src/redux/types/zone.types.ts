import { zone } from '../../types/zone.type'

export interface ZoneState {
  ZoneList: zone[]
  editingZone: zone | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialZoneState: ZoneState = {
  ZoneList: [],
  editingZone: null,
  loading: false,
  currentRequestId: undefined
}
