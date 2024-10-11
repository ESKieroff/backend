import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create.stock.dto';
import { UpdateStockDto } from './dto/update.stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll(orderBy: string) {
    return this.stockService.findAll(orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }

  @Post('add-raw-material/:id')
  addRawMaterial(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.stockService.addRawMaterial(+id, quantity);
  }

  @Post('remove-raw-material/:id')
  removeRawMaterial(
    @Param('id') id: string,
    @Body('quantity') quantity: number
  ) {
    return this.stockService.removeRawMaterial(+id, quantity);
  }
}
