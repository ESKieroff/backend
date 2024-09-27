import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { products, Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.productsCreateInput): Promise<products> {
    const product = await this.prisma.products.create({
      data
    });

    const productResponse = {
      ...product
    };
    return productResponse;
  }

  async findAll(orderBy: string): Promise<products[]> {
    const validOrderFields = [
      'id',
      'code',
      'description',
      'sku',
      'origin',
      'unit_measure',
      'category_id',
      'group_id'
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.products.findMany({
      where: { active: true },
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async findById(id: number): Promise<products | null> {
    const product = this.prisma.products.findUnique({
      where: { id }
    });
    // cria uma const para armazenar o produto criado e remover campos sensíveis
    const productWithoutSensitiveFields = {
      ...product,
      active: undefined
    };

    return productWithoutSensitiveFields;
  }

  // Busca vários produtos pelos IDs fornecidos
  async findManyByIds(ids: number[]): Promise<products[]> {
    return this.prisma.products.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  // Atualiza o status de vários produtos de uma vez (remover, desativar, etc.)
  async bulkUpdateStatus(ids: number[], data: Partial<products>) {
    await this.prisma.products.updateMany({
      where: {
        id: { in: ids }
      },
      data
    });
  }

  async matchProductByData(
    code: string,
    description: string,
    sku: string
  ): Promise<products[]> {
    return this.prisma.products.findMany({
      where: {
        OR: [
          { code: { equals: code } },
          { description: { equals: description } },
          { sku: { equals: sku } }
        ]
      }
    });
  }

  async update(
    id: number,
    data: Prisma.productsUpdateInput
  ): Promise<products> {
    const product = this.prisma.products.update({ where: { id }, data });

    const productResponse = {
      ...product
    };
    return productResponse;
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingProduct = await this.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await this.prisma.products.update({
      where: { id },
      data: {
        active: false,
        updated_at: new Date()
      }
    });
  }
}
