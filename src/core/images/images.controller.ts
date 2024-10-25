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
import { ImagesService } from './images.service';
import { CreateImagesDto } from './dto/create-images.dto';
import { UpdateImagesDto } from './dto/update-images.dto';
import { CreateImageSchema, UpdateImageSchema } from './dto/image.schema';
import { ZodError } from 'zod';
import { ResponseImagesDto } from './dto/response-images.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async create(
    @Body() createImagesDto: CreateImagesDto
  ): Promise<ResponseImagesDto> {
    const errors = [];

    const descriptionValidation = CreateImageSchema.shape.description.safeParse(
      createImagesDto.description
    );
    if (!descriptionValidation.success) {
      errors.push({
        field: 'description',
        message: descriptionValidation.error.errors[0].message
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const matchedImages = await this.imagesService.matchImageByData(
      createImagesDto.description
    );

    if ((await matchedImages).length > 0) {
      const existingImage = matchedImages[0];

      if (!existingImage.active) {
        throw new BadRequestException(
          `Image already exists but is not active. Activate and update it: ${JSON.stringify(
            existingImage
          )}`
        );
      }

      throw new BadRequestException(
        'Image already exists. Try update it instead'
      );
    }

    const createdImage = await this.imagesService.create(createImagesDto);
    return {
      id: createdImage.id,
      description: createdImage.description,
      active: createdImage.active,
      created_at: createdImage.created_at,
      updated_at: createdImage.updated_at
    };
  }

  @Get()
  async findAll(
    @Query('orderBy') orderBy: string = 'id'
  ): Promise<ResponseImagesDto[]> {
    const validOrderFields = ['id', 'description'];

    if (!validOrderFields.includes(orderBy)) {
      throw new BadRequestException(`Invalid order field: ${orderBy}`);
    }

    const images = await this.imagesService.findAll(orderBy);
    return images.map(image => ({
      id: image.id,
      description: image.description,
      active: image.active,
      created_at: image.created_at,
      updated_at: image.updated_at
    }));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseImagesDto> {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const image = await this.imagesService.findById(idNumber);

    const response: ResponseImagesDto = {
      id: image.id,
      description: image.description,
      active: image.active,
      created_at: image.created_at,
      updated_at: image.updated_at
    };

    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImagesDto: UpdateImagesDto,
    @Query() queryParams: Record<string, string>
  ): Promise<ResponseImagesDto> {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const existingImage = await this.imagesService.findById(idNumber);
    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    if (!existingImage.active) {
      throw new BadRequestException(`Image ID ${id} is not active`);
    }

    const allowedFields = Object.keys(UpdateImageSchema.shape);
    const fieldsToUpdate = Object.keys(queryParams);

    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('No fields provided to update');
    }

    const updateData: Partial<UpdateImagesDto> = {};

    for (const field of fieldsToUpdate) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }

      const value = queryParams[field];

      if (['image_id', 'group_id'].includes(field)) {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) {
          throw new BadRequestException(
            `Invalid number format for field: ${field}`
          );
        }
        updateData[field] = numericValue;
      } else {
        if (value !== undefined) {
          updateData[field] = value;
        }
      }
    }

    const validation = UpdateImageSchema.safeParse(updateData);

    if (!validation.success) {
      const zodError = validation.error as ZodError;
      const firstError = zodError.errors[0];
      throw new BadRequestException(
        `${firstError.path[0]} is invalid: ${firstError.message}`
      );
    }

    const updatedImage = await this.imagesService.update(
      idNumber,
      updateData as UpdateImagesDto
    );

    return {
      id: updatedImage.id,
      description: updatedImage.description,
      active: updatedImage.active,
      created_at: updatedImage.created_at,
      updated_at: updatedImage.updated_at
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idNumber = +id;

    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const existingImage = await this.imagesService.findById(idNumber);
    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${idNumber} not found`);
    }

    try {
      await this.imagesService.remove(idNumber);

      return { message: `Image with ID ${idNumber} deleted successfully` };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  @Post('activate/:id')
  async activate(@Param('id') id: string) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    await this.imagesService.reactivateImage(idNumber);

    return { message: `Image ID ${id} activated successfully` };
  }
}
