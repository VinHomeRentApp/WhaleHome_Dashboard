/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit'
import { HttpStatusCode } from 'axios'
import toast from 'react-hot-toast'
import { NavigateFunction } from 'react-router'
import { getUserDataFromToken, loginApi } from '../redux/actions/user.actions'
import { setUser } from '../redux/slices/auth.slice'

export const handleSubmit = async (email: string, password: string, dispatch: Dispatch, navigate: NavigateFunction) => {
  try {
    const response = await loginApi(email, password)
    const token = response.data.data.access_token
    localStorage.setItem('token', token)
    const user = await getUserDataFromToken()
    toast.success('Login Successfully!')
    dispatch(setUser(user))
    navigate('/')
  } catch (error: any) {
    if (error.response.status === HttpStatusCode.Forbidden) {
      toast.error('Wrong Email or Password!')
    } else {
      toast.error(error.message)
    }
  }
}
