import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '../../build/.env' });

const connectionString = process.env.DB_URL;

if (!connectionString) {
    throw new Error('Missing DB_URL in environment variables');
}

const adapter = new PrismaPg({ connectionString });

// Declare global prisma type to prevent duplicate clients in dev
declare global {
    var prisma: PrismaClient;
}
const client =
    globalThis.prisma ??
    new PrismaClient({ adapter, log: ['query', 'warn', 'error'] });

if (process.env.NODE_ENV !== 'prod') {
    globalThis.prisma = client;
}

export const prisma = client;
