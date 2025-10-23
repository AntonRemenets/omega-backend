import { HttpException, HttpStatus } from '@nestjs/common'
import { IResponse } from '../interfaces'

export class CustomUnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    const response: IResponse = {
      message: message,
    }
    super(response, HttpStatus.UNAUTHORIZED)
  }
}
