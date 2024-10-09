import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreateStockLocationDto } from './dto/create-stock-locations.dto';
import {
  CreateStockLocationSchema,
  UpdateStockLocationSchema
} from './dto/stock-location.schema';
import { StockLocationsService } from './stock_locations.service';
import { UpdateStockLocationDto } from './dto/update-stock-locations.dto';
import { ZodError } from 'zod';

@Controller('stock-locations')
export class StockLocationsController {
  constructor(private readonly stockLocationService: StockLocationsService) {}

  @Post()
  async create(@Body() createStockLocationDto: CreateStockLocationDto) {
    const errors = [];

    const descriptionValidation =
      CreateStockLocationSchema.shape.description.safeParse(
        createStockLocationDto.description
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

    const matchedStockLocations =
      await this.stockLocationService.matchStockLocationByData(
        createStockLocationDto.description
      );

    if ((await matchedStockLocations).length > 0) {
      const existingStockLocation = matchedStockLocations[0];

      if (!existingStockLocation.active) {
        throw new BadRequestException(
          `Stock Location already exists but is not active. Activate and update it: ${JSON.stringify(
            existingStockLocation
          )}`
        );
      }

      throw new BadRequestException(
        'Stock Location already exists. Try update it instead'
      );
    }
    return this.stockLocationService.create(createStockLocationDto);
  }

  @Get()
  async findAll(@Query('orderBy') orderBy: string = 'id') {
    const validOrderFields = ['id', 'description'];

    if (!validOrderFields.includes(orderBy)) {
      throw new BadRequestException(`Invalid order field: ${orderBy}`);
    }

    return this.stockLocationService.findAll(orderBy);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.stockLocationService.findById(+id);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(Error));
    }
  }

  @Patch(';id')
  async update(
    @Param('id') id: string,
    @Body() UpdateStockLocationDto: UpdateStockLocationDto,
    @Query() queryParams: Record<string, string>
  ) {
    const existingStockLocation = await this.stockLocationService.findById(+id);
    if (!existingStockLocation) {
      throw new NotFoundException(`Stock Location with ID ${id} not found`);
    }

    if (!existingStockLocation.active) {
      throw new BadRequestException(`Stock Location ID ${id} is not active`);
    }

    const allowedFields = Object.keys(UpdateStockLocationSchema.shape);
    const fieldsToUpdate = Object.keys(queryParams);

    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('No fields provided to update');
    }

    const updateData: Partial<UpdateStockLocationDto> = {};

    for (const field of fieldsToUpdate) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field to update: ${field}`);
      }

      updateData[field] = queryParams[field];
    }

    const validation = UpdateStockLocationSchema.safeParse(updateData);

    if (!validation.success) {
      const zodError = validation.error as ZodError;
      const firstError = zodError.errors[0];
      throw new BadRequestException(
        `${firstError.path[0]} is invalid: ${firstError.message}`
      );
    }

    const updatedStockLocation = await this.stockLocationService.update(
      +id,
      updateData as UpdateStockLocationDto
    );

    return updatedStockLocation;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const existingStockLocation = this.stockLocationService.findById(+id);
    if (!existingStockLocation) {
      throw new NotFoundException(`Stock Location with ID ${id} not found`);
    }

    try {
      this.stockLocationService.remove(+id);

      return {
        message: `Stock Location with ID ${id} deleted successfully`
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(Error));
    }
  }

  @Post('activate/:id')
  async activate(@Param('id') id: string) {
    await this.stockLocationService.reactivateStockLocation(+id);

    return {
      message: `Stock Location with ID ${id} activated successfully`
    };
  }
}
