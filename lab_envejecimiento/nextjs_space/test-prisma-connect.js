require("dotenv/config");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log('DB OK');
  } catch (e) {
    console.error('DB ERROR full:');
    console.error(e);
    process.exit(1);
  } finally {
    try { await prisma.$disconnect(); } catch {}
  }
})();
