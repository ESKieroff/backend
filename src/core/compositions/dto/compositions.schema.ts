import * as z from 'zod';

export const CreateCompositionsSchema = z.object({
  product_id: z.number().int().positive('Product is required'),
  description: z.string().min(3, 'Description is required'),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  created_by: z.string().min(3, 'Created by is required').optional(),
  updated_by: z.string().min(3, 'Updated by is required').optional(),
  production_steps: z.object({}).optional(),
  Composition_items: z.array(
    z.object({
      composition_id: z.number().int().positive('Composition is required'),
      sequence: z.number().int().positive('Sequence is required'),
      product_id: z.number().int().positive('Product is required'),
      quantity: z.number().int().positive('Quantity is required'),
      created_at: z.date().optional(),
      updated_at: z.date().optional(),
      created_by: z.string().min(3, 'Created by is required').optional(),
      updated_by: z.string().min(3, 'Updated by is required').optional()
    })
  )
});

export const UpdateCompositionsSchema = z.object({
  description: z.string().min(3, 'Description is required').optional(),
  updated_at: z.date().optional(),
  updated_by: z.string().min(3, 'Updated by is required').optional(),
  production_steps: z.object({}).optional(),
  Composition_items: z.array(
    z.object({
      quantity: z.number().int().positive('Quantity is required').optional(),
      updated_at: z.date().optional(),
      updated_by: z.string().min(3, 'Updated by is required').optional()
    })
  )
});
