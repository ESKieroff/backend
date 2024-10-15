import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
  //NotFoundException,
  //  BadRequestException
} from '@nestjs/common';
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
//import { ResponseProductionDto } from './dto/response.production.dto';
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
      'Field to order by. Valid fields: id, description, production_date, Production_Status, created_by, updated_by',
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
  async findAll(@Query('orderBy') orderBy: string = 'id') {
    return this.productionService.findAll(orderBy);

    // return production.map(prod => ({
    //   id: prod.id,
    //   number: prod.number,
    //   description: prod.description,
    //   production_date: prod.production_date,
    //   Production_Status: prod.Production_Status,
    //   created_at: prod.created_at,
    //   updated_at: prod.updated_at,
    //   created_by: prod.created_by,
    //   updated_by: prod.updated_by,
    //   production_items: prod.production_item.map(item => ({
    //     id: item.id,
    //     production_order_id: item.production_order_id,
    //     sequence: item.sequence,
    //     final_product_id: item.final_product_id,
    //     prodution_quantity_estimated: item.prodution_quantity_estimated,
    //     production_quantity_real: item.production_quantity_real,
    //     production_quantity_loss: item.production_quantity_loss,
    //     lote: item.lote,
    //     lote_expiration: item.lote_expiration,
    //     created_at: item.created_at,
    //     updated_at: item.updated_at,
    //     created_by: item.created_by,
    //     updated_by: item.updated_by
    //   }))
    // }));
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
