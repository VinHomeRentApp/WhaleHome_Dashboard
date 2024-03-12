import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginResponse, ResponseSuccessful } from '../../types/response.type'
import { User, userSearch } from '../../types/user.type'
import { http } from '../../utils/http'

export const loginApi = async (email: string, password: string) => {
  return await http.post<ResponseSuccessful<LoginResponse>>('/auth/authenticate', {
    email: email,
    password: password
  })
}

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
  const res = await http.get<ResponseSuccessful<userSearch>>(
    `/user/search-by-email?email=${email.trim()}&field=email`,
    {
      signal: thunkAPI.signal
    }
  )
  return res.data.data.listResult
})
