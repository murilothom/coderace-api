import { z } from 'zod';

export const envSchema = z.object({
  DB_URI: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export type Env = z.infer<typeof envSchema>;
