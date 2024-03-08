import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../types/post.type'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface PostState {
  postList: post[]
  editingPost: post | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: PostState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}

export const getPostList = createAsyncThunk('post/getPostList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<post[]>>('/post', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export default postSlice.reducer
