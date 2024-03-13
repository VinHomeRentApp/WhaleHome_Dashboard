import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getUsers, searchUser } from '../actions/user.actions'
import { initialUserState } from '../types/user.type'
import { deactiveUser, getUser } from '../actions/user.actions'

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        state.searchUserIncludeAppointment = action.payload
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.userList = action.payload
        }
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
          state.isLoading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.isLoading && state.currentRequestId === action.meta.requestId) {
            state.isLoading = false
            state.currentRequestId = undefined
            state.error = action.payload
          }
        }
      )
  }
})
export default userSlice.reducer
