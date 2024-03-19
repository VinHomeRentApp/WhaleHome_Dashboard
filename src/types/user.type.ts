export interface Role {
  id: number
  modifiedBy: string
  createBy: string
  deleteBy: string
  modifiedDate: string
  createDate: string
  deleteAt: string
  status: boolean
  role: string
}

export interface User {
  id: number
  modifiedBy?: string
  createBy?: string
  deleteBy?: string
  modifiedDate?: string
  createDate?: string
  deleteAt?: string
  status?: boolean
  email?: string
  password?: string
  phone?: string
  fullName?: string
  dateOfBirth?: string
  image: string
  gender?: string
  address?: string
  role?: Role
  verified?: boolean
  statusOfPayment?: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
}

export interface UserToken {
  id: number
  modifiedBy?: string
  createBy?: string
  deleteBy?: string
  modifiedDate?: string
  createDate?: string
  deleteAt?: string
  status?: boolean
  email?: string
  password?: string
  phone?: string
  fullName?: string
  dateOfBirth?: string
  image: string
  gender?: string
  address?: string
  role?: string
  verified?: boolean
  statusOfPayment?: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
}
