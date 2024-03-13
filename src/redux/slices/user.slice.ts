import { createSlice } from '@reduxjs/toolkit'
import { initialUserState } from '../types/user.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { deactiveUser, getUser, searchUser } from '../actions/user.actions'

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        state.searchUserIncludeAppointment = action.payload
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(deactiveUser.fulfilled, (state, action) => {
        const id = action.meta.arg
        state.userList.find((user, index) => {
          if (user.id === id) {
            state.userList[index] = { ...state.userList[index], status: Boolean(!state.userList[index]) }
            return
          }
        })
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
