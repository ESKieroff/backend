import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { categories, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.categoriesCreateInput): Promise<categories> {
    return this.prisma.categories.create({ data });
  }

  async findAll(): Promise<categories[]> {
    return this.prisma.categories.findMany({
      where: { active: true }
    });
  }

  async findOne(id: number): Promise<categories | null> {
    return this.prisma.categories.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.categoriesUpdateInput
  ): Promise<categories> {
    return this.prisma.categories.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await this.prisma.categories.update({
      where: { id },
      data: { active: false }
    });
  }
}
