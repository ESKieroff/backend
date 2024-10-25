import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateImagesDto } from './dto/create.images.dto';
import { UpdateImagesDto } from './dto/update.images.dto';
import { ImagesRepository } from './images.repository';
import { images, Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { ResponseImagesDto } from './dto/respons.images.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async create(createImagesDto: CreateImagesDto) {
    const id = undefined;
    const existingImage = await this.validateImage(id, createImagesDto);

    if (existingImage) {
      throw new BadRequestException(
        `Image already exists with ID: ${existingImage.id}`
      );
    }

    const imagesCreateInput = {
      ...createImagesDto,
      hash: this.calculateHash(createImagesDto),
      path: createImagesDto.path,
      mime_type: createImagesDto.mime_type,
      file_name: createImagesDto.file_name,
      image_bin: [createImagesDto.image_bin],
      original_name: createImagesDto.original_name,
      size: createImagesDto.size,
      width: createImagesDto.width,
      height: createImagesDto.height
    };
    const createdImage = await this.imagesRepository.create(imagesCreateInput);
    return this.formatDate(createdImage);
  }

  async findAll(
    orderBy: string,
    imageType: string
  ): Promise<
    (Omit<images, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const filteredImages = await this.imagesRepository.findAll(
      orderBy,
      imageType
    );
    return filteredImages.map(image => this.formatDate(image));
  }

  async findById(id: number): Promise<ResponseImagesDto> {
    const image = await this.validateImage(id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    const formattedImage = this.formatDate(image);
    return {
      id: formattedImage.id,
      hash: formattedImage.hash,
      path: formattedImage.path,
      mime_type: formattedImage.mime_type,
      file_name: formattedImage.file_name,
      original_name: formattedImage.original_name,
      size: formattedImage.size,
      width: formattedImage.width,
      height: formattedImage.height,
      created_at: formattedImage.created_at,
      updated_at: formattedImage.updated_at
    };
  }

  private async validateImage(
    id: number,
    imageObject?: Buffer | CreateImagesDto | UpdateImagesDto
  ): Promise<images | null> {
    const image = await this.imagesRepository.findById(id);

    if (!image && imageObject) {
      const hash = this.calculateHash(imageObject);
      const duplicated = await this.imagesRepository.findByHash(hash);

      if (duplicated) {
        throw new BadRequestException(
          `Image with provided data is the same as image with ID ${duplicated.id}`
        );
      }
      return null;
    }
    return image;
  }

  private calculateHash(
    imageObject: Buffer | CreateImagesDto | UpdateImagesDto
  ): string {
    const buffer = Buffer.isBuffer(imageObject)
      ? imageObject
      : Buffer.from('base64');
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  // Atualiza uma imagem existente após validação
  async update(id: number, updateImageDto: UpdateImagesDto) {
    const image = await this.validateImage(id, updateImageDto);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    const updatedImage = await this.imagesRepository.update(id, {
      ...updateImageDto,
      updated_at: new Date()
    });

    return this.formatDate(updatedImage);
  }

  async uploadImage(id: number): Promise<Prisma.imagesUpdateInput> {
    await this.validateImage(id);

    const updatedImage = await this.imagesRepository.update(id, {
      updated_at: new Date()
    });

    return this.formatDate(updatedImage);
  }

  async remove(id: number) {
    const image = await this.validateImage(id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return this.imagesRepository.delete(id);
  }

  private formatDate(image: images): Omit<
    images,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...image,
      created_at: format(new Date(image.created_at), 'dd/MM/yyyy HH:mm:ss'),
      updated_at: format(new Date(image.updated_at), 'dd/MM/yyyy HH:mm:ss')
    };
  }
}
