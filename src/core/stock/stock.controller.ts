import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create.stock.dto';
import { UpdateStockItemsDto } from './dto/update.stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
    // valida campos válidos
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
  update(
    @Param('id') id: string,
    @Body() updateStockItemsDto: UpdateStockItemsDto
  ) {
    return this.stockService.update(+id, updateStockItemsDto);
  }

  @Get('with-lots')
  findAllWithLots(@Query('orderBy') orderBy: string) {
    return this.stockService.findAllWithLots(orderBy);
  }

  // criar endpoint que lista os produtos em estoque com os lotes

  // orderby = 'product_id' | 'lote' | 'quantity' |'description' |
  // campos que pode receber: product_id, lote, quantity, unit_price, total_price

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stockService.remove(+id);
  // }

  // @Post('add-raw-material/:id')
  // addRawMaterial(@Param('id') id: string, @Body('quantity') quantity: number) {
  //   return this.stockService.addRawMaterial(+id, quantity);
  // }

  // @Post('remove-raw-material/:id')
  // removeRawMaterial(
  //   @Param('id') id: string,
  //   @Body('quantity') quantity: number
  // ) {
  //   return this.stockService.removeRawMaterial(+id, quantity);
  // }
}
