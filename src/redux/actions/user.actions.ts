import { createAsyncThunk } from '@reduxjs/toolkit'
import { appointments } from '../../types/appointments.type'
import { LoginResponse, ResponseSuccessful } from '../../types/response.type'
import { User } from '../../types/user.type'
import { http } from '../../utils/http'
import { updateUserValues } from '../../schema/user.schema'

export const loginApi = async (email: string, password: string) => {
  return await http.post<ResponseSuccessful<LoginResponse>>('/auth/authenticate', {
    email: email,
    password: password
  })
}

export const getUsers = createAsyncThunk('user/getAllUsers', async (_, thunkAPI) => {
  try {
    const response = await http.get<ResponseSuccessful<User[]>>('/user')
    return response.data.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})

export const getUserDataFromToken = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const res = await http.post<ResponseSuccessful<User>>('/auth/getUser', { access_token: token })
      const data = res.data.data
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      console.log(error)
    }
  }
  return null
}

export const searchUser = createAsyncThunk('user/searchUser', async (email: string, thunkAPI) => {
  const res = await http.get<ResponseSuccessful<appointments[]>>(
    `/user/search-user-complete-appointment-by-email?email=${email.trim()}`,
    {
      signal: thunkAPI.signal
    }
  )
  return res.data.data
})

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const res = await http.get<ResponseSuccessful<User[]>>(`/user`, {
      signal: thunkAPI.signal
    })
    return res.data.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})

export const deactiveUser = createAsyncThunk('user/deactiveUser', async (id: number, thunkAPI) => {
  try {
    const res = await http.put<ResponseSuccessful<User[]>>(`/user/delete/${id}`, {
      signal: thunkAPI.signal
    })
    return res.data.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (body: updateUserValues, thunkAPI) => {
  try {
    const res = await http.put<ResponseSuccessful<User>>(`/user/update/${body.id}`, body, {
      signal: thunkAPI.signal
    })
    return res.data.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})
