import { Dispatch } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router'
import { getUserDataFromToken, loginApi } from '../redux/actions/user.actions'
import { setUser } from '../redux/slices/auth.slice'

export const handleSubmit = async (email: string, password: string, dispatch: Dispatch, navigate: NavigateFunction) => {
  try {
    const response = await loginApi(email, password)
    const token = response.data.data.access_token
    localStorage.setItem('token', token)
    const user = await getUserDataFromToken()
    dispatch(setUser(user))
    navigate('/')
  } catch (error) {
    console.error('Đăng nhập thất bại', error)
  }
}
