import { http } from '../utils/http'

export const logout = (token: string) => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return http.post(`/auth/logout?token=${token}`)
}
