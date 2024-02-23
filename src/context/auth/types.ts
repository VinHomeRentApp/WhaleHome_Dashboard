export interface AuthState<TData> {
  isAuthenticated?: boolean
  isInitialized?: boolean
  user: TData | null
}
