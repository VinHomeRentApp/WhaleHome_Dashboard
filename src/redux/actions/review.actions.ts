import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseSuccessful } from '../../types/response.type'
import { review } from '../../types/review.type'
import { http } from '../../utils/http'

export const getReviewList = createAsyncThunk('review/getReviewList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<review[]>>('/review', {
    signal: thunkAPI.signal
  })
  return response.data.data
})
