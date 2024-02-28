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
  modifiedBy: string
  createBy: string
  deleteBy: string
  modifiedDate: string
  createDate: string
  deleteAt: string
  status: boolean
  email: string
  password: string
  phone: string
  fullName: string
  dateOfBirth: string
  image: string
  gender: string
  address: string
  role: Role
  verified: boolean
}

// export interface UserAuth {
//   id: number
//   createDate: string
//   email: string
//   password: null
//   fullName: string
//   dateOfBirth: string
//   image: string
//   gender: string
//   address: string
//   role: string
//   enabled: boolean
//   username: string
//   verified: boolean
//   authorities: [
//     {
//       authority: 'admin:create'
//     },
//     {
//       authority: 'admin:read'
//     },
//     {
//       authority: 'admin:update'
//     },
//     {
//       authority: 'admin:delete'
//     },
//     {
//       authority: 'ROLE_ADMIN'
//     }
//   ]
//   accountNonExpired: true
//   accountNonLocked: true
//   credentialsNonExpired: true
// }
