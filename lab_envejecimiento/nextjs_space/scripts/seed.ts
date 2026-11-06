import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash('johndoe123', 10);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: { rol: 'ADMIN', activo: true },
    create: { email: 'john@doe.com', password: pass, name: 'Administrador del Laboratorio', rol: 'ADMIN' },
  });
  const gPass = await bcrypt.hash('gerontologia2026', 10);
  await prisma.user.upsert({
    where: { email: 'gerontologo@lab.mx' },
    update: {},
    create: { email: 'gerontologo@lab.mx', password: gPass, name: 'Gerontólogo de Ejemplo', rol: 'GERONTOLOGO' },
  });
  console.log('Seed completado');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
