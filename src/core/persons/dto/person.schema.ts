import * as z from 'zod';

export const CreatePersonSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  type: z.string().default('SUPPLIER')
});
