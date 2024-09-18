import { Module } from '@nestjs/common';
import { StokService } from './stock.service';
import { StokController } from './stock.controller';

@Module({
  controllers: [StokController],
  providers: [StokService]
})
export class StokModule {}
