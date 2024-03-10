/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { logout } from '../apis/user.apis'
import { setIsLoading, setUser } from '../redux/slices/auth.slice'

export const handleLogout = async (dispatch: Dispatch) => {
  try {
    dispatch(setIsLoading(true))
    const token = localStorage.getItem('token')
    if (token) {
      await logout(token)
      dispatch(setUser(null))
      toast.success('Logout Successfully!')
    } else {
      toast.error('Invalid Token!')
    }
  } catch (error: any) {
    toast.error(error.message)
  } finally {
    dispatch(setIsLoading(false))
  }
}
