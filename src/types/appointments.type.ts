import { apartment } from './appartment.type'
import { User } from './user.type'

export interface appointments {
  id: number
  createDate: string
  status: boolean
  statusAppointment: string
  dateTime: string
  user: User
  apartment: apartment
}

export interface apartmentClass {
  id: number
  createDate: string
  status: boolean
  name: string
  rent_price: number
  buy_price: number
  width: number
  length: number
  height: number
}
