import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from 'prisma/generated'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  public async onModuleInit() {
    await this.$connect()
      .then(() => this.logger.log('PostgresSQL is o.k.'))
      .catch(() => {
        this.logger.error('PostgresSQL failed to connect')
        process.exit(1)
      })
  }

  public async onModuleDestroy() {
    await this.$disconnect()
  }
}
