import { IsNotEmpty, IsString } from 'class-validator'

export class ReserveDto {
  @IsString()
  @IsNotEmpty()
  eventId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}
