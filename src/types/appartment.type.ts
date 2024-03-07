export interface appartment {
  id: number
  name: string
  description: string
  living_room: number
  bed_room: number
  kitchen: number
  rest_room: number
  floor: number
  area: number
  status: boolean
  air_conditioner: number
  electric_fan: number
  television: number
  electric_stoves: number
  gas_stoves: number
  building: building
  zone: zone
  area_c: area_c
}

export interface building {
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

export interface zone {
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
