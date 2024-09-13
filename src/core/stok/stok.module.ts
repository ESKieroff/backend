import { Module } from '@nestjs/common';
import { StokService } from './stok.service';
import { StokController } from './stok.controller';

@Module({
  controllers: [StokController],
  providers: [StokService]
})
export class StokModule {}
