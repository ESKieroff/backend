import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service'; // Adjust the import path as necessary
import { Prisma, stock_location } from '@prisma/client'; // Import types from Prisma client

@Injectable()
export class StockLocationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.stock_locationCreateInput
  ): Promise<stock_location> {
    const stock_location = await this.prisma.stock_location.create({
      data
    });

    return stock_location;
  }

  async findAll(orderBy: string): Promise<stock_location[]> {
    const validOrderFields = ['id', 'description', 'active'];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.stock_location.findMany({
      where: { active: true },
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async findById(id: number): Promise<stock_location | null> {
    const stock_location = await this.prisma.stock_location.findUnique({
      where: { id }
    });

    if (!stock_location) {
      return null;
    }

    const stock_locationWithoutSensitiveFields = {
      ...stock_location,
      active: undefined
    };

    return stock_locationWithoutSensitiveFields;
  }

  async bulkUpdateStatus(ids: number[], data: Partial<stock_location>) {
    await this.prisma.stock_location.updateMany({
      where: {
        id: { in: ids }
      },
      data
    });
  }

  async matchstock_locationByData(
    description: string
  ): Promise<stock_location[]> {
    return this.prisma.stock_location.findMany({
      where: {
        OR: [{ description: { equals: description } }]
      }
    });
  }

  async update(
    id: number,
    data: Prisma.stock_locationUpdateInput
  ): Promise<stock_location> {
    const stock_location = this.prisma.stock_location.update({
      where: { id },
      data
    });

    const stock_locationResponse = {
      ...stock_location
    };
    return stock_locationResponse;
  }
  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingStockLocation = await this.findById(id);
    if (!existingStockLocation) {
      throw new Error('Product not found');
    }

    await this.prisma.stock_location.update({
      where: { id },
      data: {
        active: false,
        updated_at: new Date()
      }
    });
  }
}
