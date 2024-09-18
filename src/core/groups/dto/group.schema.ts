import * as z from 'zod';

export const CreateCategorySchema = z.object({
  description: z.string().min(3, 'Description is required'),
  father_id: z.number().nullable(),
  active: z.boolean().default(true)
});
