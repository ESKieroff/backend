/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodSchemasMap } from '../core/common/zod.schemas.map';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      typeof value === 'object' &&
      (value === null || Object.keys(value).length === 0)
    ) {
      throw new BadRequestException('Nenhum campo fornecido para atualizar');
    }

    const routeKey = `${metadata.metatype.name.toUpperCase()}:${metadata.data}`;

    const schema = ZodSchemasMap[routeKey] as ZodSchema<any>;

    if (!schema) {
      return value;
    }

    const result = schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      throw new BadRequestException(errors);
    }

    return value;
  }
}
