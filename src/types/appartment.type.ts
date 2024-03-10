export interface apartment {
  id: number
  createDate?: string
  status: boolean
  name: string
  description?: string
  living_room?: number
  bed_room?: number
  kitchen?: number
  rest_room?: number
  floor?: number
  area: number
  air_conditioner?: number
  electric_fan?: number
  television?: number
  electric_stoves?: number
  gas_stoves?: number
  apartmentClass: apartmentClass
  building: building
}

export interface apartmentClass {
  id: number
  createDate?: string
  status: boolean
  name?: string
  rent_price?: number
  buy_price?: number
  width?: number
  length?: number
  height?: number
}

export interface building {
  id: number
  createDate?: string
  status: boolean
  name?: string
  zone: zone
}

interface zone {
  id: number
  createDate?: string
  status: true
  name?: string
  area: area
}

export interface area {
  id: number
  createDate?: string
  status: boolean
  name?: string
}
