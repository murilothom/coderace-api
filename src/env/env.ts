import { z } from 'zod';

export const envSchema = z.object({
  DB_URI: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3000),
  FRONTEND_URL: z.string().url(),
  EMAIL_SENDER_HOST: z.string(),
  EMAIL_SENDER_USER: z.string(),
  EMAIL_SENDER_PASSWORD: z.string(),
  EMAIL_SENDER_PORT: z.coerce.number().optional().default(587),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export type Env = z.infer<typeof envSchema>;
