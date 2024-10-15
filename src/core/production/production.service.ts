import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
//import { CreateProductionItemsDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ProductionRepository } from './production.repository';
import { production_orders } from '@prisma/client';
import { format } from 'date-fns';

@Injectable()
export class ProductionService {
  constructor(private readonly productionRepository: ProductionRepository) {}

  async create(createProductionDto: CreateProductionDto) {
    // cria documento de produção e pega objeto para criar os itens
    const production = await this.productionRepository.createOrder({
      ...createProductionDto,
      created_at: new Date(),
      updated_at: new Date()
    });

    console.log('production', production);

    // insere cada item associado ao docto de produção gerado acima
    let sequence = 1;
    for (const item of createProductionDto.production_items) {
      await this.productionRepository.createOrderItem({
        production_order_id: production.id,
        sequence: sequence,
        final_product_id: item.final_product_id,
        prodution_quantity_estimated: item.prodution_quantity_estimated,
        production_quantity_real: item.production_quantity_real,
        production_quantity_loss:
          item.prodution_quantity_estimated - item.production_quantity_real,
        lote: item.lote,
        lote_expiration: item.lote_expiration,
        created_at: new Date(),
        updated_at: new Date()
      });
      console.log('item', item);
      sequence++;
    }
  }

  async findAll(orderBy: string): Promise<
    (Omit<production_orders, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedProduction =
      await this.productionRepository.findAllProductionItems(orderBy);
    return findedProduction.map(production =>
      this.formatProductionDate(production)
    );
  }

  async findOne(id: number): Promise<
    Omit<production_orders, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    }
  > {
    const order = await this.productionRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    return this.formatProductionDate(order);
  }

  async update(id: number, _updateProductionDto: UpdateProductionDto) {
    const order = await this.isValid(id);

    if (!order) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProductionDto = {
      ..._updateProductionDto,
      updated_at: new Date()
    };

    const updatedOrder = await this.productionRepository.updateOrder(
      id,
      updatedProductionDto
    );

    return this.formatProductionDate(updatedOrder);
  }

  async remove(id: number) {
    await this.isValid(id);
    await this.productionRepository.delete(id);
  }

  private formatProductionDate(production: production_orders): Omit<
    production_orders,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...production,
      created_at: format(
        new Date(production.created_at),
        'dd/MM/yyyy HH:mm:ss'
      ),
      updated_at: format(new Date(production.updated_at), 'dd/MM/yyyy HH:mm:ss')
    };
  }

  async isValid(id: number) {
    const order = await this.productionRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return order;
  }
}
