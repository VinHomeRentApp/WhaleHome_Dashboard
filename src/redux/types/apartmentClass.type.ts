import { apartmentClass } from '../../types/appartment.type'

export interface ApartmentClassState {
  apartmentClassList: apartmentClass[]
  editApartmentClass: apartmentClass | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialApartmentClassState: ApartmentClassState = {
  apartmentClassList: [],
  editApartmentClass: null,
  loading: false,
  currentRequestId: undefined
}
