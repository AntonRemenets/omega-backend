import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'Event name is required' })
  name: string

  @IsNumber()
  @IsNotEmpty({ message: 'Total seats is required' })
  totalSeats: number
}
