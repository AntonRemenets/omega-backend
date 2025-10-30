import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { randomBytes, scryptSync } from 'crypto'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { IJwtPayload, IResponse, ITokenResponse } from '../shared/interfaces'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  public async createNewUser(dto: CreateUserDto): Promise<IResponse> {
    const { name, email, password } = dto
    const candidate = await this.prisma.user.findUnique({
      where: { email },
    })
    const count = await this.prisma.user.count()

    if (candidate || count > 50) {
      const message = 'User already exists or too many records'

      throw new HttpException({ message, errors: message }, HttpStatus.CONFLICT)
    }

    try {
      await this.prisma.user.create({
        data: { name, email, password: this.hashPassword(password) },
      })

      return {
        message: 'Created',
      }
    } catch (e) {
      let message = 'Unknown error'
      if (e instanceof Error) {
        message = e.message
      }

      throw new HttpException(
        { message, errors: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async loginUser(dto: LoginUserDto): Promise<ITokenResponse> {
    const { email, password } = dto
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user || !this.validatePassword(password, user.password)) {
      const message = 'Wrong email or password'

      throw new HttpException(
        { message, errors: message },
        HttpStatus.UNAUTHORIZED,
      )
    }

    try {
      const payload: IJwtPayload = { userId: user.id, role: user.role }
      const token = await this.jwt.signAsync(payload)

      return {
        message: 'Authentication Successfully',
        data: { token },
      }
    } catch (e) {
      let message = 'Unknown error'
      if (e instanceof Error) {
        message = e.message
      }

      throw new HttpException(
        { message, errors: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async listOfUsers(): Promise<IResponse> {
    const users = await this.prisma.user.findMany()

    return {
      message: 'Users',
      data: users,
    }
  }

  private hashPassword(passwd: string): string {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(passwd, salt, 64).toString('hex')

    return `${salt}:${hash}`
  }

  private validatePassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(':')
    const hashVerify = scryptSync(password, salt, 64).toString('hex')
    return hash === hashVerify
  }
}
