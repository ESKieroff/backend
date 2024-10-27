import { Injectable } from '@nestjs/common';
import { Prisma, compositions, composition_items } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
@Injectable()
export class CompositionsRepository {
  constructor(private prisma: PrismaService) {}

  async createCompositions(data: Prisma.compositionsCreateInput) {
    return await this.prisma.compositions.create({
      data: {
        description: data.description,
        production_steps: data.production_steps,
        created_at: new Date(),
        updated_at: new Date(),
        product_made: {
          connect: { id: Number(data.product_made) }
        },
        ...(data.users_created
          ? { users_created: { connect: { id: Number(data.users_created) } } }
          : {}),
        ...(data.users_updated
          ? { users_updated: { connect: { id: Number(data.users_updated) } } }
          : {})
      }
    });
  }

  async createCompositionsItems(
    data: Partial<Prisma.composition_itemsUncheckedCreateInput>
  ) {
    return await this.prisma.composition_items.create({
      data: {
        sequence: data.sequence,
        quantity: data.quantity,
        created_at: new Date(),
        updated_at: new Date(),
        compositions: {
          connect: { id: data.composition_id }
        },
        product_raw: {
          connect: { id: data.raw_product }
        },
        ...(data.created_by
          ? { users: { connect: { id: data.created_by } } }
          : {}),
        ...(data.updated_by
          ? { users: { connect: { id: data.updated_by } } }
          : {})
      }
    });
  }

  async updateCompositions(
    id: number,
    data: Prisma.compositionsUpdateInput
  ): Promise<compositions> {
    const compositions = await this.prisma.compositions.update({
      where: { id },
      data
    });

    return compositions;
  }

  async updateCompositionsItems(
    id: number,
    data: Partial<Prisma.composition_itemsUncheckedCreateInput>
  ) {
    const composition_items = await this.prisma.composition_items.update({
      where: { id },
      data: {
        sequence: data.sequence,
        quantity: data.quantity,
        created_at: new Date(),
        updated_at: new Date(),
        ...(data.raw_product
          ? {
              products: {
                connect: { id: data.raw_product }
              }
            }
          : {}),
        ...(data.created_by
          ? { users: { connect: { username: data.created_by } } }
          : {}),
        ...(data.updated_by
          ? { users: { connect: { username: data.updated_by } } }
          : {})
      }
    });

    return composition_items;
  }

  async getLastSequence(compositionsId: number): Promise<number> {
    const lastItem = await this.prisma.composition_items.findFirst({
      where: { composition_id: compositionsId },
      orderBy: { sequence: 'desc' }
    });
    return lastItem ? lastItem.sequence : 0;
  }

  async findByProductMade(product_id: number): Promise<compositions | null> {
    return this.prisma.compositions.findUnique({
      where: { id: product_id }
    });
  }

  async getCompositionsItems(
    compositionsId: number
  ): Promise<composition_items[]> {
    return await this.prisma.composition_items.findMany({
      where: { composition_id: compositionsId },
      orderBy: { sequence: 'asc' }
    });
  }

  async findAllCompositionsItems(orderBy: string): Promise<compositions[]> {
    const validOrderFields = [
      'id',
      'product_id',
      'lote',
      'quantity',
      'compositions_id',
      'sequence',
      'created_at',
      'updated_at'
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.compositions.findMany({
      orderBy: { [orderBy]: 'asc' },
      include: {
        composition_items: {
          select: {
            id: true,
            raw_product: true,
            quantity: true,
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

  async findItemsByCompositionsId(
    composition_id: number
  ): Promise<composition_items[]> {
    return await this.prisma.composition_items.findMany({
      where: { composition_id },
      orderBy: { sequence: 'asc' }
    });
  }

  async update(data: Prisma.compositionsCreateInput): Promise<compositions> {
    const compositions = await this.prisma.compositions.create({
      data
    });

    const compositionsResponse = {
      ...compositions
    };
    return compositionsResponse;
  }

  async findAll(orderBy: string): Promise<compositions[]> {
    const validOrderFields = [
      'id',
      'product_id',
      'created_at',
      'updated_at'
      //ver production steps
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.compositions.findMany({
      where: {},
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async findById(id: number): Promise<compositions | null> {
    const compositions = this.prisma.compositions.findUnique({
      where: { id },
      include: {
        composition_items: {
          select: {
            id: true,
            sequence: true,
            product_raw: {
              select: {
                id: true,
                description: true,
                code: true,
                sku: true
              }
            },
            quantity: true,
            created_at: true,
            updated_at: true
          },
          orderBy: { sequence: 'asc' }
        }
      }
    });

    if (!compositions) {
      throw new Error('Compositions not found');
    }

    return compositions;
  }

  async findManyByIds(ids: number[]): Promise<compositions[]> {
    return this.prisma.compositions.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  async findAllWithLots(orderBy: string): Promise<composition_items[]> {
    const validOrderFields = ['product_id'];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.composition_items.findMany({
      include: {
        compositions: true
      },
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async deleteCompositions(id: number): Promise<void> {
    await this.prisma.composition_items.deleteMany({
      where: {
        composition_id: id
      }
    });

    await this.prisma.compositions.delete({
      where: {
        id
      }
    });
  }
}
