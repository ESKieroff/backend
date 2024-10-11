import { Injectable } from '@nestjs/common';
import { Prisma, stock } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.stockCreateInput): Promise<stock> {
    const stock = await this.prisma.stock.create({
      data
    });

    const stockResponse = {
      ...stock
    };
    return stockResponse;
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
