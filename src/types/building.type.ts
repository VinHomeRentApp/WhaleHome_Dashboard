export interface building {
  id: number
  createDate: string
  status: boolean
  name: string
  zone: zone
}

export interface zone {
  id: number
  createDate: string
  status: boolean
  name: string
  area: area
}

export interface area {
  id: number
  createDate: string
  status: boolean
  name: string
}
