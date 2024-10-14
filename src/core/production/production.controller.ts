import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  //NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ResponseProductionDto } from './dto/response.production.dto';
import { ApiQuery } from '@nestjs/swagger';
// import { ZodError } from 'zod';
// import { Production } from './entities/production.entity';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  create(@Body() createProductionDto: CreateProductionDto) {
    return this.productionService.create(createProductionDto);
  }

  @Get()
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description:
      'Field to order by. Valid fields: id, description, code, sku, category_id, group_id, supplier_id',
    enum: [
      'id',
      'number',
      'description',
      'production_date',
      'Production_Status',
      'created_by',
      'updated_by'
    ]
  })
  async findAll(
    @Query('orderBy') orderBy: string = 'id'
  ): Promise<ResponseProductionDto[]> {
    const validOrderFields = [
      'id',
      'number',
      'description',
      'production_date',
      'Production_Status',
      'created_by',
      'updated_by'
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new BadRequestException(`Invalid order field: ${orderBy}`);
    }

    const production = await this.productionService.findAll(orderBy);
    return production.map(production => ({
      id: production.id,
      number: production.number,
      description: production.description,
      production_date: production.production_date,
      Production_Status: production.Production_Status
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto
  ) {
    return this.productionService.update(+id, updateProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionService.remove(+id);
  }
}
