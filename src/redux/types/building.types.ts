import { building } from '../../types/building.type'

interface BuildingState {
  buildingList: building[]
  editingBuilding: building | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialBuildingState: BuildingState = {
  buildingList: [],
  editingBuilding: null,
  loading: false,
  currentRequestId: undefined
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
