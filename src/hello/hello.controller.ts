import { Controller, Get } from '@nestjs/common'

@Controller('get-hello')
export class HelloController {
  @Get()
  public getHello() {
    return 'Hello World!'
  }
}
