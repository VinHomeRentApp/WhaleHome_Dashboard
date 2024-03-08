// export interface Post {
//   id: number
//   modifiedBy: string
//   createBy: string
//   deleteBy: string
//   modifiedDate: string
//   createDate: string
//   deleteAt: string
//   status: boolean
//   title: string
//   description: string

import { apartment } from './appartment.type'

// }
export interface count {
  data: number
}

export interface post {
  id: number
  createDate: string
  status: boolean
  title: string
  description: string
  postImages: postImages[]
  apartment: apartment
}

export interface postImages {
  id: number
  createDate: string
  status: boolean
  image_url: string
  image_alt: string
}
