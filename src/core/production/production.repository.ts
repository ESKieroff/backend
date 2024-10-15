import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  production_orders,
  Prisma,
  production_orders_items
} from '@prisma/client';

@Injectable()
export class ProductionRepository {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.production_ordersCreateInput) {
    return await this.prisma.production_orders.create({
      data
    });
  }

  async createOrderItem(
    data: Prisma.production_orders_itemsUncheckedCreateInput
  ) {
    return await this.prisma.production_orders_items.create({
      data
    });
  }

  async getLastSequence(productionOrderId: number): Promise<number> {
    const lastItem = await this.prisma.production_orders_items.findFirst({
      where: { production_order_id: productionOrderId },
      orderBy: { sequence: 'desc' }
    });
    return lastItem ? lastItem.sequence : 0;
  }

  async getOrderItems(
    productionOrderId: number
  ): Promise<production_orders_items[]> {
    return await this.prisma.production_orders_items.findMany({
      where: { production_order_id: productionOrderId },
      orderBy: { sequence: 'asc' }
    });
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
    // fazer join das duas tabelas production_orders join production_orders_items
    const result = await this.prisma.production_orders.findMany({
      orderBy: { [orderBy]: 'asc' },
      include: {
        production_item: {
          select: {
            id: true,
            production_order_id: true,
            sequence: true,
            final_product_id: true,
            prodution_quantity_estimated: true,
            production_quantity_real: true,
            production_quantity_loss: true,
            lote: true,
            lote_expiration: true,
            created_at: true,
            updated_at: true,
            created_by: true,
            updated_by: true
          },
          orderBy: { sequence: 'asc' }
        }
      }
    });

    return result;
  }

  async findById(id: number): Promise<production_orders | null> {
    const order = this.prisma.production_orders.findUnique({
      where: { id },
      include: {
        production_item: {
          select: {
            id: true,
            production_order_id: true,
            sequence: true,
            final_product_id: true,
            final_product_made: {
              select: {
                description: true
              }
            },
            prodution_quantity_estimated: true,
            production_quantity_real: true,
            production_quantity_loss: true,
            lote: true,
            lote_expiration: true,
            created_at: true,
            updated_at: true,
            created_by: true,
            updated_by: true
          }
        }
      }
    });

    if (!order) {
      return null;
    }

    return order;
  }

  async updateOrder(
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

  async updateOrderItem(
    id: number,
    data: Prisma.production_orders_itemsUncheckedUpdateInput
  ): Promise<production_orders_items> {
    const product = this.prisma.production_orders_items.update({
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
