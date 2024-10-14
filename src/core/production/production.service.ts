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
    const existingOrder = await this.matchProductionByData(
      createProductionDto.number
      // createProductionDto.name,
      // createProductionDto.price,
      // createProductionDto.stock,
      // createProductionDto.items
    );

    if (existingOrder.length > 0) {
      throw new Error(
        `Product already exists: ${JSON.stringify(existingOrder[0])}`
      );
    }

    const createdOrder =
      await this.productionRepository.create(createProductionDto);

    return this.formatProductionDate(createdOrder);
  }
  async matchProductionByData(number: number) {
    //, name:string, price:number, stock: number, items: CreateProductionItemsDto[]) {
    const matchedOrder = await this.productionRepository.matchProductionByData(
      number
      // name,
      // price,
      // stock,
      // items
    );

    return matchedOrder.map(production =>
      this.formatProductionDate(production)
    );
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

    const updatedOrder = await this.productionRepository.update(
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
