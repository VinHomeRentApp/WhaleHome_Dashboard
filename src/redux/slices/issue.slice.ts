import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getIssueList } from '../actions/issue.actions'
import { initialIssueState } from '../types/issue.types'

const issueSlice = createSlice({
  name: 'issue',
  initialState: initialIssueState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIssueList.fulfilled, (state, action) => {
        state.issueList = action.payload
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

export default issueSlice.reducer
