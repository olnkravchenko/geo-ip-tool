import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
