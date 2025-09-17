import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './libs/common/src/lib/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: (() => {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not defined');
      }
      return process.env.DATABASE_URL;
    })(),
  },
});
