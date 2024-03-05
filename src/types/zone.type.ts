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
  name: string
  status: true
}
