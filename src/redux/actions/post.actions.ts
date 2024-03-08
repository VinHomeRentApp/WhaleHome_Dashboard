import { createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../../types/post.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getPostList = createAsyncThunk('post/getPostList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<post[]>>('/post', {
    signal: thunkAPI.signal
  })
  return response.data.data
})
