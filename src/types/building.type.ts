import { zone } from './zone.type'

export interface building {
  id: number
  createDate?: string
  status?: boolean
  name: string
  zone: zone
}
