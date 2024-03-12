import { createSlice } from '@reduxjs/toolkit'
import { initialUserState } from '../types/user.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { searchUser } from '../actions/user.actions'

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        state.searchUserIncludeAppointment = action.payload
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
export default userSlice.reducer
