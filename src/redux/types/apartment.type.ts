import { apartment } from '../../types/appartment.type'

export interface ApartmentState {
  apartmentList: apartment[]
  editApartment: apartment | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialApartmentState: ApartmentState = {
  apartmentList: [],
  editApartment: null,
  loading: false,
  currentRequestId: undefined
}
