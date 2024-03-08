const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null

export const initialAuthState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false
}

export interface LoginArgs {
  email: string
  password: string
}
