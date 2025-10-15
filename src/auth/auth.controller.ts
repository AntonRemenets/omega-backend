import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  public registerNewUser(@Body() dto: CreateUserDto) {
    return this.auth.createNewUser(dto)
  }

  @Post('delete')
  public deleteExistingUser() {
    return null
  }

  @Post('login')
  public loginUser(@Body() dto: LoginUserDto) {
    return this.auth.loginUser(dto)
  }

  @Get('users')
  public async getUsers() {
    return this.auth.listOfUsers()
  }
}
