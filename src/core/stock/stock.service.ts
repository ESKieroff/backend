import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create.stock.dto';
import { UpdateStockDto } from './dto/update.stock.dto';
import { StockRepository } from './stock.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  create(createStockDto: CreateStockDto) {
    return this.stockRepository.create(createStockDto);
  }

  findAll(orderBy: string) {
    return this.stockRepository.findAll(orderBy);
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, _updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }

  addRawMaterial(id: number, quantity: number) {
    return `This action adds ${quantity} of raw material to stock #${id}`;
  }

  removeRawMaterial(id: number, quantity: number) {
    return `This action removes ${quantity} of raw material from stock #${id}`;
  }
}
