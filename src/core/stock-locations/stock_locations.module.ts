import { Module } from '@nestjs/common';
import { StockLocationsController } from './stock_locations.controller';
import { StockLocationsService } from './stock_locations.service';

@Module({
  controllers: [StockLocationsController],
  providers: [StockLocationsService]
})
export class StockLocationsModule {}
