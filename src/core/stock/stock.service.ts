import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create.stock.dto';
import { UpdateStockDto } from './dto/update.stock.dto';
import { StockRepository } from './stock.repository';
// import { stock_items } from '@prisma/client';

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

  // organizeResponseByProduct(stockItems: any[]): stock_items[] {
  //   const produtosMap = new Map<number, stock_items>();

  //   stockItems.forEach(item => {
  //     const { product_id, lote, quantity, unit_price } = item;
  //     const total_price = quantity * unit_price;

  //     if (!produtosMap.has(product_id)) {
  //       produtosMap.set(product_id, {
  //         product_id,
  //         total_quantity: 0,
  //         total_price: 0,
  //         lotes: []
  //       });
  //     }

  //     const produto = produtosMap.get(product_id)!;
  //     produto.total_quantity += quantity;
  //     produto.total_price += total_price;

  //     const loteExistente = produto.lotes.find(l => l.lote === lote);
  //     if (loteExistente) {
  //       loteExistente.quantity += quantity;
  //       loteExistente.total_price += total_price;
  //     } else {
  //       produto.lotes.push({ lote, quantity, total_price });
  //     }
  //   });

  //   return Array.from(produtosMap.values());
  // }
}
