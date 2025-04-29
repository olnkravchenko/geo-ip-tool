import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const connectionString = process.env.DB_URL;

if (!connectionString) {
    throw new Error('Missing DB_URL in environment variables');
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'warn', 'error'],
});
export default prisma;
