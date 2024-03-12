import { createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../../types/post.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'
import { bodyUpdatePostTypes } from '../types/post.types'

export const getPostList = createAsyncThunk('post/getPostList', async (_, thunkAPI) => {
  try {
    const response = await http.get<ResponseSuccessful<post[]>>('/post', {
      signal: thunkAPI.signal
    })
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updatePost = createAsyncThunk('/post/update', async ({ id, body }: bodyUpdatePostTypes, thunkAPI) => {
  try {
    const response = await http.put<ResponseSuccessful<post>>(`/post/update/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
