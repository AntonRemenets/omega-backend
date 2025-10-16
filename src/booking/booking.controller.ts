import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { BookingService } from './booking.service'
import { ReserveDto } from './dto/reserve.dto'
import { CreateEventDto } from './dto/create-event.dto'
import { Roles } from '../shared/decorators/roles.decorator'
import { Role } from '../shared/enums'
import { AuthGuard } from '../shared/guards/auth.guard'
import { RolesGuard } from '../shared/guards/role.guard'

@Controller('bookings')
export class BookingController {
  constructor(private readonly booking: BookingService) {}

  @UseGuards(AuthGuard)
  @Post('reserve')
  public reserve(@Body() dto: ReserveDto) {
    return this.booking.reserve(dto)
  }

  // Вспомогательные методы
  // Создание эвента в бд
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create-event')
  public createEvent(@Body() dto: CreateEventDto) {
    return this.booking.createEvent(dto)
  }

  // Список эвентов
  @UseGuards(AuthGuard)
  @Get('events')
  public getEvents() {
    return this.booking.getAllEvents()
  }
}
