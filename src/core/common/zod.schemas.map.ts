import { ZodSchema } from 'zod';
import {
  CreateCategorySchema,
  UpdateCategorySchema
} from '../categories/dto/categories.schema';
import {
  CreateCompositionsSchema,
  UpdateCompositionsSchema
} from '../compositions/dto/compositions.schema';
import {
  CreateGroupSchema,
  UpdateGroupSchema
} from '../groups/dto/groups.schema';
import {
  CreateImageSchema,
  UpdateImageSchema
} from '../images/dto/images.schema';
import {
  CreateOccurrenceSchema,
  UpdateOccurrenceSchema
} from '../occurrences/dto/occurrences.schema';
import {
  CreatePersonsSchema,
  UpdatePersonsSchema
} from '../persons/dto/person.schema';
import {
  CreateProductionSchema,
  UpdateProductionSchema
} from '../production/dto/production.schema';
import {
  CreateProductionProgressSchema,
  UpdateProductionProgressSchema
} from '../production-progress/dto/production-progress.schema';
import {
  CreateProductionStepSchema,
  UpdateProductionStepSchema
} from '../production-steps/dto/production-steps.schema';
import {
  CreateProductSchema,
  UpdateProductSchema
} from '../products/dto/products.schema';
import {
  CreateStockSchema,
  UpdateStockSchema
} from '../stock/dto/stock.schema';
import {
  CreateStockLocationSchema,
  UpdateStockLocationSchema
} from '../stock-locations/dto/stock-location.schema';
import { CreateUserSchema, UpdateUserSchema } from '../users/dto/users.schema';

type SchemaMap = {
  [key: string]: ZodSchema;
};
export const ZodSchemasMap: SchemaMap = {
  //categories
  'POST:/categories': CreateCategorySchema,
  'PATCH:/categories/:id': UpdateCategorySchema,
  //compositions
  'POST:/compositions': CreateCompositionsSchema,
  'PATCH:/compositions/:id': UpdateCompositionsSchema,
  //groups
  'POST:/groups': CreateGroupSchema,
  'PATCH:/groups/:id': UpdateGroupSchema,
  //images
  'POST:/images': CreateImageSchema,
  'PATCH:/images/:id': UpdateImageSchema,
  //occurrences
  'POST:/occurrences': CreateOccurrenceSchema,
  'PATCH:/occurrences/:id': UpdateOccurrenceSchema,
  //persons
  'POST:/persons': CreatePersonsSchema,
  'PATCH:/persons/:id': UpdatePersonsSchema,
  //production
  'POST:/production': CreateProductionSchema,
  'PATCH:/production/:id': UpdateProductionSchema,
  //production-progress
  'POST:/production-progress': CreateProductionProgressSchema,
  'PATCH:/production-progress/:id': UpdateProductionProgressSchema,
  //production-steps
  'POST:/steps': CreateProductionStepSchema,
  'PATCH:/steps/:id': UpdateProductionStepSchema,
  //products
  'POST:/products': CreateProductSchema,
  'PATCH:/products/:id': UpdateProductSchema,
  //stock
  'POST:/stock': CreateStockSchema,
  'PATCH:/stock/:id': UpdateStockSchema,
  //stock-locations
  'POST:/stock-locations': CreateStockLocationSchema,
  'PATCH:/stock-locations/:id': UpdateStockLocationSchema,
  //users
  'POST:/users': CreateUserSchema,
  'PATCH:/users/:id': UpdateUserSchema
};
