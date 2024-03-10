import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseSuccessful } from '../../types/response.type'
import { problem } from '../../types/problem.type'

export const getProblemList = createAsyncThunk('problem/getProblemList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<problem[]>>('/problem', {
    signal: thunkAPI.signal
  })
  return response.data.data
})
