import { createSlice } from '@reduxjs/toolkit'
import { login } from '../actions/auth.actions'
import { initialAuthState } from '../types/auth.types'

const authSlice = createSlice({
  name: 'user',
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload
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

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { User } from '../types/user.type'
// import { http } from '../utils/http'
// import { LoginResponse, ResponseSuccessful } from '../types/response.type'

// export interface initialState {
//   currentUser?: User
//   isLoading: boolean
//   jwt: string
// }

// const initialState: initialState = {
//   currentUser: undefined,
//   isLoading: false,
//   jwt: ''
// }

// export interface LoginArgs {
//   email: string
//   password: string
// }

// export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
//   try {
//     const response = await http.post('/auth/authenticate', {
//       email: email,
//       password: password
//     })
//     return response.data.data.access_token
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response.data.errors)
//   }
// })

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {}, // Add an empty reducers property
//   extraReducers: (builder) =>
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.jwt = action.payload.access_token
//       })
//       .addCase(login.rejected, (state) => {
//         state.isLoading = false
//       })
//   // .addCase(getCurrentUser.pending, (state) => {
//   //   state.isLoading = true
//   // })
//   // .addCase(getCurrentUser.fulfilled, (state, action) => {
//   //   state.isLoading = false
//   //   state.currentUser = action.payload
//   // })
//   // .addCase(getCurrentUser.rejected, (state) => {
//   //   state.isLoading = false
//   //   state.currentUser = null
//   // })
//   // .addCase(logout.fulfilled, (state) => {
//   //   state.isLoading = false
//   //   state.currentUser = null
//   // })
// })

// export default authSlice.reducer

// import { registerUser, userLogin } from './authActions'

// initialize userToken from local storage
