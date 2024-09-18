import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { products, Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.productsCreateInput): Promise<products> {
    return this.prisma.products.create({ data });
  }

  async findAll(): Promise<products[]> {
    return this.prisma.products.findMany({
      where: { active: true }
    });
  }

  async findOne(id: number): Promise<products | null> {
    return this.prisma.products.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.productsUpdateInput
  ): Promise<products> {
    return this.prisma.products.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await this.prisma.products.update({
      where: { id },
      data: { active: false }
    });
  }
}
