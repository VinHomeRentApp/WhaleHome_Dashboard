import { User } from '../../types/user.type'

export interface userState {
  userList: User[]
  editUser: User | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialUserState: userState = {
  userList: [],
  editUser: null,
  loading: false,
  currentRequestId: undefined
}
