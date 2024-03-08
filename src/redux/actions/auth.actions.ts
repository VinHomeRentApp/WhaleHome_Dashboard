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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data.error_message) {
      return thunkAPI.rejectWithValue(error.response.data.error_message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})
