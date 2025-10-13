export interface IUser {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
}

export interface IResponse {
  success: boolean
  message: string
  data?: any
}

export interface ITokenResponse extends IResponse {
  data: { token: string | null }
}
