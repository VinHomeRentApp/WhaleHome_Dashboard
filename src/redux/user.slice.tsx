import { LoginResponse, ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
// import { UserLogin } from '../types/user.type'

export const loginApi = (email: string, password: string) => {
  return http.post<ResponseSuccessful<LoginResponse>>('/auth/authenticate', {
    email: email,
    password: password
  })
}
