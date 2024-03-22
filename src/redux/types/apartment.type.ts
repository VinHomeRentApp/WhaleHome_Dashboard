import { apartment } from '../../types/appartment.type'

export interface ApartmentState {
  apartmentList: apartment[]
  editApartment: apartment | null
  loading: boolean
  currentRequestId: undefined | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
}

export const initialApartmentState: ApartmentState = {
  apartmentList: [],
  editApartment: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
