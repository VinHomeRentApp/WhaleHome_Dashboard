/* eslint-disable @typescript-eslint/no-explicit-any */
import { appointments } from '../../types/appointments.type'
import { User } from '../../types/user.type'

export interface userState {
  userList: User[]
  editUser: User | null
  landLord: User | null
  isLoading: boolean
  currentRequestId: undefined | string
  searchUserIncludeAppointment: appointments[]
  error: any
}

export const initialUserState: userState = {
  userList: [],
  editUser: null,
  landLord: null,
  isLoading: false,
  currentRequestId: undefined,
  searchUserIncludeAppointment: [],
  error: null
}
