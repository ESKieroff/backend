import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  findAll() {
    return this.productsRepository.findAll();
  }

  findOne(id: number) {
    return this.productsRepository.findOne(id);
  }

  update(id: number, _updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, _updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
