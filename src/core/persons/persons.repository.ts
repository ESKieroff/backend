import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { persons, Prisma } from '@prisma/client';

@Injectable()
export class PersonsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.personsCreateInput): Promise<persons> {
    return this.prisma.persons.create({ data });
  }

  async findAll(): Promise<persons[]> {
    return this.prisma.persons.findMany({
      where: { active: true }
    });
  }

  async findOne(id: number): Promise<persons | null> {
    return this.prisma.persons.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.personsUpdateInput): Promise<persons> {
    return this.prisma.persons.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      throw new Error('Supplier not found');
    }

    await this.prisma.persons.update({
      where: { id },
      data: { active: false }
    });
  }
}
