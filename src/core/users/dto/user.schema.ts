import * as z from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().email('Invalid email'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is required'),
  first_name: z.string().min(3, 'First name is required').optional(),
  last_name: z.string().min(4, 'Last name is required').optional(),
  role: z.string().default('PUBLIC').optional(),
  gender: z.string().default('OTHER').optional()
});
