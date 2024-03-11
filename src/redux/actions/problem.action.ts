import { createAsyncThunk } from '@reduxjs/toolkit'
import { problem } from '../../types/problem.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getProblemList = createAsyncThunk('problem/getProblemList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<problem[]>>('/problem', {
    signal: thunkAPI.signal
  })
  return response.data.data
})
