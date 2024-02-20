export interface Role {
  id: number
  modifiedBy: null
  createBy: string
  deleteBy: null
  modifiedDate: null
  createDate: string
  deleteAt: null
  status: boolean
  role: string
}

export interface User {
  id: number
  modifiedBy: null
  createBy: string
  deleteBy: null
  modifiedDate: null
  createDate: string
  deleteAt: null
  status: boolean
  email: string
  password: string
  phone: string
  fullName: string
  dateOfBirth: string
  image: null
  gender: string
  address: string
  role: Role
  verified: boolean
}
