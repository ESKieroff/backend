import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateCompositionsDto } from './dto/create.compositions.dto';
import { ResponseCompositionsDto } from './dto/response.compositions.dto';
import { UpdateCompositionsDto } from './dto/update.compositions.dto';
import { CompositionsRepository } from './compositions.repository';
import { format, isValid } from 'date-fns';

@Injectable()
export class CompositionsService {
  constructor(
    private readonly compositionsRepository: CompositionsRepository
  ) {}

  private getCurrentUser(): string {
    //TODO: Implementar busca do usuário logado
    return 'root';
  }

  async create(createCompositionsDto: CreateCompositionsDto) {
    const errorMessages = [];

    if (!Array.isArray(createCompositionsDto.composition_items)) {
      throw new BadRequestException('Items must be an array');
    }

    const existingCompositions =
      await this.compositionsRepository.findByProductMade(
        createCompositionsDto.final_product
      );
    if (existingCompositions) {
      throw new BadRequestException(
        `Composition to product ${createCompositionsDto.final_product} already exists`
      );
    }

    if (errorMessages.length > 0) {
      return {
        success: false,
        errors: errorMessages,
        message: 'Não foi possível processar todos os itens do documento.'
      };
    }
    const currentUser = this.getCurrentUser();
    let compositionsDocument;
    const createdItems = [];
    try {
      compositionsDocument =
        await this.compositionsRepository.createCompositions({
          product_made: {
            connect: { id: Number(createCompositionsDto.final_product) }
          },
          description: createCompositionsDto.description,
          production_steps: createCompositionsDto.production_steps,
          users_created: {
            connect: { username: currentUser }
          },
          users_updated: {
            connect: { username: currentUser }
          }
        });

      let sequencia = 1;

      for (const item of createCompositionsDto.composition_items) {
        const createdItem =
          await this.compositionsRepository.createCompositionsItems({
            compositions: { connect: { id: compositionsDocument.id } },
            sequence: sequencia,
            product_raw: { connect: { id: item.raw_product } },
            quantity: item.quantity,
            created_at: new Date(),
            updated_at: new Date(),
            users_created: {
              connect: { username: currentUser }
            },
            users_updated: {
              connect: { username: currentUser }
            }
          });
        sequencia++;
        createdItems.push(createdItem);
      }

      return {
        compositionsDocument: {
          id: compositionsDocument.id,
          product_id: compositionsDocument.product_id,
          description: compositionsDocument.description,
          created_at: compositionsDocument.created_at,
          production_steps: compositionsDocument.production_steps,
          items: createdItems
        }
      };
    } catch (error) {
      console.error('Error during item insertion:', (error as Error).message);

      if (compositionsDocument?.id) {
        try {
          await this.compositionsRepository.delete(compositionsDocument.id);
        } catch (deleteError) {
          console.error(
            'Error removing compositions document:',
            (deleteError as Error).message
          );
        }
      }

      return {
        success: false,
        message:
          'Erro ao criar itens do documento de estoque. Documento foi removido.'
      };
    }
  }

  // async findAll(orderBy: string): Promise<
  //   (Omit<compositions, 'created_at' | 'updated_at'> & {
  //     created_at: string;
  //     updated_at: string;
  //   })[]
  // > {
  //   const findedCompositions =
  //     await this.compositionsRepository.findAllCompositionsItems(orderBy);
  //   return findedCompositions.map(compositions =>
  //     this.formatDate(compositions)
  //   );
  // }
  async findAll(orderBy: string): Promise<ResponseCompositionsDto[]> {
    const compositions =
      await this.compositionsRepository.findAllCompositionsItems(orderBy);

    return compositions.map(composition => ({
      id: composition.id,
      final_product: composition.final_product,
      description: composition.description,
      production_steps: Array.isArray(composition.production_steps)
        ? composition.production_steps.map(step => String(step))
        : [],
      created_at: this.formatDate(composition.created_at),
      updated_at: this.formatDate(composition.updated_at),
      created_by: composition.created_by,
      updated_by: composition.updated_by,
      composition_items: (composition['composition_items'] || []).map(item => ({
        id: item.id,
        compositions_id: item.compositions_id,
        sequence: item.sequence,
        raw_product: item.raw_product,
        quantity: item.quantity,
        created_at: this.formatDate(item.created_at),
        updated_at: this.formatDate(item.updated_at),
        created_by: item.created_by,
        updated_by: item.updated_by
      }))
    }));
  }

  async findOne(id: number): Promise<ResponseCompositionsDto> {
    const composition = await this.compositionsRepository.findById(id);

    if (!composition) {
      throw new NotFoundException(`Composition with ID ${id} not found`);
    }

    return {
      id: composition.id,
      final_product: composition.final_product,
      description: composition.description,
      production_steps: Array.isArray(composition.production_steps)
        ? composition.production_steps.map(step => String(step))
        : [],
      created_at: this.formatDate(composition.created_at),
      updated_at: this.formatDate(composition.updated_at),
      created_by: composition.created_by,
      updated_by: composition.updated_by,
      composition_items: (composition['composition_items'] || []).map(item => ({
        id: item.id,
        compositions_id: item.compositions_id,
        sequence: item.sequence,
        raw_product: item.raw_product,
        quantity: item.quantity,
        created_at: this.formatDate(item.created_at),
        updated_at: this.formatDate(item.updated_at),
        created_by: item.created_by,
        updated_by: item.updated_by
      }))
    };
  }

  // async findOne(id: number) {
  //   const composition = await this.compositionsRepository.findById(id);

  //   if (!composition) {
  //     throw new NotFoundException(`Composition with ID ${id} not found`);
  //   }

  //   return composition;

  //   // return {
  //   //   id: composition.id,
  //   //   final_product: composition.final_product,
  //   //   description: composition.description,
  //   //   production_steps: Array.isArray(composition.production_steps)
  //   //     ? composition.production_steps.map(step => String(step))
  //   //     : [],
  //   //   created_at: format(composition.created_at, 'dd/MM/yyyy'),
  //   //   updated_at: format(composition.updated_at, 'dd/MM/yyyy'),
  //   //   created_by: composition.created_by,
  //   //   updated_by: composition.updated_by,
  //   //   composition_items: (composition['items'] || []).map(item => ({
  //   //     id: item.id,
  //   //     sequence: item.sequence,
  //   //     raw_product: item.raw_product,
  //   //     quantity: item.quantity,
  //   //     created_at: format(item.created_at, 'dd/MM/yyyy'),
  //   //     updated_at: item.updated_at
  //   //       ? format(item.updated_at, 'dd/MM/yyyy')
  //   //       : null,
  //   //     compositions_id: item.compositions_id,
  //   //     created_by: item.created_by,
  //   //     updated_by: item.updated_by
  //   //   }))
  //   // };
  // }

  async update(id: number, updateCompositionsDto: UpdateCompositionsDto) {
    const currentUser = this.getCurrentUser();

    const existingComposition = await this.compositionsRepository.findById(id);
    if (!existingComposition) {
      throw new Error(`Composition with ID ${id} not found`);
    }

    const updatedComposition =
      await this.compositionsRepository.updateCompositions(id, {
        description: updateCompositionsDto.description,
        production_steps: updateCompositionsDto.production_steps,
        updated_at: new Date(),
        users_updated: {
          connect: { username: currentUser }
        }
      });

    const existingItems =
      await this.compositionsRepository.getCompositionsItems(id);

    const updatedItems = [];

    for (const item of updateCompositionsDto.composition_items) {
      const existingItem = existingItems.find(i => i.id === item.id);

      if (existingItem) {
        const fieldsToUpdate: Partial<typeof item> = {};

        if (existingItem.quantity === null)
          fieldsToUpdate['quantity'] = item.quantity;
        if (existingItem.updated_at !== undefined)
          fieldsToUpdate['updated_at'] = new Date();
        if (existingItem.updated_by !== undefined)
          fieldsToUpdate['updated_by'] = currentUser;

        if (Object.keys(fieldsToUpdate).length > 0) {
          await this.compositionsRepository.updateCompositionsItems(item.id, {
            ...fieldsToUpdate,
            quantity: item.quantity,
            updated_at: new Date(),
            users_updated: {
              connect: { username: currentUser }
            }
          });
          updatedItems.push({ ...existingItem, ...fieldsToUpdate });
        }
      }
    }

    return {
      compositionsDocument: {
        id: updatedComposition.id,
        product_id: updatedComposition.final_product,
        description: updatedComposition.description,
        updated_at: format(updatedComposition.updated_at, 'dd/MM/yyyy'),
        production_steps: updatedComposition.production_steps,
        items: updatedItems
      }
    };
  }

  async delete(id: number) {
    return this.compositionsRepository.delete(id);
  }

  private formatDate(date: Date | null | undefined): string | null {
    if (date && isValid(date)) {
      return format(date, 'dd/MM/yyyy');
    }
    return null; // Retorna null ou uma string padrão, como 'Data Inválida'
  }
}

//   private formatDate(compositions: compositions): Omit<
//     compositions,
//     'created_at' | 'updated_at'
//   > & {
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
