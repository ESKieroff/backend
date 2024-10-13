// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/database/prisma/prisma.service';
// import { Production, Prisma } from '@prisma/client';
// import { Order } from './entities/order.entity';

// @Injectable()
// export class OrderRepository {
//   constructor(private prisma: PrismaService) {}

//   async create(data: Prisma.ProductionCreateInput): Promise<Production> {
//   const order = await this.prisma.production.create({
//         data
//       });
//     const orderResponse = {
//            ...order
//           };
//            return orderResponse;
//          }
// //Precisa da order no bd
//   async findAll(orderBy: string): Promise<Order[]> {
//   const validOrderFields = [
//     'id',
//     'description',
//     'number',
//     'product_quantity_estimated',
//     'product_quantity_real',
//     'lote'
//   ];

//   if (!validOrderFields.includes(orderBy)) {
//     throw new Error('Invalid order field');
//   }

//   const result = await this.prisma.production.findMany({
//     where: { active: true },
//     orderBy: { [orderBy]: 'asc' }
//   });

//   return result;
// }
// async findById(id: number): Promise< Order| null> {
//     const orders = this.prisma.production.findUnique({
//       where: { id }
//     });

//     const productWithoutSensitiveFields = {
//           ...orders,
//           active: undefined
//         };

//         return productWithoutSensitiveFields;
//       }
//     }

// // async findById(id: number): Promise<products | null> {
// //   const product = this.prisma.products.findUnique({
// //     where: { id }
// //   });

// //   const productWithoutSensitiveFields = {
// //     ...product,
// //     active: undefined
// //   };

// //   return productWithoutSensitiveFields;
// // }

// // async findManyByIds(ids: number[]): Promise<products[]> {
// //   return this.prisma.products.findMany({
// //     where: {
// //       id: { in: ids }
// //     }
// //   });
// // }

// // async bulkUpdateStatus(ids: number[], data: Partial<products>) {
// //   await this.prisma.products.updateMany({
// //     where: {
// //       id: { in: ids }
// //     },
// //     data
// //   });
// // }

// // async matchProductByData(
// //   code: string,
// //   description: string,
// //   sku: string
// // ): Promise<products[]> {
// //   return this.prisma.products.findMany({
// //     where: {
// //       OR: [
// //         { code: { equals: code } },
// //         { description: { equals: description } },
// //         { sku: { equals: sku } }
// //       ]
// //     }
// //   });
// // }

// // async update(
// //   id: number,
// //   data: Prisma.productsUpdateInput
// // ): Promise<products> {
// //   const product = this.prisma.products.update({ where: { id }, data });

// //   const productResponse = {
// //     ...product
// //   };
// //   return productResponse;
// // }

// // async delete(id: number): Promise<void> {
// //   if (!id) {
// //     throw new Error('ID not found');
// //   }
// //   const existingProduct = await this.findById(id);
// //   if (!existingProduct) {
// //     throw new Error('Product not found');
// //   }

// //   await this.prisma.products.update({
// //     where: { id },
// //     data: {
// //       active: false,
// //       updated_at: new Date()
// //     }
// //   });
// // }
