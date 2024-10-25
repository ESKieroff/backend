// import { Injectable } from '@nestjs/common';
// import { Prisma, compositions, compositions_items, Compositions_Moviment } from '@prisma/client';
// import { PrismaService } from 'src/database/prisma/prisma.service';
// import { ProductLot } from './dto/response.compositions.dto';
// @Injectable()
// export class CompositionsRepository {
//   constructor(private prisma: PrismaService) {}

//   async createCompositions(data: Prisma.compositionsCreateInput) {
//     return await this.prisma.compositions.create({ data });
//   }

//   async createCompositionsItems(
//     data: Partial<Prisma.compositions_itemsUncheckedCreateInput>
//   ) {
//     return await this.prisma.compositions_items.create({
//       data: {
//         sequence: data.sequence,
//         quantity: data.quantity,
//         unit_price: data.unit_price,
//         total_price: data.total_price,
//         lote: data.lote,
//         expiration: data.expiration,
//         products: { connect: { id: data.product_id } },
//         compositions: { connect: { id: data.compositions_id } },
//         compositions_location: data.compositions_location_id
//           ? { connect: { id: data.compositions_location_id } }
//           : undefined,
//         ...((data.supplier && {
//           suppliers: { connect: { id: data.supplier } }
//         }) ||
//           {}),
//         ...((data.costumer && {
//           costumers: { connect: { id: data.costumer } }
//         }) ||
//           {})
//       }
//     });
//   }

//   async updateCompositions(id: number, data: Prisma.compositionsUpdateInput): Promise<compositions> {
//     const compositions = await this.prisma.compositions.update({
//       where: { id },
//       data
//     });

//     return compositions;
//   }

//   async updateCompositionsItems(
//     id: number,
//     data: Partial<Prisma.compositions_itemsUncheckedCreateInput>
//   ) {
//     const compositions_items = await this.prisma.compositions_items.update({
//       where: { id },
//       data: {
//         sequence: data.sequence,
//         quantity: data.quantity,
//         unit_price: data.unit_price,
//         total_price: data.total_price,
//         lote: data.lote,
//         expiration: data.expiration,
//         ...(data.compositions_location_id
//           ? { compositions_location: { connect: { id: data.compositions_location_id } } }
//           : {}),
//         ...(data.supplier
//           ? { suppliers: { connect: { id: data.supplier } } }
//           : {}),
//         ...(data.costumer
//           ? { costumers: { connect: { id: data.costumer } } }
//           : {})
//       }
//     });

//     return compositions_items;
//   }

//   async getLastSequence(compositionsId: number): Promise<number> {
//     const lastItem = await this.prisma.compositions_items.findFirst({
//       where: { compositions_id: compositionsId },
//       orderBy: { sequence: 'desc' }
//     });
//     return lastItem ? lastItem.sequence : 0;
//   }

//   async findByDocumentNumber(document_number: string): Promise<compositions | null> {
//     return this.prisma.compositions.findUnique({
//       where: { document_number }
//     });
//   }

//   async getCompositionsItems(compositionsId: number): Promise<compositions_items[]> {
//     return await this.prisma.compositions_items.findMany({
//       where: { compositions_id: compositionsId },
//       orderBy: { sequence: 'asc' }
//     });
//   }

//   async checkCompositions(product_id: number, lote: string): Promise<number> {
//     const inputs = await this.prisma.compositions_items.aggregate({
//       where: {
//         product_id: product_id,
//         lote: lote,
//         compositions: {
//           compositions_moviment: Compositions_Moviment.INPUT
//         }
//       },
//       _sum: {
//         quantity: true
//       }
//     });

//     const totalInput = inputs._sum.quantity || 0;

//     const outputs = await this.prisma.compositions_items.aggregate({
//       where: {
//         product_id: product_id,
//         lote: lote,
//         compositions: {
//           compositions_moviment: Compositions_Moviment.OUTPUT
//         }
//       },
//       _sum: {
//         quantity: true
//       }
//     });

//     const totalOutput = outputs._sum.quantity || 0;

//     const reserved = await this.prisma.compositions_items.aggregate({
//       where: {
//         product_id: product_id,
//         lote: lote,
//         compositions: {
//           compositions_moviment: Compositions_Moviment.RESERVED
//         }
//       },
//       _sum: {
//         quantity: true
//       }
//     });

//     const totalReserved = reserved._sum.quantity || 0;

//     const transit = await this.prisma.compositions_items.aggregate({
//       where: {
//         product_id: product_id,
//         lote: lote,
//         compositions: {
//           compositions_moviment: Compositions_Moviment.TRANSIT
//         }
//       },
//       _sum: {
//         quantity: true
//       }
//     });

//     const totalTransit = transit._sum.quantity || 0;
//     // total
//     const totalUndisponible = totalOutput + totalReserved + totalTransit;

//     const totalQuantity =
//       totalInput - totalUndisponible > 0 ? totalInput - totalUndisponible : 0;

//     return totalQuantity;
//   }

//   async findAllCompositionsItems(orderBy: string): Promise<compositions[]> {
//     const validOrderFields = [
//       'id',
//       'product_id',
//       'lote',
//       'quantity',
//       'compositions_id',
//       'sequence',
//       'created_at',
//       'updated_at'
//     ];

//     if (!validOrderFields.includes(orderBy)) {
//       throw new Error('Invalid order field');
//     }

//     const result = await this.prisma.compositions.findMany({
//       orderBy: { [orderBy]: 'asc' },
//       include: {
//         compositions_items: {
//           select: {
//             id: true,
//             product_id: true,
//             lote: true,
//             quantity: true,
//             compositions_id: true,
//             sequence: true,
//             created_at: true,
//             updated_at: true
//           },
//           orderBy: { sequence: 'asc' }
//         }
//       }
//     });
//     return result;
//   }

//   async findItemsByCompositionsId(compositions_id: number): Promise<compositions_items[]> {
//     return await this.prisma.compositions_items.findMany({
//       where: { compositions_id },
//       orderBy: { sequence: 'asc' }
//     });
//   }

//   async update(data: Prisma.compositionsCreateInput): Promise<compositions> {
//     const compositions = await this.prisma.compositions.create({
//       data
//     });

//     const compositionsResponse = {
//       ...compositions
//     };
//     return compositionsResponse;
//   }

//   async findAll(orderBy: string): Promise<compositions[]> {
//     const validOrderFields = [
//       'id',
//       'document_number',
//       'document_date',
//       'compositions_moviment',
//       'created_at',
//       'updated_at'
//     ];

//     if (!validOrderFields.includes(orderBy)) {
//       throw new Error('Invalid order field');
//     }

//     const result = await this.prisma.compositions.findMany({
//       where: {},
//       orderBy: { [orderBy]: 'asc' }
//     });

//     return result;
//   }

//   async findById(id: number): Promise<compositions | null> {
//     const compositions = this.prisma.compositions.findUnique({
//       where: { id },
//       include: {
//         compositions_items: {
//           select: {
//             id: true,
//             sequence: true,
//             products: {
//               select: {
//                 id: true,
//                 description: true,
//                 code: true,
//                 sku: true
//               }
//             },
//             lote: true,
//             expiration: true,
//             quantity: true,
//             unit_price: true,
//             total_price: true,
//             suppliers: {
//               select: {
//                 id: true,
//                 name: true
//               }
//             },
//             compositions_location: {
//               select: {
//                 id: true,
//                 description: true
//               }
//             },
//             created_at: true,
//             updated_at: true
//           },
//           orderBy: { sequence: 'asc' }
//         }
//       }
//     });

//     if (!compositions) {
//       throw new Error('Compositions not found');
//     }

//     return compositions;
//   }

//   async findManyByIds(ids: number[]): Promise<compositions[]> {
//     return this.prisma.compositions.findMany({
//       where: {
//         id: { in: ids }
//       }
//     });
//   }

//   async findAllWithLots(orderBy: string): Promise<compositions_items[]> {
//     const validOrderFields = ['product_id'];

//     if (!validOrderFields.includes(orderBy)) {
//       throw new Error('Invalid order field');
//     }

//     const result = await this.prisma.compositions_items.findMany({
//       include: {
//         compositions: true
//       },
//       orderBy: { [orderBy]: 'asc' }
//     });

//     return result;
//   }

//   async deleteCompositions(id: number): Promise<void> {
//     await this.prisma.compositions_items.deleteMany({
//       where: {
//         compositions_id: id
//       }
//     });

//     await this.prisma.compositions.delete({
//       where: {
//         id
//       }
//     });
//   }

//   async teste(orderBy: 'asc' | 'desc'): Promise<ProductLot[]> {
//     const lots = await this.prisma.compositions_items.findMany({
//       select: {
//         product_id: true,
//         lote: true,
//         expiration: true,
//         quantity: true
//       },
//       orderBy: {
//         product_id: orderBy
//       }
//     });

//     const productLotSummary: Record<number, ProductLot> = {};

//     for (const lot of lots) {
//       const productId = lot.product_id;
//       const lote = lot.lote || 'sem lote';
//       const expiration = lot.expiration || new Date('1900-01-01');

//       if (!productLotSummary[productId]) {
//         const description = await this.prisma.products.findUnique({
//           where: { id: productId },
//           select: { description: true }
//         });

//         productLotSummary[productId] = {
//           productId,
//           description: description?.description || '',
//           lots: []
//         };
//       }

//       productLotSummary[productId].lots.push({
//         lote: lote,
//         totalQuantity: 0,
//         expiration: expiration
//       });
//     }

//     return Object.values(productLotSummary);
//   }

//   async getAllProductLots(
//     orderBy: 'asc' | 'desc' = 'asc',
//     origin?: 'RAW_MATERIAL' | 'MADE'
//   ): Promise<ProductLot[]> {
//     const productFilter = origin ? { origin } : {};

//     const lots = await this.prisma.compositions_items.findMany({
//       distinct: ['product_id', 'lote'],
//       where: {
//         products: productFilter
//       },
//       select: {
//         product_id: true,
//         lote: true,
//         expiration: true,
//         quantity: true
//       },
//       orderBy: { product_id: orderBy }
//     });

//     const productLotSummary: Record<number, ProductLot> = {};

//     for (const lot of lots) {
//       const productId = lot.product_id;
//       const lote = lot.lote;

//       if (typeof productId !== 'number') {
//         console.error(`Product ID ${productId} tem um formato inválido!`);
//       }
//       if (!productLotSummary[productId]) {
//         const description = await this.prisma.products.findUnique({
//           where: { id: productId },
//           select: { description: true }
//         });

//         productLotSummary[productId] = {
//           productId,
//           description: description?.description || '',
//           lots: []
//         };
//       }
//       const availableCompositions = await this.checkCompositions(productId, lote);

//       productLotSummary[productId].lots.push({
//         lote: lote,
//         totalQuantity: availableCompositions,
//         expiration: lot.expiration
//       });
//     }

//     return Object.values(productLotSummary);
//   }
// }
