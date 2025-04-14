import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DB_URL;

if (!connectionString) {
    throw new Error('Missing DB_URL in environment variables');
}

const adapter = new PrismaPg({ connectionString });

// Declare global prisma type to prevent duplicate clients in dev
declare global {
    var prisma: PrismaClient | undefined;
}
export const prisma =
    global.prisma ||
    new PrismaClient({ adapter, log: ['query', 'warn', 'error'] });
