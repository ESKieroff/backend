import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  BadRequestException,
  Delete
} from '@nestjs/common';
import { CompositionsService } from './compositions.service';
import { CreateCompositionsDto } from './dto/create.compositions.dto';
import { UpdateCompositionsDto } from './dto/update.compositions.dto';
import { ApiQuery } from '@nestjs/swagger';
import {
  CreateCompositionsSchema,
  UpdateCompositionsSchema
} from './dto/compositions.schema';

@Controller('compositions')
export class CompositionsController {
  constructor(private readonly compositionsService: CompositionsService) {}

  @Post()
  create(@Body() createCompositionsDto: CreateCompositionsDto) {
    const validationResult = CreateCompositionsSchema.safeParse(
      createCompositionsDto
    );

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      throw new BadRequestException({
        message: 'Validation errors',
        errors
      });
    }

    return this.compositionsService.create(createCompositionsDto);
  }

  @Get()
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description:
      'Field to order by. Valid fields: id, product_id, created_at, updated_at',
    enum: ['id', 'product_id', 'created_at', 'updated_at']
  })
  async findAll(@Query('orderBy') orderBy: string = 'id') {
    const validOrderFields = ['id', 'product_id', 'created_at', 'updated_at'];

    if (!validOrderFields.includes(orderBy)) {
      throw new BadRequestException(`Invalid order field: ${orderBy}`);
    }

    const compositions = await this.compositionsService.findAll(orderBy);
    return compositions;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.compositionsService.findOne(idNumber);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompositionsDto: UpdateCompositionsDto
  ) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const validationResult = UpdateCompositionsSchema.safeParse(
      UpdateCompositionsDto
    );

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      throw new BadRequestException(errors);
    }
    return this.compositionsService.update(idNumber, updateCompositionsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    await this.compositionsService.delete(idNumber);
    return {
      message: `Compositions ID ${idNumber} permanently removed successfully`
    };
  }
}
