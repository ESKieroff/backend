/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata
} from '@nestjs/common';
import { ZodSchema, ZodObject } from 'zod';
import { ZodSchemasMap } from '../core/common/zod.schemas.map';
import { filterExtraFields } from 'src/core/common/filter.fields';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    //console.log('--- ZodValidationPipe Debug Start ---');
    //console.log('Valor recebido para validação:', value);
    //console.log('Metadata:', metadata);

    if (value === undefined || value === null) {
      //console.log('Valor indefinido ou nulo. Ignorando validação.');
      return value;
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      throw new BadRequestException('Houve um problema com seu request.');
    }

    const method = value.__method;
    let path = value.__path;

    if (!method || !path) {
      //console.log('Método ou caminho ausente. Ignorando validação.');
      delete value.__method;
      delete value.__path;
      return value;
    }

    if (method === 'GET') {
      //console.log('Método GET detectado. Ignorando validação.');
      delete value.__method;
      delete value.__path;
      return value;
    }

    if (method === 'PATCH') {
      path = path.replace(/\d+$/, '');
    }

    const routeKey = `${method}:${path}`;
    //console.log('routeKey gerado:', routeKey);

    const schema = ZodSchemasMap[routeKey] as ZodSchema<any>;
    if (!schema) {
      //console.log(
      //   `Schema não encontrado para a rota ${routeKey}. Retornando valor sem validação.`
      // );
      delete value.__method;
      delete value.__path;
      return value;
    }

    //console.log(`Schema encontrado para ${routeKey}. Iniciando validação.`);

    const filteredData = filterExtraFields(value, schema as ZodObject<any>);
    //console.log('Dados filtrados:', filteredData);

    const validationResult = schema.safeParse(filteredData);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      //console.log('Erros de validação encontrados:', errors);
      throw new BadRequestException({
        message: 'Erro de validação',
        data: errors
      });
    }

    // console.log('Validação bem-sucedida. Retornando valor validado.');
    // console.log('--- ZodValidationPipe Debug End ---');

    delete value.__method;
    delete value.__path;

    return filteredData;
  }
}
