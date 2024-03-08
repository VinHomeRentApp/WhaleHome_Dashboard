import { createAsyncThunk } from '@reduxjs/toolkit'
import { issue } from '../../types/issue.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getIssueList = createAsyncThunk('issue/getIssueList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<issue[]>>('/issue', {
    signal: thunkAPI.signal
  })
  return response.data.data
})
