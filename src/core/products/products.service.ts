import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { products } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  // cria produto novo
  async create(createProductDto: CreateProductDto) {
    // Verificar se o produto já existe na base de dados
    const existingProduct = await this.matchProductByData(
      createProductDto.code,
      createProductDto.description,
      createProductDto.sku
    );
    // se já existe, devolve o item encontrado
    if (existingProduct.length > 0) {
      throw new Error(
        `Product already exists: ${JSON.stringify(existingProduct[0])}`
      );
    }
    // se não existe, cria o novo produto
    return this.productsRepository.create(createProductDto);
  }
  // busca todos - implementar filtro
  async findAll(orderBy: string): Promise<products[]> {
    return this.productsRepository.findAll(orderBy);
  }

  findById(id: number) {
    return this.productsRepository.findById(id);
  }
  // verificar se produto está ativo antes de atualizar
  async isActived(id: number) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    if (!product.active) {
      throw new Error('Product is not active');
    }
    return product.active;
  }
  // reativar produto antes de atualizar
  async reactivateProduct(id: number) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    product.active = true;
    return this.productsRepository.update(id, product);
  }
  // verifica se os dados informados correspondem a um produto do banco
  matchProductByData(code: string, description: string, sku: string) {
    return this.productsRepository.matchProductByData(code, description, sku);
  }
  // atualiza produto
  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verificar se o produto está ativo
    const isActive = await this.isActived(id);

    if (!isActive) {
      throw new Error('Product is not active. Activate it before updating');
    }

    // Atualizar o produto e garantir que ele continue ativo
    const updatedProductDto = { ...updateProductDto, active: true };

    return this.productsRepository.update(id, updatedProductDto);
  }
  // remove produto
  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
