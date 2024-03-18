import { User } from './user.type'

export interface contract {
  id: number
  createDate?: string
  status?: boolean
  dateSign: string
  description: string
  dateStartRent: string
  payments?: []
  contractHistory: contractHistory
  apartmentId?: number
  apartmentName?: string
  buildingName?: string
  zoneName?: string
  areaName?: string
  appointmentId?: number
  urlFile?: string
  landLordId: number
}

export interface contractHistory {
  id?: number
  createDate?: string
  status?: boolean
  price?: number
  description?: string
  image?: string
  expiredTime: string
  users: User
}
