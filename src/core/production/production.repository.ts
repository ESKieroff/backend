import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { production_orders, Prisma } from '@prisma/client';

@Injectable()
export class ProductionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.production_ordersCreateInput
  ): Promise<production_orders> {
    const order = await this.prisma.production_orders.create({
      data
    });

    const productionResponse = {
      ...order
    };
    return productionResponse;
  }
  //Precisa da order no bd
  async findAll(orderBy: string): Promise<production_orders[]> {
    const order = [
      'id',
      'number',
      'description',
      'production_date',
      'Production_Status',
      'created_by',
      'updated_by'
    ];
    if (!order.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.production_orders.findMany({
      orderBy: { [orderBy]: 'asc' }
    });
    return result;
  }

  // buscar os dados da tabela production_orders join production_orders_items
  async findAllProductionItems(orderBy: string): Promise<production_orders[]> {
    const order = [
      'id',
      'number',
      'description',
      'production_date',
      'Production_Status',
      'created_by',
      'updated_by'
    ];
    if (!order.includes(orderBy)) {
      throw new Error('Invalid order field');
    }
    // fazer join das duas tabelas production_orders join production_orders_items usando agregate
    const result = await this.prisma.production_orders.findMany({
      orderBy: { [orderBy]: 'asc' },
      include: {
        production_item: true
      }
    });

    return result;
  }

  async findById(id: number): Promise<production_orders | null> {
    const order = this.prisma.production_orders.findUnique({
      where: { id }
    });

    if (!order) {
      return null;
    }

    return order;
  }
  async matchProductionByData(
    number: number
    //   name:string,
    //   price:number,
    //   stock:number,
    //   items
  ): Promise<production_orders[]> {
    return this.prisma.production_orders.findMany({
      where: {
        OR: [{ id: { equals: number } }]
      }
    });
  }
  async update(
    id: number,
    data: Prisma.production_ordersUpdateInput
  ): Promise<production_orders> {
    const product = this.prisma.production_orders.update({
      where: { id },
      data
    });

    const productionResponse = {
      ...product
    };
    return productionResponse;
  }
  async delete(id: number): Promise<void> {
    await this.prisma.production_orders.update({
      where: { id },
      data: {
        updated_at: new Date()
      }
    });
  }
}
