import { HttpException, HttpStatus } from '@nestjs/common'
import { IResponse } from '../interfaces'

export class CustomUnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    const response: IResponse = {
      success: false,
      message: message,
    }
    super(response, HttpStatus.UNAUTHORIZED)
  }
}
