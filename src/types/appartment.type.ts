import { apartmentClass } from './appointments.type'
import { building } from './building.type'

export interface apartment {
  id: number
  createDate: string
  status: boolean
  name: string
  description: string
  living_room: number
  bed_room: number
  kitchen: number
  rest_room: number
  floor: number
  area: number
  air_conditioner: number
  electric_fan: number
  television: number
  electric_stoves: number
  gas_stoves: number
  apartmentClass: apartmentClass
  building: building
}

export interface area_c {
  id: number
  modifiedBy: string
  createBy: string
  deleteBy: string
  modifiedDate: string
  createDate: string
  deleteAt: string
  status: boolean
  name: string
}
