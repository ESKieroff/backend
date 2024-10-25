import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { images, Prisma } from '@prisma/client';

@Injectable()
export class ImagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.imagesCreateInput): Promise<images> {
    const image = await this.prisma.images.create({
      data
    });

    const imageResponse = {
      ...image
    };
    return imageResponse;
  }

  async findAll(orderBy: string): Promise<images[]> {
    const validOrderFields = ['id', 'description'];

    if (!validOrderFields.includes(orderBy)) {
      throw new Error('Invalid order field');
    }

    const result = await this.prisma.images.findMany({
      where: { active: true },
      orderBy: { [orderBy]: 'asc' }
    });

    return result;
  }

  async findById(id: number): Promise<images | null> {
    const image = this.prisma.images.findUnique({
      where: { id }
    });

    const imageWithoutSensitiveFields = {
      ...image,
      created_at: undefined,
      updated_at: undefined
    };

    return imageWithoutSensitiveFields;
  }

  async findManyByIds(ids: number[]): Promise<images[]> {
    return this.prisma.images.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  async matchImageByData(description: string): Promise<images[]> {
    return this.prisma.images.findMany({
      where: {
        OR: [{ description: { equals: description } }]
      }
    });
  }

  async update(id: number, data: Prisma.imagesUpdateInput): Promise<images> {
    const image = this.prisma.images.update({
      where: { id },
      data
    });

    const imageResponse = {
      ...image,
      created_by: undefined,
      updated_by: undefined
    };

    return imageResponse;
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('ID not found');
    }
    const existingImage = await this.findById(id);
    if (!existingImage) {
      throw new Error('Image not found');
    }

    await this.prisma.images.update({
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
    const existingImage = await this.findById(id);
    if (!existingImage) {
      throw new Error('Image not found');
    }

    await this.prisma.images.update({
      where: { id },
      data: {
        active: true,
        updated_at: new Date()
      }
    });
  }
}
