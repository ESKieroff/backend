import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { products } from '@prisma/client';
import { format } from 'date-fns';

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
    const createdProduct =
      await this.productsRepository.create(createProductDto);

    return this.formatProductDate(createdProduct);
  }
  // busca todos - implementar filtro
  async findAll(orderBy: string): Promise<
    (Omit<products, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedProducts = await this.productsRepository.findAll(orderBy);
    return findedProducts.map(product => this.formatProductDate(product));
  }

  async findById(id: number) {
    const product = await this.isValid(id);
    return this.formatProductDate(product);
  }

  private formatProductDate(product: products): Omit<
    products,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...product,
      created_at: format(new Date(product.created_at), 'dd/MM/yyyy HH:mm:ss'),
      updated_at: format(new Date(product.updated_at), 'dd/MM/yyyy HH:mm:ss')
    };
  }

  // verificar se produto está ativo antes de atualizar
  async isValid(id: number) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    } else if (!product.active) {
      throw new BadRequestException(`Product with ID ${id} is not active`);
    }
    return product;
  }

  // reativar produto
  async reactivateProduct(id: number) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.active) {
      throw new BadRequestException(`Product with ID ${id} is already active`);
    }

    // Reativa o produto

    const reactivatedProduct = await this.productsRepository.update(id, {
      active: true,
      updated_at: new Date()
    });

    // Formata e retorna o produto reativado
    return this.formatProductDate(reactivatedProduct);
  }

  // verifica se os dados informados correspondem a um produto do banco
  async matchProductByData(code: string, description: string, sku: string) {
    const matchedProduct = await this.productsRepository.matchProductByData(
      code,
      description,
      sku
    );

    return matchedProduct.map(product => this.formatProductDate(product));
  }
  // atualiza produto
  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verificar se o produto existe e está ativo antes de atualizar
    const product = await this.isValid(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    // Atualizar o produto e garantir que ele continue ativo
    const updatedProductDto = {
      ...updateProductDto,
      updated_at: new Date(), // Atualiza a data atual
      active: product.active // Mantém o status de ativo
    };

    const updatedPorduct = await this.productsRepository.update(
      id,
      updatedProductDto
    );
    // formata retorno da data
    return this.formatProductDate(updatedPorduct);
  }
  // remove produto
  remove(id: number) {
    return this.productsRepository.delete(id);
  }

  async bulkRemove(ids: number[]) {
    // Verifica todos os produtos de uma vez
    const existingProducts = await this.productsRepository.findManyByIds(ids);

    const errors = [];
    const validIds = [];

    // Verifica se todos os produtos existem e estão ativos
    for (const id of ids) {
      const product = existingProducts.find(p => p.id === id);

      if (!product) {
        errors.push(`Product with ID ${id} not found`);
        continue;
      }

      if (!product.active) {
        errors.push(`Product with ID ${id} is not active`);
        continue;
      }

      // Se o produto existe e está ativo, adiciona na lista de IDs válidos para remoção
      validIds.push(id);
    }

    // Se houver IDs válidos, realiza a remoção em massa
    if (validIds.length > 0) {
      await this.productsRepository.bulkUpdateStatus(validIds, {
        active: false
      });
    }

    return { removedIds: validIds, errors };
  }
}
