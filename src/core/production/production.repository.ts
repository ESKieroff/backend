import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, Production } from '@prisma/client';
@Injectable()
export class ProductionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.productionCreateInput): Promise<Production> {
    return this.prisma.Production.create({ data });
  }

  async findAll(orderBy: string): Promise<Production[]> {
    const validOrderFields = [
      'id',
      'description',
      'prodution_quantity_estimated',
      'production_quantity_real',
      'lote',
      'expiration',
      'Production_Status'
    ];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    return this.prisma.Production.findMany({
      orderBy: { [orderBy]: 'asc' }
    });
  }

  async findById(id: number): Promise<Production | null> {
    return this.prisma.Production.findUnique({
      where: { id }
    });
  }

  async update(
    id: number,
    data: Prisma.productionUpdateInput
  ): Promise<Production> {
    return this.prisma.Production.update({
      where: { id },
      data
    });
  }

  async updateStatus(
    id: number,
    newStatus: Production_Status
  ): Promise<Production> {
    const currentProduction = await this.findById(id);

    if (!currentProduction) {
      throw new Error('Production order not found');
    }

    if (!this.canChangeStatus(currentProduction.Production_Status, newStatus)) {
      throw new Error('Invalid status transition');
    }

    return this.prisma.Production.update({
      where: { id },
      data: { Production_Status: newStatus, updated_at: new Date() }
    });
  }

  private canChangeStatus(
    currentStatus: Production_Status,
    newStatus: Production_Status
  ): boolean {
    const validTransitions = {
      [Production_Status.CREATED]: [Production_Status.SCHEDULED],
      [Production_Status.SCHEDULED]: [
        Production_Status.OPEN,
        Production_Status.CANCELED
      ],
      [Production_Status.OPEN]: [
        Production_Status.IN_PROGRESS,
        Production_Status.STOPPED
      ],
      [Production_Status.IN_PROGRESS]: [
        Production_Status.FINISHED,
        Production_Status.STOPPED
      ],
      [Production_Status.STOPPED]: [
        Production_Status.IN_PROGRESS,
        Production_Status.CANCELED
      ],
      [Production_Status.FINISHED]: [],
      [Production_Status.CANCELED]: []
    };

    return validTransitions[currentStatus].includes(newStatus);
  }

  async delete(id: number): Promise<void> {
    await this.updateStatus(id, Production_Status.CANCELED);
  }
}
