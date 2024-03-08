import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { reivew } from '../types/review.type'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface reviewState {
  reviewList: reivew[]
  editReview: reivew | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: reviewState = {
  reviewList: [],
  editReview: null,
  loading: false,
  currentRequestId: undefined
}

export const getReviewList = createAsyncThunk('review/getReviewList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<reivew[]>>('/review', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getReviewList.fulfilled, (state, action) => {
        state.reviewList = action.payload
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

export default reviewSlice.reducer
