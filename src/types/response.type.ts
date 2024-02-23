export interface ResponseSuccessful<TData> {
  message: string
  data: TData
}

export interface LoginResponse {
  access_token: string
  // other properties if any
}
