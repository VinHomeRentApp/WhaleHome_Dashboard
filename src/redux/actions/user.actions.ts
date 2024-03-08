import { LoginResponse, ResponseSuccessful } from '../../types/response.type'
import { User } from '../../types/user.type'
import { http } from '../../utils/http'

export const loginApi = async (email: string, password: string) => {
  return await http.post<ResponseSuccessful<LoginResponse>>('/auth/authenticate', {
    email: email,
    password: password
  })
}

export const getUserDataFromToken = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const res = await http.post<ResponseSuccessful<User>>('/auth/getUser', { access_token: token })
      const data = res.data.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
  return null
}

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   loading: false,
//   userInfo: {}, // for user object
//   userToken: null, // for storing the JWT
//   error: null,
//   success: false // for monitoring the registration process.
// }

// const useReducer = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {}
//   // extraReducers: {}
// })

// export default useReducer.reducer
