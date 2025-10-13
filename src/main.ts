import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { CustomValidationPipe } from './shared/pipes/custom-validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  const PORT = config.getOrThrow<number>('API_PORT')

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new CustomValidationPipe())

  await app.listen(PORT, () =>
    console.log(`Server => http://localhost:${PORT}`),
  )
}
bootstrap().catch(err => {
  console.error(err)
  process.exit(1)
})
