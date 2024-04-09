import { z } from 'zod';

const ProductZod = z.object({
  title: z.string().min(1).max(100).trim(),
  description: z.string().min(1).max(500).trim(),
  price: z.number().positive().finite(),
  stocks: z.number().int().positive(),
  category: z.string().min(1).max(50).trim(),
  brand: z.string().min(1).max(50).trim(),
  owner: z.string().min(1),
});

export { ProductZod };
