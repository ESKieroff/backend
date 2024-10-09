import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
// import { CreateStockLocationDto } from './dto/create-stock-locations.dto';
import { CreateStockLocationSchema } from './dto/stock-location.schema';
// import { StockLocationsService } from './stock_locations.service';

@Controller('stock-locations')
export class StockLocationsController {
  // constructor(private readonly stockLocationService: StockLocationsService) {}

  @Post()
  async create(@Body() CreateStockLocationDto) {
    const errors = [];

    const descriptionValidation =
      CreateStockLocationSchema.shape.description.safeParse(
        CreateStockLocationDto.description
      );
    if (!descriptionValidation.success) {
      errors.push({
        field: 'description',
        message: descriptionValidation.error.errors[0].message
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // const matchedStockLocations =
    //   await this.stockLocationService.matchStockLocationByData(
    //     CreateStockLocationDto.description
    //   );
  }
}
