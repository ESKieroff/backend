import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  BadRequestException,
  Delete
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create.stock.dto';
import { UpdateStockDto } from './dto/update.stock.dto';
import { ApiQuery } from '@nestjs/swagger';
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
    // valida campos válidos
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
  findAll(orderBy: string) {
    return this.stockService.findAll(orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.stockService.findOne(idNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.stockService.update(idNumber, updateStockDto);
  }

  @Get('with-lots')
  findAllWithLots(@Query('orderBy') orderBy: string) {
    return this.stockService.findAllWithLots(orderBy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.stockService.remove(idNumber);
  }
}
