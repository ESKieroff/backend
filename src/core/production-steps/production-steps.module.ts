import { Module } from '@nestjs/common';
import { ProductionStepsService } from './production-steps.service';
import { ProductionStepsController } from './production-steps.controller';
import { ProductionStepsRepository } from './production-steps.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductionStepsController],
  providers: [ProductionStepsService, ProductionStepsRepository]
})
export class ProductionStepsModule {}
