import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateStockDto, CreateStockItemsDto } from './dto/create.stock.dto';
import { UpdateStockDto } from './dto/update.stock.dto';
import { StockRepository } from './stock.repository';
import { Settings } from '../../config/settings';
import { format } from 'date-fns';
import { stock } from '@prisma/client';
import { Stock_Moviment } from '../common/enums';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  stockMovimentsToCheck = new Set([
    Stock_Moviment.OUTPUT,
    Stock_Moviment.RESERVED,
    Stock_Moviment.ADJUST
  ]);

  async create(createStockDto: CreateStockDto) {
    // Passo 1: Verifica se é operação de saída e o parametro do settings para validar saldo, se for o caso

    const errorMessages = [];
    if (!Array.isArray(createStockDto.stock_items)) {
      throw new BadRequestException('Items must be an array');
    }

    const existingStock = await this.stockRepository.findByDocumentNumber(
      createStockDto.document_number
    );
    if (existingStock) {
      throw new BadRequestException(
        `Document number ${createStockDto.document_number} already exists`
      );
    }
    // Verifica se stock_moviment é OUTPUT, RESERVED ou ADJUST (movimentos que podem diminuir o estoque)
    if (this.stockMovimentsToCheck.has(createStockDto.stock_moviment)) {
      // Checa se o ajuste de estoque negativo está desabilitado
      if (!Settings.enableNegativeStock) {
        // Valida o estoque disponível
        await this.validateStock(createStockDto.stock_items, errorMessages);
      }
    }

    if (errorMessages.length > 0) {
      return {
        success: false,
        errors: errorMessages,
        message:
          'Não foi possível processar todos os itens devido a saldos insuficientes.'
      };
    }
    let stockDocument;
    try {
      stockDocument = await this.stockRepository.createStock({
        document_number: createStockDto.document_number,
        document_date: new Date(createStockDto.document_date),
        stock_moviment: createStockDto.stock_moviment,
        created_at: new Date(),
        updated_at: new Date()
      });

      let sequencia = 1;
      const stock_location = 1;
      for (const item of createStockDto.stock_items) {
        console.log('item', item);

        await this.stockRepository.createStockItems({
          stock_id: stockDocument.id,
          product_id: item.product_id,
          sequence: sequencia,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.unit_price * item.quantity,
          lote: item.lote,
          expiration: item.expiration,
          stock_location_id: stock_location,
          supplier: item.supplier!,
          costumer: item.costumer!,
          observation: item.observation!,
          image_link: item.image_link!,
          created_at: new Date(),
          updated_at: new Date()
        });
        sequencia++;
      }

      return stockDocument;
    } catch (error) {
      console.error('Error during item insertion:', (error as Error).message); // Log do erro capturado

      // Tenta remover o documento se ele foi criado
      if (stockDocument?.id) {
        try {
          await this.stockRepository.deleteStock(stockDocument.id);
          console.log(
            `Stock document with ID ${stockDocument.id} removed due to error.`
          );
        } catch (deleteError) {
          console.error(
            'Error removing stock document:',
            (deleteError as Error).message
          );
        }
      }

      // Retorna uma mensagem amigável em vez de quebrar o servidor
      return {
        success: false,
        message:
          'Erro ao criar itens do documento de estoque. Documento foi removido.'
      };
    }
  }

  private async validateStock(
    items: CreateStockItemsDto[],
    errorMessages: string[]
  ) {
    for (const item of items) {
      const saldoAtual = await this.checkStock(item.product_id, item.lote);
      if (item.quantity > saldoAtual) {
        errorMessages.push(
          `Saldo insuficiente para o produto ${item.product_id} no lote ${item.lote}. \nQuantidade atual: ${saldoAtual}.`
        );
      }
    }
  }

  async checkStock(product_id: number, lote: string): Promise<number> {
    const estoque = await this.stockRepository.checkStock(product_id, lote);

    return estoque || 0;
  }

  async findAll(orderBy: string): Promise<
    (Omit<stock, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedStock = await this.stockRepository.findAllStockItems(orderBy);
    return findedStock.map(stock => this.formatDate(stock));
  }

  async findOne(id: number): Promise<
    Omit<stock, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    }
  > {
    const order = await this.stockRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    return this.formatDate(order);
  }

  // tomar cuidado porque esta usando a função uncheckedupdate
  async update(id: number, updateStockDto: UpdateStockDto) {
    // Atualiza os dados do estoque
    await this.stockRepository.updateStock(id, {
      updated_at: new Date(),
      updated_by: updateStockDto.updated_by ?? undefined
    });

    // Busca todos os itens existentes no documento
    const existingItems = await this.stockRepository.getStockItems(id);

    const updatedItems = [];

    // Itera sobre os itens enviados na requisição
    for (const item of updateStockDto.stock_items) {
      const existingItem = existingItems.find(i => i.id === item.id);

      if (existingItem) {
        // Prepara um objeto com os campos que precisam ser atualizados
        const fieldsToUpdate: Partial<typeof item> = {};
        console.log('existingItem', existingItem);
        // Só atualiza campos que estão `null` ou com valores padrão
        if (existingItem.unit_price !== undefined)
          fieldsToUpdate['unit_price'] = item.unit_price;
        if (existingItem.quantity === null)
          fieldsToUpdate['quantity'] = item.quantity;
        if (existingItem.supplier !== undefined)
          fieldsToUpdate['supplier'] = item.supplier;
        if (existingItem.costumer !== undefined)
          fieldsToUpdate['costumer'] = item.costumer;
        if (existingItem.stock_location_id !== undefined)
          fieldsToUpdate['stock_location_id'] = item.stock_location_id;
        if (existingItem.observation !== undefined)
          fieldsToUpdate['observation'] = item.observation;
        if (existingItem.total_price !== undefined)
          fieldsToUpdate['total_price'] =
            item.unit_price * existingItem.quantity;
        if (existingItem.image_link !== undefined)
          fieldsToUpdate['image_link'] = item.image_link;
        if (existingItem.updated_at !== undefined)
          fieldsToUpdate['updated_at'] = new Date();

        // Realiza a atualização se houver campos a serem atualizados
        if (Object.keys(fieldsToUpdate).length > 0) {
          await this.stockRepository.updateStockItems(item.id, {
            ...fieldsToUpdate,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.total_price,
            observation: item.observation,
            image_link: item.image_link,
            updated_at: new Date(),
            updated_by: updateStockDto.updated_by ?? undefined,
            supplier: item.supplier,
            costumer: item.costumer,
            stock_location_id: item.stock_location_id
          });
          updatedItems.push({ ...existingItem, ...fieldsToUpdate });
        } else {
          updatedItems.push(existingItem); // Se nenhum campo mudou, mantém o item original
        }
      }
    }

    // Ordena os itens atualizados pela sequência e retorna o estoque atualizado
    updatedItems.sort((a, b) => a.sequence - b.sequence);

    return {
      stock: {
        id,
        document_number: updateStockDto.document_number,
        document_date: new Date(),
        stock_moviment: updateStockDto.stock_moviment,
        is_balance: updateStockDto.is_balance,
        updated_at: new Date(),
        updated_by: updateStockDto.updated_by,
        items: updatedItems
      }
    };
  }

  async findAllWithLots(orderBy: string) {
    return this.stockRepository.findAllWithLots(orderBy);
  }

  async remove(id: number) {
    await this.isValid(id);
    return this.stockRepository.deleteStock(id);
  }

  private formatDate(stock: stock): Omit<stock, 'created_at' | 'updated_at'> & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...stock,
      created_at: format(new Date(stock.created_at), 'dd/MM/yyyy HH:mm:ss'),
      updated_at: format(new Date(stock.updated_at), 'dd/MM/yyyy HH:mm:ss')
    };
  }

  async isValid(id: number) {
    const stock = await this.stockRepository.findById(id);

    if (!stock) {
      throw new NotFoundException('Stock with ID ${id} not found');
    }
    return stock;
  }
}
