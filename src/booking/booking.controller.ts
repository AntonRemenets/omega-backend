import { Body, Controller, Get, Post } from '@nestjs/common'
import { BookingService } from './booking.service'
import { ReserveDto } from './dto/reserve.dto'
import { CreateEventDto } from './dto/create-event.dto'

@Controller('bookings')
export class BookingController {
  constructor(private readonly booking: BookingService) {}

  @Post('reserve')
  public reserve(@Body() dto: ReserveDto) {
    return this.booking.reserve(dto)
  }

  // Вспомогательные методы
  // Создание эвента в бд
  @Post('create-event')
  public createEvent(@Body() dto: CreateEventDto) {
    return this.booking.createEvent(dto)
  }

  // Список эвентов
  @Get('events')
  public getEvents() {
    return this.booking.getAllEvents()
  }
}
