/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { NavigateFunction } from 'react-router'
import { logoutAPI } from '../redux/actions/auth.actions'
import { RootState } from '../redux/containers/store'
import { setIsLoading } from '../redux/slices/auth.slice'

type AppDispatch = ThunkDispatch<RootState, undefined, any>

export const handleLogout = async (dispatch: AppDispatch, navigate: NavigateFunction) => {
  try {
    dispatch(setIsLoading(true))
    const token = localStorage.getItem('token')
    if (token) {
      const resultAction = await dispatch(logoutAPI(token))
      if (logoutAPI.fulfilled.match(resultAction)) {
        navigate('/login')
        toast.success('Logout Successfully!')
      } else {
        toast.error('Logout Failed!')
      }
    } else {
      toast.error('Invalid Token!')
    }
  } catch (error: any) {
    toast.error(error.message)
  } finally {
    dispatch(setIsLoading(false))
  }
}
