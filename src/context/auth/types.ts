import { User } from '../../types/user.type'

export interface AuthState {
  isAuthenticated?: boolean
  isInitialized?: boolean
  user: User | null
}
