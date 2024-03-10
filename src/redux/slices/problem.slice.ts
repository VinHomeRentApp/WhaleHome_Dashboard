import { createSlice } from '@reduxjs/toolkit'
import { initialAreaState } from '../types/problem.type'
import { getProblemList } from '../actions/problem.action'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const problemSlice = createSlice({
  name: 'problem',
  initialState: initialAreaState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProblemList.fulfilled, (state, action) => {
        state.problemList = action.payload
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

export default problemSlice.reducer
