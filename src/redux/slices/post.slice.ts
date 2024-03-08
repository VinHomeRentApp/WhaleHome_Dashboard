import { createSlice } from '@reduxjs/toolkit'
import { initialPostState } from '../types/post.types'
import { getPostList } from '../actions/post.actions'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
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
