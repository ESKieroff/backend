import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, users } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({
      data: {
        ...data
      }
    });
  }

  async findAll(): Promise<users[]> {
    return this.prisma.users.findMany({
      where: { active: true }
    });
  }

  async findOne(id: number): Promise<users | null> {
    const user = await this.prisma.users.findUnique({
      where: { id }
    });
    return user;
  }

  async findByUsername(username: string): Promise<users | null> {
    const user = await this.prisma.users.findUnique({
      where: { username }
    });
    return user;
  }

  async update(id: number, data: Partial<users>): Promise<users> {
    return this.prisma.users.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error('User not found');
    }
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await this.prisma.users.update({
      where: { id },
      data: { active: false }
    });
  }
}
