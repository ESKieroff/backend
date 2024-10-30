import { Injectable } from '@nestjs/common';
import { Prisma, compositions, composition_items } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
@Injectable()
export class CompositionsRepository {
  constructor(private prisma: PrismaService) {}

  async createCompositions(data: Prisma.compositionsCreateInput) {
    const createdComposition = await this.prisma.compositions.create({
      data: {
        description: data.description,
        production_steps: data.production_steps,
        created_at: new Date(),
        updated_at: new Date(),
        product_made: {
          connect: { id: Number(data.product_made?.connect?.id) }
        },
        users_created: {
          connect: { username: String(data.users_created?.connect?.username) }
        },
        users_updated: {
          connect: { username: String(data.users_updated?.connect?.username) }
        }
      }
    });

    return createdComposition;
  }

  async createCompositionsItems(
    data: Partial<Prisma.composition_itemsCreateInput>
  ) {
    return await this.prisma.composition_items.create({
      data: {
        sequence: data.sequence,
        quantity: data.quantity,
        created_at: new Date(),
        updated_at: new Date(),
        compositions: {
          connect: { id: Number(data.compositions?.connect?.id) }
        },
        product_raw: {
          connect: { id: Number(data.product_raw?.connect?.id) }
        },
        users_created: {
          connect: { username: String(data.users_created?.connect?.username) }
        },
        users_updated: {
          connect: { username: String(data.users_updated?.connect?.username) }
        }
      }
    });
  }

  async updateCompositions(
    id: number,
    data: Prisma.compositionsUpdateInput
  ): Promise<compositions> {
    const compositions = await this.prisma.compositions.update({
      where: { id },
      data: {
        description: data.description,
        production_steps: data.production_steps,
        updated_at: new Date(),
        users_updated: {
          connect: { username: String(data.users_updated?.connect?.username) }
        }
      }
    });

    return compositions;
  }

  async updateCompositionsItems(
    id: number,
    data: Partial<Prisma.composition_itemsUpdateInput>
  ) {
    const composition_items = await this.prisma.composition_items.update({
      where: { id },
      data: {
        quantity: data.quantity,
        updated_at: new Date(),
        users_updated: {
          connect: { username: String(data.users_updated?.connect?.username) }
        }
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

  async findByProductMade(final_product: number): Promise<compositions | null> {
    return this.prisma.compositions.findFirst({
      where: { final_product: final_product }
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

  async delete(id: number): Promise<void> {
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
