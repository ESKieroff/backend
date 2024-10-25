import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImagesDto } from './dto/create.images.dto';
import { UpdateImagesDto } from './dto/update.images.dto';
import { ResponseImagesDto } from './dto/respons.images.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async create(
    @Body() createImagesDto: CreateImagesDto
  ): Promise<ResponseImagesDto> {
    const createdImage = await this.imagesService.create(createImagesDto);
    return {
      id: createdImage.id,
      hash: createdImage.hash,
      path: createdImage.path,
      mime_type: createdImage.mime_type,
      size: createdImage.size,
      created_at: createdImage.created_at,
      updated_at: createdImage.updated_at,
      file_name: createdImage.file_name
    };
  }

  @Get()
  async findAll(
    @Query('orderBy') orderBy: string = 'id',
    @Query('storage') storage: string
  ): Promise<ResponseImagesDto[]> {
    const validOrderFields = ['id', 'description'];
    const validStorage = ['products', 'steps', 'stock'];

    if (!validOrderFields.includes(orderBy)) {
      throw new BadRequestException(`Invalid order field: ${orderBy}`);
    }
    if (!validStorage.includes(storage)) {
      throw new BadRequestException(`Invalid storage field: ${storage}`);
    }

    const images = await this.imagesService.findAll(orderBy, storage);
    return images.map(image => ({
      id: image.id,
      hash: image.hash,
      path: image.path,
      mime_type: image.mime_type,
      size: image.size,
      created_at: image.created_at,
      updated_at: image.updated_at,
      file_name: image.file_name
    }));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseImagesDto> {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const image = await this.imagesService.findById(idNumber);
    return {
      id: image.id,
      hash: image.hash,
      path: image.path,
      mime_type: image.mime_type,
      size: image.size,
      created_at: image.created_at,
      updated_at: image.updated_at,
      file_name: image.file_name
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImagesDto: UpdateImagesDto
  ): Promise<ResponseImagesDto> {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updatedImage = await this.imagesService.update(
      idNumber,
      updateImagesDto
    );
    return {
      id: updatedImage.id,
      hash: updatedImage.hash,
      path: updatedImage.path,
      mime_type: updatedImage.mime_type,
      size: updatedImage.size,
      created_at: updatedImage.created_at,
      updated_at: updatedImage.updated_at,
      file_name: updatedImage.file_name
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    await this.imagesService.remove(idNumber);
    return { message: `Image with ID ${idNumber} deleted successfully` };
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImg(
    @UploadedFile() image: Multer.File,
    @Param('id') id: string,
    @Query('storage') storage: string
  ) {
    const idNumber = +id;
    const validStorage = ['products', 'steps', 'stock'];

    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    if (!image) {
      throw new BadRequestException('No image provided');
    }
    if (!validStorage.includes(storage)) {
      throw new BadRequestException(`Invalid storage: ${storage}`);
    }

    const uploadedImage = await this.imagesService.uploadImage(idNumber);
    return { message: 'Image uploaded successfully', image: uploadedImage };
  }
}
