import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateEventDto } from './dto/create-event.dto'
import { IResponse } from '../shared/interfaces'
import { ReserveDto } from './dto/reserve.dto'

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  public async reserve(dto: ReserveDto): Promise<IResponse> {
    const { eventId, userId } = dto
    const userCandidate = await this.prisma.user.findUnique({
      where: { id: userId },
    })
    const eventCandidate = await this.prisma.event.findUnique({
      where: { id: eventId },
    })
    const bookingCheck = await this.prisma.booking.findFirst({
      where: { eventId, userId },
    })

    if (!userCandidate || !eventCandidate) {
      const message = 'Wrong event or user'

      throw new HttpException(
        { message, errors: message },
        HttpStatus.NOT_FOUND,
      )
    }
    if (bookingCheck) {
      const message = 'User already booked this event'

      throw new HttpException({ message, errors: message }, HttpStatus.CONFLICT)
    }

    try {
      const booking = await this.prisma.booking.create({
        data: { eventId, userId },
      })

      return {
        message: 'Booking created successfully',
        data: {
          id: booking.id,
          event: eventCandidate.name,
          user: userCandidate.name,
          createdAt: booking.createdAt,
        },
      }
    } catch (e) {
      let message = 'Unknown error'
      if (e instanceof Error) {
        message = e.message
      }

      throw new HttpException(
        { message, errors: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async createEvent(dto: CreateEventDto): Promise<IResponse> {
    const { name, totalSeats } = dto

    try {
      const newEvent = await this.prisma.event.create({
        data: { name, totalSeats },
      })

      return {
        message: 'Event created',
        data: { id: newEvent.id, name },
      }
    } catch (e) {
      let message = 'Unknown error'
      if (e instanceof Error) {
        message = e.message
      }

      throw new HttpException(
        { message, errors: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async getAllEvents(): Promise<IResponse> {
    try {
      const events = await this.prisma.event.findMany()

      return {
        message: 'List of events',
        data: events,
      }
    } catch (e) {
      let message = 'Unknown error'
      if (e instanceof Error) {
        message = e.message
      }

      throw new HttpException(
        { message, errors: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
