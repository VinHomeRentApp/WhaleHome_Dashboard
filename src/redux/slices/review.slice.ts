import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getReviewList } from '../actions/review.actions'
import { initialReviewState } from '../types/review.types'

const reviewSlice = createSlice({
  name: 'review',
  initialState: initialReviewState,
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
