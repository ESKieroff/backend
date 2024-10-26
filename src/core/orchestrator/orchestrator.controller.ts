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
import { OrchestratorService } from './orchestrator.service';
import { CreateOrchestratorDto } from './dto/create-orchestrator.dto';
import { UpdateOrchestratorDto } from './dto/update-orchestrator.dto';
import {
  CreateCategorySchema,
  UpdateCategorySchema
} from './dto/category.schema';
import { ZodError } from 'zod';
import { ResponseOrchestratorDto } from './dto/response-orchestrator.dto';

@Controller('orchestrator')
export class OrchestratorController {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  @Post()
  async create(
    @Body() createOrchestratorDto: CreateOrchestratorDto
  ): Promise<ResponseOrchestratorDto> {
    const errors = [];

    const descriptionValidation =
      CreateCategorySchema.shape.description.safeParse(
        createOrchestratorDto.description
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

    const matchedOrchestrator =
      await this.orchestratorService.matchCategoryByData(
        createOrchestratorDto.description
      );

    if ((await matchedOrchestrator).length > 0) {
      const existingCategory = matchedOrchestrator[0];

      if (!existingCategory.active) {
        throw new BadRequestException(
          `Category already exists but is not active. Activate and update it: ${JSON.stringify(
            existingCategory
          )}`
        );
      }

      throw new BadRequestException(
        'Category already exists. Try update it instead'
      );
    }

    const createdCategory = await this.orchestratorService.create(
      createOrchestratorDto
    );
    return {
      id: createdCategory.id,
      description: createdCategory.description,
      active: createdCategory.active,
      created_at: createdCategory.created_at,
      updated_at: createdCategory.updated_at
    };
  }

  @Get()
  async findAll(
    @Query('orderBy') orderBy: string = 'id'
  ): Promise<ResponseOrchestratorDto[]> {
    const validOrderFields = ['id', 'description'];

    if (!validOrderFields.includes(orderBy)) {
      throw new BadRequestException(`Invalid order field: ${orderBy}`);
    }

    const orchestrator = await this.orchestratorService.findAll(orderBy);
    return orchestrator.map(category => ({
      id: category.id,
      description: category.description,
      active: category.active,
      created_at: category.created_at,
      updated_at: category.updated_at
    }));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseOrchestratorDto> {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const category = await this.orchestratorService.findById(idNumber);

    const response: ResponseOrchestratorDto = {
      id: category.id,
      description: category.description,
      active: category.active,
      created_at: category.created_at,
      updated_at: category.updated_at
    };

    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrchestratorDto: UpdateOrchestratorDto,
    @Query() queryParams: Record<string, string>
  ): Promise<ResponseOrchestratorDto> {
    const idNumber = +id;
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const existingCategory = await this.orchestratorService.findById(idNumber);
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (!existingCategory.active) {
      throw new BadRequestException(`Category ID ${id} is not active`);
    }

    const allowedFields = Object.keys(UpdateCategorySchema.shape);
    const fieldsToUpdate = Object.keys(queryParams);

    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('No fields provided to update');
    }

    const updateData: Partial<UpdateOrchestratorDto> = {};

    for (const field of fieldsToUpdate) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }

      const value = queryParams[field];

      if (['category_id', 'group_id'].includes(field)) {
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

    const validation = UpdateCategorySchema.safeParse(updateData);

    if (!validation.success) {
      const zodError = validation.error as ZodError;
      const firstError = zodError.errors[0];
      throw new BadRequestException(
        `${firstError.path[0]} is invalid: ${firstError.message}`
      );
    }

    const updatedCategory = await this.orchestratorService.update(
      idNumber,
      updateData as UpdateOrchestratorDto
    );

    return {
      id: updatedCategory.id,
      description: updatedCategory.description,
      active: updatedCategory.active,
      created_at: updatedCategory.created_at,
      updated_at: updatedCategory.updated_at
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idNumber = +id;

    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }

    const existingCategory = await this.orchestratorService.findById(idNumber);
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${idNumber} not found`);
    }

    try {
      await this.orchestratorService.remove(idNumber);

      return { message: `Category with ID ${idNumber} deleted successfully` };
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

    await this.orchestratorService.reactivateCategory(idNumber);

    return { message: `Category ID ${id} activated successfully` };
  }
}
