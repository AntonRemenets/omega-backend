import { Module } from '@nestjs/common'
import { HelloModule } from './hello/hello.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { BookingModule } from './booking/booking.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    HelloModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
