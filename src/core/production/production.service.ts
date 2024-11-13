import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionDto } from './dto/create.production.dto';
import { UpdateProductionDto } from './dto/update.production.dto';
import { ProductionRepository } from './production.repository';
import { production_orders, composition_items } from '@prisma/client';
import { format } from 'date-fns';
import { SettingsService } from 'src/settings/settings.service';
import { SessionService } from '../common/sessionService';
import { Production_Status } from '../common/enums';
import { formatDate } from '../common/utils';

@Injectable()
export class ProductionService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly productionRepository: ProductionRepository,
    private readonly settingsService: SettingsService
  ) {}

  async create(createProductionDto: CreateProductionDto) {
    const firstProductId = createProductionDto.final_product_id;

    const descriptionProduct = firstProductId
      ? await this.productionRepository.findProductDescriptionById(
          firstProductId
        )
      : 'Produto não encontrado';

    const currentUser = this.sessionService.getCurrentUser();
    const numberString = await this.settingsService.get('lastOrderNumber');
    const number = Number(numberString) + 1;
    const description = `Ordem ${descriptionProduct} - ${number}`;
    const status = Production_Status.CREATED;

    const composition =
      await this.productionRepository.findCompositionById(firstProductId);
    if (!composition) {
      throw new NotFoundException(
        `Composition with ID ${firstProductId} not found`
      );
    }

    const compositionItems =
      await this.productionRepository.findCompositionItemsById(composition.id);

    const calculatedItems = await this.validateCompositionWithDto(
      compositionItems,
      createProductionDto
    );

    const production = await this.productionRepository.createOrder({
      number: number,
      description: description,
      production_date: new Date(createProductionDto.production_date),
      Production_Status: status,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: currentUser,
      updated_by: currentUser,
      final_product_id: firstProductId,
      production_quantity_estimated: 0,
      production_quantity_real: 0,
      production_quantity_loss: 0
    });

    let sequence = 1;
    for (const item of calculatedItems) {
      await this.productionRepository.createOrderItem({
        production_order_id: production.id,
        sequence,
        raw_product_id: item.raw_product_id,
        raw_product_initial_quantity: item.raw_product_initial_quantity,
        raw_product_used_quantity: item.raw_product_used_quantity,
        used_batchs: JSON.stringify(item.used_batchs),
        created_at: new Date(),
        updated_at: new Date()
      });

      sequence++;
      this.settingsService.incrementOrderNumber();
    }
    const allItems = await this.productionRepository.getOrderItems(
      production.id
    );

    const formattedItems = allItems.map(item => ({
      ...item,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at)
    }));

    return {
      production: {
        id: production.id,
        description: production.description,
        production_date: formatDate(production.production_date),
        created_at: formatDate(production.created_at),
        updated_at: formatDate(production.updated_at),
        Production_Status: production.Production_Status,
        items: formattedItems.sort((a, b) => a.sequence - b.sequence)
      }
    };
  }

  async findAll(orderBy: string): Promise<
    (Omit<
      production_orders,
      'created_at' | 'updated_at' | 'production_date'
    > & {
      created_at: string;
      updated_at: string;
      production_date: string;
    })[]
  > {
    const findedProduction =
      await this.productionRepository.findAllProductionItems(orderBy);
    return findedProduction.map(production =>
      this.formatProductionDate(production)
    );
  }

  async findOne(id: number): Promise<
    Omit<production_orders, 'created_at' | 'updated_at' | 'production_date'> & {
      created_at: string;
      updated_at: string;
      production_date: string;
    }
  > {
    const order = await this.productionRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    return this.formatProductionDate(order);
  }

  async update(id: number, updateProductionDto: UpdateProductionDto) {
    const currentUser = this.sessionService.getCurrentUser();

    const existingOrder = await this.productionRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    const updatedOrder = await this.productionRepository.updateOrder(id, {
      production_date: updateProductionDto.production_date
        ? new Date(updateProductionDto.production_date)
        : undefined,
      Production_Status: updateProductionDto.Production_Status ?? undefined,
      updated_at: new Date(),
      updated_by: currentUser
    });

    const existingItems = await this.productionRepository.getOrderItems(
      updatedOrder.id
    );

    let sequence = (await this.productionRepository.getLastSequence(id)) + 1;

    for (const item of updateProductionDto.production_items) {
      const existingItem = existingItems.find(i => i.id === item.id);

      if (existingItem) {
        const updateItem = {
          id: existingItem.id,
          production_order: { connect: { id: Number(updatedOrder.id) } },
          final_product_made: {
            connect: { id: Number(existingItem.raw_product_id) }
          },
          raw_product_used_quantity:
            item.raw_product_used_quantity ?? undefined,
          used_batchs: JSON.stringify(item.used_batchs),
          updated_at: new Date(),
          updated_by: currentUser
        };

        await this.productionRepository.updateOrderItem(
          updateItem.id,
          updateItem
        );
      } else {
        for (const item of updateProductionDto.production_items) {
          if (!existingItems.find(i => i.raw_product_id === item.id)) {
            await this.productionRepository.createOrderItem({
              production_order_id: id,
              sequence: sequence,
              raw_product_id: item.id!,
              raw_product_initial_quantity: item.raw_product_initial_quantity!,
              raw_product_used_quantity: item.raw_product_used_quantity!,
              used_batchs: JSON.stringify(item.used_batchs)!,
              created_at: new Date(),
              updated_at: new Date(),
              created_by: currentUser!,
              updated_by: currentUser!
            });
            sequence++;
          }
        }
      }
    }
    const allItems = await this.productionRepository.getOrderItems(
      updatedOrder.id
    );

    const formattedItems = allItems.map(item => ({
      ...item,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at)
    }));

    return {
      production: {
        id,
        updated_at: formatDate(updatedOrder.updated_at),
        updated_by: updateProductionDto.updated_by,
        items: formattedItems.sort((a, b) => a.sequence - b.sequence)
      }
    };
  }

  async remove(id: number) {
    await this.isValid(id);
    await this.productionRepository.delete(id);
  }

  private formatProductionDate(production: production_orders): Omit<
    production_orders,
    'created_at' | 'updated_at' | 'production_date'
  > & {
    created_at: string;
    updated_at: string;
    production_date: string;
  } {
    return {
      ...production,
      created_at: format(
        new Date(production.created_at),
        'dd/MM/yyyy HH:mm:ss'
      ),
      updated_at: format(
        new Date(production.updated_at),
        'dd/MM/yyyy HH:mm:ss'
      ),
      production_date: format(
        new Date(production.production_date),
        'dd/MM/yyyy HH:mm:ss'
      )
    };
  }

  async isValid(id: number) {
    const order = await this.productionRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return order;
  }

  async validateCompositionWithDto(
    compositionItems: composition_items[],
    createProductionDto: CreateProductionDto
  ) {
    const requiredQuantities = new Map<number, number>();
    for (const item of compositionItems) {
      const totalQuantity =
        item.quantity * createProductionDto.production_quantity_estimated;
      requiredQuantities.set(item.raw_product, totalQuantity);
    }

    const calculatedItems = [];
    for (const productionItem of createProductionDto.production_items) {
      const requiredQuantity = requiredQuantities.get(
        productionItem.raw_product_id
      );
      if (requiredQuantity === undefined) {
        throw new Error(
          `Produto ${productionItem.raw_product_id} não está presente na composição.`
        );
      }

      const totalBatchs =
        await this.validateAndSumBatchQuantities(productionItem);

      const totalBatchQuantity =
        totalBatchs * createProductionDto.production_quantity_estimated;

      const totalEstimatedQuantity =
        totalBatchs * createProductionDto.production_quantity_estimated;

      // console.log('totalBatchs', totalBatchs);
      // console.log('totalBatchQuantity', totalBatchQuantity);
      // console.log('totalEstimatedQuantity', totalEstimatedQuantity);

      if (totalBatchQuantity !== totalEstimatedQuantity) {
        throw new Error(
          `A quantidade total de lotes usados (${totalBatchQuantity}) não corresponde ao esperado (${createProductionDto.production_quantity_estimated}) para o produto ${totalEstimatedQuantity}.`
        );
      } else if (totalBatchQuantity < requiredQuantity) {
        throw new Error(
          `A quantidade total de lotes para o produto ${productionItem.raw_product_id} é insuficiente.`
        );
      }

      calculatedItems.push({
        raw_product_id: productionItem.raw_product_id,
        raw_product_initial_quantity: requiredQuantity,
        raw_product_used_quantity: totalBatchQuantity,
        used_batchs: productionItem.used_batchs
      });
    }
    return calculatedItems;
  }

  async validateAndSumBatchQuantities(productionItem) {
    let totalQuantity = 0;
    for (const batch of productionItem.used_batchs) {
      const stockItem = await this.productionRepository.findStockItemById(
        batch.stock_item_id
      );
      if (!stockItem) {
        throw new NotFoundException(
          `Stock item ${batch.stock_item_id} not found.`
        );
      }
      totalQuantity += batch.quantity;
    }
    return totalQuantity;
  }
}
