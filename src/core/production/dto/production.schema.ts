import * as z from 'zod';

export const CreateProductionSchema = z.object({
  description: z.string().min(3, 'Description is required'),
  product_id: z.number().int().positive('Product is required'),
  quantity: z.number().int().positive('Quantity is required'),
  unit_measure: z.string().default('UN').optional(),
  production_date: z.string().optional(),
  expiration_date: z.string().optional(),
  observation: z.string().optional()
});

export const UpdateProductionSchema = z.object({
  description: z.string().min(3, 'Description is required').optional(),
  product_id: z.number().int().positive('Product is required').optional(),
  quantity: z.number().int().positive('Quantity is required').optional(),
  unit_measure: z.string().default('UN').optional(),
  production_date: z.string().optional(),
  expiration_date: z.string().optional(),
  observation: z.string().optional()
});
