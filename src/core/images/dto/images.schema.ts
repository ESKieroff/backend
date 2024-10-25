import * as z from 'zod';

export const CreateImageSchema = z.object({
  description: z.string().min(3, 'Description is required'),
  active: z.boolean().default(true)
});

export const UpdateImageSchema = z.object({
  description: z.string().min(3, 'Description is required'),
  active: z.boolean().default(true)
});
