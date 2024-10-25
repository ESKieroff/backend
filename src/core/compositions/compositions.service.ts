// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException
// } from '@nestjs/common';
// import { CreateCompositionsDto, CreateCompositionsItemsDto } from './dto/create.compositions.dto';
// import { UpdateCompositionsDto } from './dto/update.compositions.dto';
// import { CompositionsRepository } from './compositions.repository';
// import { SettingsService } from 'src/settings/settings.service';
// import { LoteService } from '../common/lote.utils';
// import { format } from 'date-fns';
// import { compositions } from '@prisma/client';
// import { Compositions_Moviment } from '../common/enums';

// @Injectable()
// export class CompositionsService {
//   constructor(
//     private readonly compositionsRepository: CompositionsRepository,
//     private readonly settingsService: SettingsService,
//     private readonly loteService: LoteService
//   ) {}

//   compositionsMovimentsToCheck = new Set([
//     Compositions_Moviment.OUTPUT,
//     Compositions_Moviment.RESERVED,
//     Compositions_Moviment.ADJUST
//   ]);

//   async create(createCompositionsDto: CreateCompositionsDto) {
//     const errorMessages = [];
//     if (!Array.isArray(createCompositionsDto.compositions_items)) {
//       throw new BadRequestException('Items must be an array');
//     }

//     const existingCompositions = await this.compositionsRepository.findByDocumentNumber(
//       createCompositionsDto.document_number
//     );
//     if (existingCompositions) {
//       throw new BadRequestException(
//         `Document number ${createCompositionsDto.document_number} already exists`
//       );
//     }

//     if (this.compositionsMovimentsToCheck.has(createCompositionsDto.compositions_moviment)) {
//       const enableNegativeCompositions = await this.settingsService.get(
//         'enableNegativeCompositions'
//       );

//       if (enableNegativeCompositions == 'false') {
//         await this.validateCompositions(createCompositionsDto.compositions_items, errorMessages);
//       }
//     }

//     if (errorMessages.length > 0) {
//       return {
//         success: false,
//         errors: errorMessages,
//         message:
//           'Não foi possível processar todos os itens devido a saldos insuficientes.'
//       };
//     }

//     let compositionsDocument;
//     const createdItems = [];
//     try {
//       compositionsDocument = await this.compositionsRepository.createCompositions({
//         document_number: createCompositionsDto.document_number,
//         document_date: new Date(createCompositionsDto.document_date),
//         compositions_moviment: createCompositionsDto.compositions_moviment,
//         created_at: new Date(),
//         updated_at: new Date()
//       });

//       let sequencia = 1;

//       const compositions_location_default_str = await this.settingsService.get(
//         'defaultCompositionsLocation'
//       );
//       const compositions_location_default = parseInt(compositions_location_default_str, 10);

//       for (const item of createCompositionsDto.compositions_items) {
//         let lote;
//         let expiration;
//         if (!item.lote) {
//           [lote, expiration] = await this.getLote(compositionsDocument.compositions_moviment);
//         } else {
//           lote = item.lote;
//           expiration = new Date(item.expiration);
//         }

//         const createdItem = await this.compositionsRepository.createCompositionsItems({
//           compositions_id: compositionsDocument.id,
//           product_id: item.product_id,
//           sequence: sequencia,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//           total_price: item.unit_price * item.quantity,
//           lote: lote,
//           expiration: expiration.toISOString(),
//           observation: item.observation!,
//           supplier: item.supplier!,
//           costumer: item.costumer!,
//           compositions_location_id: item.compositions_location_id || compositions_location_default,
//           created_at: new Date(),
//           updated_at: new Date()
//         });
//         sequencia++;
//         createdItems.push(createdItem);
//       }

//       return {
//         compositionsDocument: {
//           id: compositionsDocument.id,
//           document_number: compositionsDocument.document_number,
//           document_date: compositionsDocument.document_date,
//           compositions_moviment: compositionsDocument.compositions_moviment,
//           created_at: compositionsDocument.created_at,
//           updated_at: compositionsDocument.updated_at,
//           items: createdItems
//         }
//       };
//     } catch (error) {
//       console.error('Error during item insertion:', (error as Error).message); // Log do erro capturado

//       if (compositionsDocument?.id) {
//         try {
//           await this.compositionsRepository.deleteCompositions(compositionsDocument.id);
//         } catch (deleteError) {
//           console.error(
//             'Error removing compositions document:',
//             (deleteError as Error).message
//           );
//         }
//       }

//       return {
//         success: false,
//         message:
//           'Erro ao criar itens do documento de estoque. Documento foi removido.'
//       };
//     }
//   }

//   async getLote(compositionsMoviment: Compositions_Moviment): Promise<[string, Date]> {
//     const loteGenerated = await this.loteService.generateLote(
//       compositionsMoviment === Compositions_Moviment.INPUT ? 'INPUT' : 'OUTPUT'
//     );
//     const [lote, expiration] = loteGenerated.split('-');
//     return [lote, new Date(expiration)];
//   }

//   private async validateCompositions(
//     items: CreateCompositionsItemsDto[],
//     errorMessages: string[]
//   ) {
//     for (const item of items) {
//       const saldoAtual = await this.checkCompositions(item.product_id, item.lote);
//       if (item.quantity > saldoAtual) {
//         errorMessages.push(
//           `Saldo insuficiente para o produto ${item.product_id} no lote ${item.lote}. \nQuantidade atual: ${saldoAtual}.`
//         );
//       }
//     }
//   }

//   async checkCompositions(product_id: number, lote: string): Promise<number> {
//     const estoque = await this.compositionsRepository.checkCompositions(product_id, lote);

//     return estoque || 0;
//   }

//   async findAll(orderBy: string): Promise<
//     (Omit<compositions, 'created_at' | 'updated_at'> & {
//       created_at: string;
//       updated_at: string;
//     })[]
//   > {
//     const findedCompositions = await this.compositionsRepository.findAllCompositionsItems(orderBy);
//     return findedCompositions.map(compositions => this.formatDate(compositions));
//   }

//   async findOne(id: number): Promise<
//     Omit<compositions, 'created_at' | 'updated_at'> & {
//       created_at: string;
//       updated_at: string;
//     }
//   > {
//     const order = await this.compositionsRepository.findById(id);

//     if (!order) {
//       throw new NotFoundException(`Compositions with ID ${id} not found`);
//     }

//     return this.formatDate(order);
//   }

//   async getAllProductLots(orderBy, origin) {
//     return this.compositionsRepository.getAllProductLots(orderBy, origin);
//   }

//   async update(id: number, updateCompositionsDto: UpdateCompositionsDto) {
//     await this.compositionsRepository.updateCompositions(id, {
//       updated_at: new Date(),
//       updated_by: updateCompositionsDto.updated_by ?? undefined
//     });

//     const existingItems = await this.compositionsRepository.getCompositionsItems(id);

//     const updatedItems = [];

//     for (const item of updateCompositionsDto.compositions_items) {
//       const existingItem = existingItems.find(i => i.id === item.id);

//       if (existingItem) {
//         const fieldsToUpdate: Partial<typeof item> = {};

//         if (existingItem.unit_price !== undefined)
//           fieldsToUpdate['unit_price'] = item.unit_price;
//         if (existingItem.quantity === null)
//           fieldsToUpdate['quantity'] = item.quantity;
//         if (existingItem.supplier !== undefined)
//           fieldsToUpdate['supplier'] = item.supplier;
//         if (existingItem.costumer !== undefined)
//           fieldsToUpdate['costumer'] = item.costumer;
//         if (existingItem.compositions_location_id !== undefined)
//           fieldsToUpdate['compositions_location_id'] = item.compositions_location_id;
//         if (existingItem.observation !== undefined)
//           fieldsToUpdate['observation'] = item.observation;
//         if (existingItem.total_price !== undefined)
//           fieldsToUpdate['total_price'] =
//             item.unit_price * existingItem.quantity;
//         if (existingItem.updated_at !== undefined)
//           fieldsToUpdate['updated_at'] = new Date();

//         if (Object.keys(fieldsToUpdate).length > 0) {
//           await this.compositionsRepository.updateCompositionsItems(item.id, {
//             ...fieldsToUpdate,
//             quantity: item.quantity,
//             unit_price: item.unit_price,
//             total_price: item.total_price,
//             observation: item.observation,
//             updated_at: new Date(),
//             updated_by: updateCompositionsDto.updated_by ?? undefined,
//             supplier: item.supplier,
//             costumer: item.costumer,
//             compositions_location_id: item.compositions_location_id
//           });
//           updatedItems.push({ ...existingItem, ...fieldsToUpdate });
//         }
//       }
//     }

//     return {
//       success: true,
//       message: 'Compositions updated successfully',
//       updatedItems
//     };
//   }

//   async remove(id: number) {
//     return this.compositionsRepository.deleteCompositions(id);
//   }

//   private formatDate(compositions: compositions): Omit<compositions, 'created_at' | 'updated_at'> & {
//     created_at: string;
//     updated_at: string;
//   } {
//     return {
//       ...compositions,
//       created_at: format(compositions.created_at, 'dd/MM/yyyy'),
//       updated_at: format(compositions.updated_at, 'dd/MM/yyyy')
//     };
//   }
// }
