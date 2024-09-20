import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductSchema, UpdateProductSchema } from './dto/product.schema';
import { ZodError } from 'zod';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    // Valida o DTO completo
    const errors = [];
    // Validação do DTO com Zod
    const descriptionValidation =
      CreateProductSchema.shape.description.safeParse(
        createProductDto.description
      );
    if (!descriptionValidation.success) {
      errors.push({
        field: 'description',
        message: descriptionValidation.error.errors[0].message
      });
    }
    // Validação do DTO com Zod
    const codeValidation = CreateProductSchema.shape.code.safeParse(
      createProductDto.code
    );
    if (!codeValidation.success) {
      errors.push({
        field: 'code',
        message: codeValidation.error.errors[0].message
      });
    }

    const skuValidation = CreateProductSchema.shape.sku.safeParse(
      createProductDto.sku
    );
    if (!skuValidation.success) {
      errors.push({
        field: 'sku',
        message: skuValidation.error.errors[0].message
      });
    }

    const originValidation = CreateProductSchema.shape.origin.safeParse(
      createProductDto.origin
    );
    if (!originValidation.success) {
      errors.push({
        field: 'origin',
        message: originValidation.error.errors[0].message
      });
    }

    const unitMeasureValidation =
      CreateProductSchema.shape.unit_measure.safeParse(
        createProductDto.unit_measure
      );
    if (!unitMeasureValidation.success) {
      errors.push({
        field: 'unit_measure',
        message: unitMeasureValidation.error.errors[0].message
      });
    }

    const categoryIdValidation =
      CreateProductSchema.shape.category_id.safeParse(
        createProductDto.category_id
      );
    if (!categoryIdValidation.success) {
      errors.push({
        field: 'category_id',
        message: categoryIdValidation.error.errors[0].message
      });
    }

    const groupIdValidation = CreateProductSchema.shape.group_id.safeParse(
      createProductDto.group_id
    );
    if (!groupIdValidation.success) {
      errors.push({
        field: 'group_id',
        message: groupIdValidation.error.errors[0].message
      });
    }

    const supplierIdValidation =
      CreateProductSchema.shape.supplier_id.safeParse(
        createProductDto.supplier_id
      );
    if (!supplierIdValidation.success) {
      errors.push({
        field: 'supplier_id',
        message: supplierIdValidation.error.errors[0].message
      });
    }

    const nutritionalInfoValidation =
      CreateProductSchema.shape.nutritional_info.safeParse(
        createProductDto.nutritional_info
      );
    if (!nutritionalInfoValidation.success) {
      errors.push({
        field: 'nutritional_info',
        message: nutritionalInfoValidation.error.errors[0].message
      });
    }
    // se houver erros, lança uma exceção BadRequestException
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    try {
      return this.productsService.findAll();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.productsService.findOne(+id);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Query() queryParams: Record<string, string>
  ) {
    const existingProduct = await this.productsService.findOne(+id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Obtém os campos permitidos para atualização
    const allowedFields = Object.keys(UpdateProductSchema.shape);
    const fieldsToUpdate = Object.keys(queryParams);

    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('No fields provided to update');
    }
    // Cria um objeto vazio para armazenar os campos que serão atualizados
    const updateData: Partial<UpdateProductDto> = {};

    // Itera sobre os campos que estão sendo enviados para atualização
    for (const field of fieldsToUpdate) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
      // Obtém o valor do campo nos queryParams

      const value = queryParams[field];
      // Verifica se o campo é category_id, group_id ou supplier_id
      if (['category_id', 'group_id', 'supplier_id'].includes(field)) {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) {
          throw new BadRequestException(
            `Invalid number format for field: ${field}`
          );
        }
        updateData[field] = numericValue; // Atribui o valor como número
      } else {
        // Adiciona o campo ao updateData se o valor não for undefined
        if (value !== undefined) {
          updateData[field] = value;
        }
      }
    }

    // Valida o DTO completo, mas apenas com os campos que foram enviados para atualização
    const validation = UpdateProductSchema.safeParse(updateData);

    if (!validation.success) {
      // Captura e lança o erro com as mensagens corretas do Zod
      const zodError = validation.error as ZodError;
      const firstError = zodError.errors[0];
      throw new BadRequestException(
        `${firstError.path[0]} is invalid: ${firstError.message}`
      );
    }

    // Atualiza o produto com os campos permitidos e válidos
    const updatedProduct = await this.productsService.update(
      +id,
      updateData as UpdateProductDto
    );

    // Retorna o produto atualizado
    return updatedProduct;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Verificar se o produto existe no banco
    const existingProduct = this.productsService.findOne(+id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    // se existe tenta remover (remoção lógica)
    try {
      this.productsService.remove(+id);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
