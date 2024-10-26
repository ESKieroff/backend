import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateOrchestratorDto } from './dto/create-orchestrator.dto';
import { UpdateOrchestratorDto } from './dto/update-orchestrator.dto';
import { OrchestratorRepository } from './orchestrator.repository';
import { orchestrator } from '@prisma/client';
import { format } from 'date-fns';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly orchestratorRepository: OrchestratorRepository
  ) {}

  async create(createCategorysDto: CreateOrchestratorDto) {
    const existingCategory = await this.matchCategoryByData(
      createCategorysDto.description
    );

    if (existingCategory.length > 0) {
      throw new Error(
        `Category already exists: ${JSON.stringify(existingCategory[0])}`
      );
    }

    const createdCategory =
      await this.orchestratorRepository.create(createCategorysDto);

    return this.formatCategoryDate(createdCategory);
  }

  async findAll(orderBy: string): Promise<
    (Omit<orchestrator, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedCategorys = await this.orchestratorRepository.findAll(orderBy);
    return findedCategorys.map(category => this.formatCategoryDate(category));
  }

  async findById(id: number) {
    const category = await this.isValid(id);
    return this.formatCategoryDate(category);
  }

  private formatCategoryDate(category: orchestrator): Omit<
    orchestrator,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...category,
      created_at: format(new Date(category.created_at), 'dd/MM/yyyy HH:mm:ss'),
      updated_at: format(new Date(category.updated_at), 'dd/MM/yyyy HH:mm:ss')
    };
  }

  async isValid(id: number) {
    const category = await this.orchestratorRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    } else if (!category.active) {
      throw new BadRequestException(`Category with ID ${id} is not active`);
    }
    return category;
  }

  async reactivateCategory(id: number) {
    const category = await this.orchestratorRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (category.active) {
      throw new BadRequestException(`Category with ID ${id} is already active`);
    }
    return this.orchestratorRepository.reactivate(id);
  }

  async matchCategoryByData(description: string) {
    const matchedCategory =
      await this.orchestratorRepository.matchCategoryByData(description);

    return matchedCategory.map(category => this.formatCategoryDate(category));
  }

  async update(id: number, updateCategoryDto: UpdateOrchestratorDto) {
    const category = await this.isValid(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const updatedCategorysDto = {
      ...updateCategoryDto,
      updated_at: new Date(),
      active: category.active
    };

    const updatedCategory = await this.orchestratorRepository.update(
      id,
      updatedCategorysDto
    );

    return this.formatCategoryDate(updatedCategory);
  }

  remove(id: number) {
    return this.orchestratorRepository.delete(id);
  }
}
