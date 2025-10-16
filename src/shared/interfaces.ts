import { UserRole } from '../../prisma/generated'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}

export interface IResponse {
  success: boolean
  message: string
  data?: any
}

export interface ITokenResponse extends IResponse {
  data: { token: string | null }
}

export interface IJwtPayload {
  userId: string
  role: UserRole
}

export interface IRequestWithUser extends Request {
  user: IJwtPayload
}
