import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';


let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
prisma = new PrismaClient({ adapter });
} else {
prisma = new PrismaClient();
}

export { prisma };