import { Injectable } from '@nestjs/common';
import { Prisma, stock, stock_items } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}

  async createStock(data: Prisma.stockCreateInput): Promise<stock> {
    const stock = await this.prisma.stock.create({
      data
    });

    const stockResponse = {
      ...stock
    };
    return stockResponse;
  }

  async createStockItems(
    data: Prisma.stock_itemsCreateInput
  ): Promise<stock_items> {
    const stock = await this.prisma.stock_items.create({
      data
    });

    const stockItemsResponse = {
      ...stock
    };
    return stockItemsResponse;
  }

  async checkStock(product_id: number, lote: string): Promise<number> {
    const result = await this.prisma.stock_items.aggregate({
      where: {
        product_id: product_id,
        lote: lote
      },
      _sum: {
        quantity: true
      }
    });

    return result._sum.quantity || 0;
  }

  async findItemsByStockId(stock_id: number): Promise<stock_items[]> {
    return await this.prisma.stock_items.findMany({
      where: { stock_id },
      orderBy: { sequence: 'asc' }
    });
  }

  async update(data: Prisma.stockCreateInput): Promise<stock> {
    const stock = await this.prisma.stock.create({
      data
    });

    const stockResponse = {
      ...stock
    };
    return stockResponse;
  }

  async findAll(orderBy: string): Promise<stock[]> {
    const validOrderFields = [
      'id',
      'document_number',
      'document_date',
      'stock_moviment',
      'created_at',
      'updated_at'
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.stock.findMany({
      where: {},
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async findById(id: number): Promise<stock | null> {
    const stock = this.prisma.stock.findUnique({
      where: { id }
    });

    const stockWithoutSensitiveFields = {
      ...stock,
      active: undefined
    };

    return stockWithoutSensitiveFields;
  }

  async findManyByIds(ids: number[]): Promise<stock[]> {
    return this.prisma.stock.findMany({
      where: {
        id: { in: ids }
      }
    });
  }
}
