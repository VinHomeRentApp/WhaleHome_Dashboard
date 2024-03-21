import { building } from '../../types/building.type'

interface BuildingState {
  buildingList: building[]
  editingBuilding: building | null
  loading: boolean
  currentRequestId: undefined | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
}

export const initialBuildingState: BuildingState = {
  buildingList: [],
  editingBuilding: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}

export interface updateBuilding {
  name: string
  zone: {
    id: number
    createDate: '2024-03-07'
    status: true
    name: 'string'
    area: {
      id: 2
      createDate: '2024-03-07'
      status: true
      name: 'string'
    }
  }
}
