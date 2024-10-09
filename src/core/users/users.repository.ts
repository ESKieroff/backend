// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/database/prisma/prisma.service';
// import { users, Prisma } from '@prisma/client';

// @Injectable()
// export class UsersRepository {
//   constructor(private prisma: PrismaService) {}

//   async create(data: Prisma.usersCreateInput): Promise<users> {
//     const user = await this.prisma.users.create({
//       data
//     });

//     const userResponse = {
//       ...user
//     };
//     return userResponse;
//   }

//   async findAll(orderBy: string): Promise<users[]> {
//     const validOrderFields = [
//       'id',
//       'username',
//       'email',
//       'password',
//       'active',
//       'first_name',
//       'last_name'
//     ];

//     if (!validOrderFields.includes(orderBy)) {
//       throw new Error('Invalid order field');
//     }

//     const result = await this.prisma.users.findMany({
//       where: { active: true },
//       orderBy: { [orderBy]: 'asc' }
//     });

//     return result;
//   }

//   async findById(id: number): Promise<users | null> {
//     const user = this.prisma.users.findUnique({
//       where: { id }
//     });

//     if (!user) {
//       return null;
//     }

//     return user;
//   }

//   async findManyByIds(ids: number[]): Promise<users[]> {
//     return this.prisma.users.findMany({
//       where: {
//         id: { in: ids }
//       }
//     });
//   }

//   async matchProductByData(
//     code: string,
//     description: string,
//     sku: string
//   ): Promise<users[]> {
//     return this.prisma.users.findMany({
//       where: {
//         OR: [
//           { code: { equals: code } },
//           { description: { equals: description } },
//           { sku: { equals: sku } }
//         ]
//       }
//     });
//   }

//   async update(id: number, data: Prisma.usersUpdateInput): Promise<users> {
//     const user = this.prisma.users.update({ where: { id }, data });

//     const userResponse = {
//       ...user
//     };
//     return userResponse;
//   }

//   async delete(id: number): Promise<void> {
//     await this.prisma.users.update({
//       where: { id },
//       data: {
//         active: false,
//         updated_at: new Date()
//       }
//     });
//   }

//   async reactivate(id: number): Promise<void> {
//     if (!id) {
//       throw new Error('ID not found');
//     }
//     const existingProduct = await this.findById(id);
//     if (!existingProduct) {
//       throw new Error('Product not found');
//     }

//     await this.prisma.users.update({
//       where: { id },
//       data: {
//         active: true,
//         updated_at: new Date()
//       }
//     });
//   }
// }
