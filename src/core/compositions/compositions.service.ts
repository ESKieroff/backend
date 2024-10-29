import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateCompositionsDto } from './dto/create.compositions.dto';
import { UpdateCompositionsDto } from './dto/update.compositions.dto';
import { CompositionsRepository } from './compositions.repository';
import { format } from 'date-fns';
import { compositions } from '@prisma/client';

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
    console.log('req ', createCompositionsDto);

    console.log(
      'Tipo de composition_items:',
      typeof createCompositionsDto.composition_items
    );
    console.log(
      'Conteúdo de composition_items:',
      createCompositionsDto.composition_items
    );
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
    console.log('user ', this.getCurrentUser());
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
            connect: { username: this.getCurrentUser() }
          },
          users_updated: {
            connect: { username: this.getCurrentUser() }
          }
        });
      console.log('documento ', compositionsDocument);
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
              connect: { username: this.getCurrentUser() }
            },
            users_updated: {
              connect: { username: this.getCurrentUser() }
            }
          });
        sequencia++;
        console.log('item criado ', createdItem);
        createdItems.push(createdItem);
      }

      return {
        compositionsDocument: {
          id: compositionsDocument.id,
          product_id: compositionsDocument.product_id,
          description: compositionsDocument.description,
          created_at: compositionsDocument.created_at,
          updated_at: compositionsDocument.updated_at,
          production_steps: compositionsDocument.production_steps,
          items: createdItems
        }
      };
    } catch (error) {
      console.log('compositions ', compositionsDocument);
      console.log('items ', createdItems);
      console.error('Error during item insertion:', (error as Error).message); // Log do erro capturado

      if (compositionsDocument?.id) {
        try {
          await this.compositionsRepository.deleteCompositions(
            compositionsDocument.id
          );
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

  async findAll(orderBy: string): Promise<
    (Omit<compositions, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedCompositions =
      await this.compositionsRepository.findAllCompositionsItems(orderBy);
    return findedCompositions.map(compositions =>
      this.formatDate(compositions)
    );
  }

  async findOne(id: number): Promise<
    Omit<compositions, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    }
  > {
    const order = await this.compositionsRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Compositions with ID ${id} not found`);
    }

    return this.formatDate(order);
  }

  async update(id: number, updateCompositionsDto: UpdateCompositionsDto) {
    await this.compositionsRepository.updateCompositions(id, {
      updated_at: new Date()
    });

    const existingItems =
      await this.compositionsRepository.getCompositionsItems(id);

    const updatedItems = [];

    for (const item of updateCompositionsDto.compositions_items) {
      const existingItem = existingItems.find(i => i.id === item.id);

      if (existingItem) {
        const fieldsToUpdate: Partial<typeof item> = {};

        if (existingItem.quantity === null)
          fieldsToUpdate['quantity'] = item.quantity;
        if (existingItem.updated_at !== undefined)
          fieldsToUpdate['updated_at'] = new Date();
        if (existingItem.updated_by !== undefined)
          fieldsToUpdate['updated_by'] = this.getCurrentUser();

        if (Object.keys(fieldsToUpdate).length > 0) {
          await this.compositionsRepository.updateCompositionsItems(item.id, {
            ...fieldsToUpdate,
            quantity: item.quantity,
            updated_at: new Date(),
            updated_by: updateCompositionsDto.updated_by ?? undefined
          });
          updatedItems.push({ ...existingItem, ...fieldsToUpdate });
        }
      }
    }

    return {
      success: true,
      message: 'Compositions updated successfully',
      updatedItems
    };
  }

  async delete(id: number) {
    return this.compositionsRepository.deleteCompositions(id);
  }

  private formatDate(compositions: compositions): Omit<
    compositions,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...compositions,
      created_at: format(compositions.created_at, 'dd/MM/yyyy'),
      updated_at: format(compositions.updated_at, 'dd/MM/yyyy')
    };
  }
}
