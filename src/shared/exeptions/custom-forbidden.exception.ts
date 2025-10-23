import { HttpException, HttpStatus } from '@nestjs/common'
import { IResponse } from '../interfaces'

export class CustomForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden: Insufficient permissions') {
    const response: IResponse = {
      message: message,
    }
    super(response, HttpStatus.FORBIDDEN)
  }
}
