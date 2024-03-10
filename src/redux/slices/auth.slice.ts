import { createSlice } from '@reduxjs/toolkit'
import { login } from '../actions/auth.actions'
import { initialAuthState } from '../types/auth.types'

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
      console.log(state.isLoading)
    },
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.isLoading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(login.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.userToken = action.payload)
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { logout, setUser, setIsLoading } = authSlice.actions

export default authSlice.reducer
