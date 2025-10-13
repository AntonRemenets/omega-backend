import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import { IResponse } from '../interfaces'

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      exceptionFactory: (
        validationErrors: ValidationError[] = [],
      ): BadRequestException => {
        // Преобразуем ошибки валидации в массив строк
        const errors = this.formatErrors(validationErrors)

        // Создаем объект ответа согласно IResponse
        const response: IResponse = {
          success: false,
          message: 'Bad Request',
          data: errors,
        }

        return new BadRequestException(response)
      },
    })
  }

  private formatErrors(
    errors: ValidationError[],
    parentProperty: string = '',
  ): string[] {
    let messages: string[] = []

    errors.forEach(error => {
      const property = parentProperty
        ? `${parentProperty}.${error.property}`
        : error.property

      if (error.constraints) {
        // Добавляем все сообщения об ошибках для данного свойства
        messages = [
          ...messages,
          ...Object.values(error.constraints).map(
            message => `${property}: ${message}`,
          ),
        ]
      }

      // Рекурсивно обрабатываем вложенные ошибки
      if (error.children && error.children.length > 0) {
        messages = [...messages, ...this.formatErrors(error.children, property)]
      }
    })

    return messages
  }
}
