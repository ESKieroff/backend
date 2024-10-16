import { Injectable } from '@nestjs/common';
import { Prisma, stock, stock_items, Stock_Moviment } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}

  async createStock(data: Prisma.stockCreateInput) {
    return await this.prisma.stock.create({ data });
  }

  async createStockItems(data: Prisma.stock_itemsUncheckedCreateInput) {
    return await this.prisma.stock_items.create({ data });
  }

  async getLastSequence(stockId: number): Promise<number> {
    const lastItem = await this.prisma.stock_items.findFirst({
      where: { stock_id: stockId },
      orderBy: { sequence: 'desc' }
    });
    return lastItem ? lastItem.sequence : 0;
  }

  async getStockItems(stockId: number): Promise<stock_items[]> {
    return await this.prisma.stock_items.findMany({
      where: { stock_id: stockId },
      orderBy: { sequence: 'asc' }
    });
  }

  async checkStock(product_id: number, lote: string): Promise<number> {
    const inputs = await this.prisma.stock_items.aggregate({
      where: {
        product_id: product_id,
        lote: lote,
        stock: {
          stock_moviment: Stock_Moviment.INPUT
        }
      },
      _sum: {
        quantity: true
      }
    });

    const totalInput = inputs._sum.quantity || 0;

    const outputs = await this.prisma.stock_items.aggregate({
      where: {
        product_id: product_id,
        lote: lote,
        stock: {
          stock_moviment: Stock_Moviment.OUTPUT
        }
      },
      _sum: {
        quantity: true
      }
    });

    const totalOutput = outputs._sum.quantity || 0;

    const totalQuantity = totalInput - totalOutput;

    return totalQuantity;
  }

  async findAllStockItems(orderBy: string): Promise<stock[]> {
    const validOrderFields = [
      'id',
      'product_id',
      'lote',
      'quantity',
      'stock_id',
      'sequence',
      'created_at',
      'updated_at'
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.stock.findMany({
      orderBy: { [orderBy]: 'asc' },
      include: {
        stock_items: {
          select: {
            id: true,
            product_id: true,
            lote: true,
            quantity: true,
            stock_id: true,
            sequence: true,
            created_at: true,
            updated_at: true
          },
          orderBy: { sequence: 'asc' }
        }
      }
    });
    return result;
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
      where: { id },
      include: {
        stock_items: {
          select: {
            id: true,
            product_id: true,
            lote: true,
            quantity: true,
            stock_id: true,
            sequence: true,
            created_at: true,
            updated_at: true
          },
          orderBy: { sequence: 'asc' }
        }
      }
    });

    if (!stock) {
      throw new Error('Stock not found');
    }

    return stock;
  }

  async findManyByIds(ids: number[]): Promise<stock[]> {
    return this.prisma.stock.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  async findAllWithLots(orderBy: string): Promise<stock_items[]> {
    const validOrderFields = ['product_id'];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.stock_items.findMany({
      include: {
        stock: true
      },
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }
}
