import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockRepository } from './stock.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockController],
  providers: [StockService, StockRepository]
})
export class StockModule {}
