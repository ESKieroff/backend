import { Injectable } from '@nestjs/common';
import { StockLocationsRepository } from './stock-locations.repository';
import { CreateStockLocationDto } from './dto/create-stock-locations.dto';
import { stock_location } from '@prisma/client';
import { format } from 'date-fns';

@Injectable()
export class StockLocationsService {
  constructor(
    private readonly stockLocationRepository: StockLocationsRepository
  ) {}

  async create(createStockLocationDto: CreateStockLocationDto) {
    const existingStockLocation = await this.matchStockLocationByData(
      createStockLocationDto.description
    );

    if (existingStockLocation.length > 0) {
      throw new Error(
        `Stock location already exists: ${JSON.stringify(existingStockLocation[0])}`
      );
    }

    const createdStockLocation = await this.stockLocationRepository.create(
      createStockLocationDto
    );

    return this.formatStockLocationDate(createdStockLocation);
  }

  async findAll(orderBy: string): Promise<
    (Omit<stock_location, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedStockLocations =
      await this.stockLocationRepository.findAll(orderBy);
    return findedStockLocations.map(stockLocation =>
      this.formatStockLocationDate(stockLocation)
    );
  }

  async findById(id: number) {
    const stockLocation = await this.isValid(id);
    return this.formatStockLocationDate(stockLocation);
  }

  private formatStockLocationDate(stockLocation: stock_location): Omit<
    stock_location,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...stockLocation,
      created_at: format(
        new Date(stockLocation.created_at),
        'dd/MM/yyyy HH:mm:ss'
      ),
      updated_at: format(
        new Date(stockLocation.updated_at),
        'dd/MM/yyyy HH:mm:ss'
      )
    };
  }

  async isValid(id: number) {
    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new Error(`Stock location not found: ${id}`);
    }

    return stockLocation;
  }

  async reactivateStockLocation(id: number) {
    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new Error(`Stock location not found: ${id}`);
    }

    if (stockLocation.active) {
      throw new Error(`Stock location already active: ${id}`);
    }

    await this.stockLocationRepository.update(id, {
      active: true,
      updated_at: new Date()
    });

    return this.formatStockLocationDate(stockLocation);
  }

  async matchStockLocationByData(description: string) {
    const matchedStockLocation =
      await this.stockLocationRepository.matchstock_locationByData(description);

    return matchedStockLocation.map(stockLocation =>
      this.formatStockLocationDate(stockLocation)
    );
  }

  async update(id: number, data: Partial<stock_location>) {
    const stockLocation = await this.isValid(id);

    if (!stockLocation) {
      throw new Error(`Stock location not found: ${id}`);
    }

    const updatedStockLocation = await this.stockLocationRepository.update(
      id,
      data
    );

    return this.formatStockLocationDate(updatedStockLocation);
  }

  remove(id: number) {
    return this.stockLocationRepository.delete(id);
  }
}
