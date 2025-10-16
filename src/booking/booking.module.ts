import { Module } from '@nestjs/common'
import { BookingController } from './booking.controller'
import { BookingService } from './booking.service'
import { RolesGuard } from '../shared/guards/role.guard'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [BookingController],
  providers: [BookingService, RolesGuard],
})
export class BookingModule {}
