import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { groups, Prisma } from '@prisma/client';

@Injectable()
export class GroupsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.groupsCreateInput): Promise<groups> {
    return this.prisma.groups.create({ data });
  }

  async findAll(): Promise<groups[]> {
    return this.prisma.groups.findMany({
      where: { active: true }
    });
  }

  async findOne(id: number): Promise<groups | null> {
    return this.prisma.groups.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.groupsUpdateInput): Promise<groups> {
    return this.prisma.groups.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      throw new Error('Group not found');
    }

    await this.prisma.groups.update({
      where: { id },
      data: { active: false }
    });
  }
}
