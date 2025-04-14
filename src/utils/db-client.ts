import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

export const db = new Pool({
  connectionString: process.env.DB_URL
});