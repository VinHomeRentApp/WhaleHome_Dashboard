/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginResponse, ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await http.post<ResponseSuccessful<LoginResponse>>('/auth/authenticate', {
      email: user,
      password: user
    })
    return response.data.data.access_token
  } catch (error: any) {
    if (error.response && error.response.data.error_message) {
      return thunkAPI.rejectWithValue(error.response.data.error_message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const logoutAPI = createAsyncThunk('auth/logout', async (token: string, thunkAPI) => {
  try {
    const response = await http.post(`/auth/logout?token=${token}`)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
