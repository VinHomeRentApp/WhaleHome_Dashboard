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
}

export interface contractHistory {
  id?: 1
  createDate?: string
  status?: boolean
  price?: number
  description?: string
  image?: string
  expiredTime: string
  users: User
}
