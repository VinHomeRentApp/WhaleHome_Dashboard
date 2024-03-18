import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { deactiveUser, getUserById, getUsers, searchUser, updateUser } from '../actions/user.actions'
import { initialUserState } from '../types/user.type'

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    startEdituser: (state, action: PayloadAction<number>) => {
      const idEdit = action.payload
      const foundArea = state.userList.find((area) => area.id === idEdit) || null
      state.editUser = foundArea
    },
    cancelEditingUser: (state) => {
      state.editUser = null
    },
    removeSearchUser: (state) => {
      state.searchUserIncludeAppointment = []
    }
  },
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
      .addCase(getUserById.fulfilled, (state, action) => {
        state.landLord = action.payload
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
      .addCase(updateUser.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.userList.find((user, index) => {
          if (user.id === id && action.payload) {
            state.userList[index] = action.payload
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
            state.error = null
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
})

export const { startEdituser, cancelEditingUser, removeSearchUser } = userSlice.actions

export default userSlice.reducer
