import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateImagesDto } from './dto/create-images.dto';
import { UpdateImagesDto } from './dto/update-images.dto';
import { ImagesRepository } from './images.repository';
import { images } from '@prisma/client';
import { format } from 'date-fns';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async create(createImagesDto: CreateImagesDto) {
    const existingImage = await this.matchImageByData(
      createImagesDto.description
    );

    if (existingImage.length > 0) {
      throw new Error(
        `Image already exists: ${JSON.stringify(existingImage[0])}`
      );
    }

    const createdImage = await this.imagesRepository.create(createImagesDto);

    return this.formatImageDate(createdImage);
  }

  async findAll(orderBy: string): Promise<
    (Omit<images, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedImages = await this.imagesRepository.findAll(orderBy);
    return findedImages.map(image => this.formatImageDate(image));
  }

  async findById(id: number) {
    const image = await this.isValid(id);
    return this.formatImageDate(image);
  }

  private formatImageDate(image: images): Omit<
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

  async isValid(id: number) {
    const image = await this.imagesRepository.findById(id);

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    } else if (!image.active) {
      throw new BadRequestException(`Image with ID ${id} is not active`);
    }
    return image;
  }

  async reactivateImage(id: number) {
    const image = await this.imagesRepository.findById(id);

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    if (image.active) {
      throw new BadRequestException(`Image with ID ${id} is already active`);
    }
    return this.imagesRepository.reactivate(id);
  }

  async matchImageByData(description: string) {
    const matchedImage =
      await this.imagesRepository.matchImageByData(description);

    return matchedImage.map(image => this.formatImageDate(image));
  }

  async update(id: number, updateImageDto: UpdateImagesDto) {
    const image = await this.isValid(id);

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    const updatedImagesDto = {
      ...updateImageDto,
      updated_at: new Date(),
      active: image.active
    };

    const updatedImage = await this.imagesRepository.update(
      id,
      updatedImagesDto
    );

    return this.formatImageDate(updatedImage);
  }

  remove(id: number) {
    return this.imagesRepository.delete(id);
  }
}
