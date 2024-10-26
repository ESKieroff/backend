import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { orchestrator, Prisma } from '@prisma/client';

@Injectable()
export class OrchestratorRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.orchestratorCreateInput): Promise<orchestrator> {
    const category = await this.prisma.orchestrator.create({
      data
    });

    const categoryResponse = {
      ...category
    };
    return categoryResponse;
  }

  async findAll(orderBy: string): Promise<orchestrator[]> {
    const validOrderFields = ['id', 'description'];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.orchestrator.findMany({
      where: { active: true },
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async findById(id: number): Promise<orchestrator | null> {
    const category = this.prisma.orchestrator.findUnique({
      where: { id }
    });

    const categoryWithoutSensitiveFields = {
      ...category,
      created_at: undefined,
      updated_at: undefined
    };

    return categoryWithoutSensitiveFields;
  }

  async findManyByIds(ids: number[]): Promise<orchestrator[]> {
    return this.prisma.orchestrator.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  async matchCategoryByData(description: string): Promise<orchestrator[]> {
    return this.prisma.orchestrator.findMany({
      where: {
        OR: [{ description: { equals: description } }]
      }
    });
  }

  async update(
    id: number,
    data: Prisma.orchestratorUpdateInput
  ): Promise<orchestrator> {
    const category = this.prisma.orchestrator.update({
      where: { id },
      data
    });

    const categoryResponse = {
      ...category,
      created_by: undefined,
      updated_by: undefined
    };

    return categoryResponse;
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingCategory = await this.findById(id);
    if (!existingCategory) {
      throw new Error('Category not found');
    }

    await this.prisma.orchestrator.update({
      where: { id },
      data: {
        active: false,
        updated_at: new Date()
      }
    });
  }

  async reactivate(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingCategory = await this.findById(id);
    if (!existingCategory) {
      throw new Error('Category not found');
    }

    await this.prisma.orchestrator.update({
      where: { id },
      data: {
        active: true,
        updated_at: new Date()
      }
    });
  }
}
